# CleanOx – Smart Clean Solutions

Premium B2B website for **CleanOx**, a pharmaceutical cleanroom design, engineering and
contamination-control company. Corporate website + technical documentation hub + solutions
catalogue + lead-generation platform, in one production-ready Next.js app.

## Tech Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router) + TypeScript 5        |
| Styling    | Tailwind CSS 4 + shadcn/ui (New York)         |
| Animation  | Framer Motion + custom SVG diagrams           |
| Database   | Prisma ORM + SQLite (`db/custom.db`)          |
| Forms      | `/api/contact` route + layered anti-spam      |
| SEO        | Metadata API, JSON-LD, `sitemap.xml`, `robots.txt` |
| CI/CD      | GitHub Actions (`.github/workflows/ci.yml`)   |

## Getting Started

```bash
bun install
bun run db:push     # sync Prisma schema to SQLite
bun run dev         # http://localhost:3000
```

Other scripts: `bun run lint`, `bun run db:generate`.

## Environment Variables

| Variable                | Required | Purpose                                                        |
| ----------------------- | -------- | -------------------------------------------------------------- |
| `DATABASE_URL`          | Yes      | SQLite file, e.g. `file:../db/custom.db` (relative to `prisma/schema.prisma`) |
| `RESEND_API_KEY`        | No       | Enables enquiry email delivery via Resend REST API             |
| `CONTACT_NOTIFY_EMAIL`  | No       | Inbox that receives enquiry notifications (with key above)     |
| `TURNSTILE_SECRET_KEY`  | No       | Enables Cloudflare Turnstile verification (add widget to form) |
| `IP_HASH_SALT`          | No       | Salt for hashing visitor IPs in rate limiting                  |

Anti-spam works without any keys: honeypot field + 3-second time trap + per-IP sliding-window
rate limit (5/hour). Email is optional — enquiries are always persisted to the database.

## Deployment Path (recommended: Vercel)

1. Push the repo to GitHub.
2. Import the project in Vercel (native Next.js support).
3. Set the environment variables above in the Vercel dashboard.
4. Every PR gets a preview URL; every push to `main` deploys to production automatically.
5. Point the real domain (e.g. `cleanox.in`) at Vercel and update `site.domain` in
   `src/lib/site.ts`.
6. Submit `https://<domain>/sitemap.xml` to Google Search Console.

For self-hosting, run `bun run build && bun run start` behind a reverse proxy, or use the
commented `deploy` job in `.github/workflows/ci.yml`.

> SQLite is ideal for the enquiry inbox of a new site. If traffic grows or you move to
> serverless multi-instance hosting, swap the Prisma `datasource` to Postgres/MySQL and move
> the in-memory rate limiter (`src/lib/rate-limit.ts`) to Redis.

## Before Launch — Replace Placeholders

All placeholders are marked with `PLACEHOLDER` comments in `src/lib/site.ts`:

- Real address, phone, WhatsApp number, email, social links
- Real domain (`site.domain`) for canonical URLs, OG tags and sitemap
- Legal/careers dialog copy (currently honest placeholder text)
- Optional: attach real certificates to the Quality section once obtained

Content integrity rules (brief §8) are enforced throughout: standards are referenced as
design frameworks, the Projects section is an honest "building our portfolio" state, and no
fabricated clients, certifications or statistics appear anywhere.

## Site Map (single-page anchors)

`#about` · `#solutions` · `#industries` · `#process` · `#technical` · `#quality` ·
`#projects` · `#resources` · `#contact`

API: `POST /api/contact` (multipart/form-data)
