import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "portones automaticos",
  description: "Servicios de portones automáticos en Buenos Aires",
  openGraph: {
    title: "portones automaticos",
    description: "Servicios de portones automáticos en Buenos Aires",
    url: "https://portonesweb.vercel.app",
    siteName: "PRO-PORTONES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PRO-PORTONES",
    description: "Servicios de portones automáticos en Buenos Aires",
    url: "https://portonesweb.vercel.app",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PRO-PORTONES" />
        <meta property="og:description" content="Servicios de portones automáticos en Buenos Aires" />
        <meta property="og:url" content="https://portonesweb.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { page_path: window.location.pathname });` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
