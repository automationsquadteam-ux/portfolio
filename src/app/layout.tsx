import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { keywords, site } from "@/lib/site";
import { BackgroundVideo } from "@/components/ui/background-video";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  // Icons and social images come from the file conventions in src/app/:
  // icon.png, apple-icon.png, opengraph-image.tsx, twitter-image.tsx.
  // Do not declare `icons` here — it would override those.
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* The theme face is fetched from a third-party host via @import in
            globals.css; warming the connection early shortens the swap. */}
        <link rel="preconnect" href="https://db.onlinewebfonts.com" />
        <link
          rel="preconnect"
          href="https://d8j0ntlcm91z4.cloudfront.net"
          crossOrigin=""
        />
      </head>
      {/* flex column + flex-1 on <main> is the sticky-footer pattern: on short
          pages (e.g. /about) main grows to fill the viewport so the footer sits
          at the bottom edge instead of floating halfway up over the video. */}
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <StructuredData />
        <BackgroundVideo />
        {/* Header, footer and the video live outside {children} so they are
            not inside template.tsx — they persist across navigations instead
            of remounting and replaying their entrance on every route change. */}
        <SiteHeader />
        <main className="flex-1 pt-16 md:pt-18">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
