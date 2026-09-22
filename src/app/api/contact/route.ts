/**
 * POST /api/contact — public enquiry endpoint for the #contact section.
 *
 * Env contract:
 *  - DATABASE_URL          (required)  SQLite connection string used by Prisma.
 *  - TURNSTILE_SECRET_KEY  (optional)  Cloudflare Turnstile secret. When set, the form
 *                                      must also send `cf-turnstile-response`, which is
 *                                      verified server-side against siteverify.
 *  - RESEND_API_KEY        (optional)  Resend API key. Together with CONTACT_NOTIFY_EMAIL
 *                                      this enables notification emails for new enquiries.
 *  - CONTACT_NOTIFY_EMAIL  (optional)  Recipient address for the notification email.
 *  - IP_HASH_SALT          (optional)  Salt used when hashing client IPs for rate limiting
 *                                      and audit storage (only the hash is ever persisted).
 *
 * Spam protection layers (in order): honeypot field, elapsed-time trap,
 * per-IP rate limit (5/hour), optional Turnstile verification.
 */

import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024; // 2 MB
const MIN_TIME_ON_FORM_MS = 3000; // time-trap threshold
const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour

const ALLOWED_EXTENSIONS = new Set([
  "pdf", "png", "jpg", "jpeg", "dwg", "dxf", "doc", "docx",
  "xls", "xlsx", "txt", "step", "stp", "zip",
]);

const ALLOWED_MIME_PREFIXES = [
  "image/",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "text/",
  "application/msword",
  "application/vnd.openxmlformats-officedocument",
];

const ALLOWED_LIST_LABEL =
  "pdf, png, jpg, dwg, dxf, doc, docx, xls, xlsx, txt, step, stp, zip";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  company: z
    .string()
    .max(150, "Company must be 150 characters or fewer.")
    .optional(),
  email: z
    .email({ message: "Please enter a valid email address." })
    .max(254, "Email must be 254 characters or fewer."),
  phone: z
    .string()
    .regex(
      /^[0-9+()\-\s]{7,20}$/,
      "Please enter a valid phone number (7–20 characters; digits, spaces, +, ( ), - only).",
    ),
  industry: z.string().min(1, "Please select your industry."),
  projectType: z.string().min(1, "Please select a project type."),
  message: z
    .string()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(3000, "Message must be 3000 characters or fewer."),
});

type ContactInput = z.infer<typeof contactSchema>;

function formString(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip");
}

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "cleanox-contact-salt-v1";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function mimeAllowed(mime: string): boolean {
  // Empty type / generic binary stream is common for CAD files (dwg, dxf, step, stp).
  if (!mime || mime === "application/octet-stream") return true;
  return ALLOWED_MIME_PREFIXES.some((prefix) => mime.startsWith(prefix));
}

function validateAttachment(file: File): string | null {
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return "Attachment must be 2 MB or smaller.";
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return `Attachment type not allowed. Allowed types: ${ALLOWED_LIST_LABEL}.`;
  }
  if (!mimeAllowed(file.type.toLowerCase())) {
    return `Attachment could not be verified as an allowed type (${ALLOWED_LIST_LABEL}).`;
  }
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function verifyTurnstile(
  token: string,
  remoteIp: string | null,
): Promise<boolean> {
  const params = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY ?? "",
    response: token,
  });
  if (remoteIp) params.set("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    },
  );
  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function sendNotificationEmail(
  input: ContactInput,
  attachmentName: string | null,
): Promise<void> {
  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Company", input.company ?? "—"],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Industry", input.industry],
    ["Project type", input.projectType],
    ["Message", input.message],
    ["Attachment", attachmentName ?? "—"],
  ];
  const html = `
    <h2>New CleanOx website enquiry</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
              value,
            ).replace(/\n/g, "<br />")}</td></tr>`,
        )
        .join("")}
    </table>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CleanOx Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_NOTIFY_EMAIL],
      subject: `New enquiry: ${input.name} — ${input.projectType}`,
      html,
    }),
  });
  if (!response.ok) {
    console.warn(
      `[contact] notification email failed with status ${response.status}`,
    );
  }
}

