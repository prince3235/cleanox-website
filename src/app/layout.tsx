import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.legalName} | Pharmaceutical Cleanroom Design, HVAC & Contamination Control`,
    template: `%s | ${site.name} – ${site.tagline}`,
  },
  description: site.description,
  keywords: [
    "cleanroom design",
    "pharmaceutical cleanroom",
    "HVAC AHU pharma",
    "HEPA filtration",
    "modular cleanroom panels",
    "pass box",
    "air shower",
    "laminar air flow",
    "fan filter unit",
    "cleanroom monitoring",
    "ISO 14644",
    "EU GMP Annex 1",
    "Schedule M",
    "turnkey cleanroom India",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.png", apple: "/icon.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.domain,
    siteName: site.legalName,
    title: `${site.legalName} – Contamination-Free Environments for Pharma Manufacturing`,
    description: site.description,
    images: [
      {
        url: "/images/brand/hero-cleanroom.jpg",
        width: 1800,
        height: 1014,
        alt: "Pharmaceutical cleanroom suite engineered by Cleanox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} – Smart Clean Solutions`,
    description: site.description,
    images: ["/images/brand/hero-cleanroom.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#071e38" },
  ],
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.domain,
  logo: `${site.domain}/images/brand/logo-full.png`,
  description: site.description,
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address,
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.contact.phoneHref,
    email: site.contact.email,
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [site.social.linkedin],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.legalName,
  url: site.domain,
  publisher: { "@type": "Organization", name: site.legalName },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" richColors closeButton />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