export async function POST(req: Request) {
  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json(
        { ok: false, errors: { root: "Invalid form submission." } },
        { status: 400 },
      );
    }

    // 1. Honeypot — silently drop.
    if (formString(form, "website").length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 2. Time trap — silently drop submissions sent < 3s after form mount.
    const tsStart = Date.parse(formString(form, "tsStart"));
    if (Number.isNaN(tsStart) || Date.now() - tsStart < MIN_TIME_ON_FORM_MS) {
      return NextResponse.json({ ok: true });
    }

    // 3. Rate limit per hashed client IP.
    const ipHash = hashIp(getClientIp(req));
    if (ipHash && isRateLimited(ipHash, RATE_LIMIT, RATE_WINDOW_MS)) {
      return NextResponse.json(
        { ok: false, errors: { root: "Too many requests. Please try again later." } },
        { status: 429 },
      );
    }

    // 4. Optional Cloudflare Turnstile verification.
    if (process.env.TURNSTILE_SECRET_KEY) {
      const token = formString(form, "cf-turnstile-response");
      // Only pass the raw IP to siteverify when it was not already hashed above.
      const clientIp = getClientIp(req);
      const verified = token ? await verifyTurnstile(token, clientIp) : false;
      if (!verified) {
        return NextResponse.json(
          {
            ok: false,
            errors: {
              root: "CAPTCHA verification failed. Please refresh the page and try again.",
            },
          },
          { status: 400 },
        );
      }
    }

    // 5. Attachment validation.
    const attachmentEntry = form.get("attachment");
    const attachment =
      attachmentEntry instanceof File && attachmentEntry.size > 0
        ? attachmentEntry
        : null;

    if (attachment) {
      const attachmentError = validateAttachment(attachment);
      if (attachmentError) {
        return NextResponse.json(
          { ok: false, errors: { attachment: attachmentError } },
          { status: 400 },
        );
      }
    }

    // 6. Field validation.
    const parsed = contactSchema.safeParse({
      name: formString(form, "name").trim(),
      company: formString(form, "company").trim() || undefined,
      email: formString(form, "email").trim(),
      phone: formString(form, "phone").trim(),
      industry: formString(form, "industry").trim(),
      projectType: formString(form, "projectType").trim(),
      message: formString(form, "message").trim(),
    });

    if (!parsed.success) {
      const flat = z.flattenError(parsed.error);
      const errors: Record<string, string> = {};
      const fieldErrors = flat.fieldErrors as Record<
        string,
        readonly string[] | undefined
      >;
      for (const [field, messages] of Object.entries(fieldErrors)) {
        const first = messages?.[0];
        if (first) errors[field] = first;
      }
      const formError = flat.formErrors[0];
      if (formError) errors.root = formError;
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // 7. Store the enquiry.
    const attachmentData = attachment
      ? new Uint8Array(await attachment.arrayBuffer())
      : null;

    const inquiry = await db.inquiry.create({
      data: {
        name: parsed.data.name,
        company: parsed.data.company ?? null,
        email: parsed.data.email,
        phone: parsed.data.phone,
        industry: parsed.data.industry,
        projectType: parsed.data.projectType,
        message: parsed.data.message,
        attachmentName: attachment?.name ?? null,
        attachmentType: attachment?.type || null,
        attachmentSize: attachment ? attachment.size : null,
        attachmentData,
        ipHash,
      },
    });

    // 8. Optional notification email — must never fail the request.
    if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFY_EMAIL) {
      try {
        await sendNotificationEmail(parsed.data, attachment?.name ?? null);
      } catch (error) {
        console.warn(
          "[contact] notification email failed:",
          error instanceof Error ? error.message : error,
        );
      }
    }

    console.log(
      `[contact] inquiry ${inquiry.id} — ${parsed.data.name} <${parsed.data.email}> ` +
        `project=${parsed.data.projectType} industry=${parsed.data.industry} ` +
        `attachment=${attachment ? attachment.name : "none"}`,
    );

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (error) {
    console.error(
      "[contact] unexpected error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { ok: false, errors: { root: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }
}
