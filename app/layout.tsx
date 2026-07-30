import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://portotones.online";
const siteName = "PRO-PORTONES";
const description =
  "ReparaciÃ³n, mantenimiento e instalaciÃ³n de portones automÃ¡ticos en Buenos Aires. Presupuesto gratis, atenciÃ³n rÃ¡pida y garantÃ­a.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRO-PORTONES | Portones automÃ¡ticos en Buenos Aires",
    template: "%s | PRO-PORTONES",
  },
  description,
  keywords: [
    "portones automÃ¡ticos",
    "reparaciÃ³n de portones",
    "mantenimiento de portones",
    "instalaciÃ³n de portones",
    "Buenos Aires",
    "portones automÃ¡ticos Buenos Aires",
    "portones seccionales",
    "portones basculantes",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: siteName,
    description,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "es_AR",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Servicios",
  authors: [{ name: "PRO-PORTONES" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#002366",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PRO-PORTONES",
    description,
    url: siteUrl,
    telephone: "+54 11 6363-9909",
    email: "lovihlomastro1@gmail.com",
    areaServed: ["Buenos Aires", "Zona Norte", "Zona Sur", "Zona Oeste", "Zona Este", "Centro"],
    sameAs: ["https://wa.me/5491163639909"],
    priceRange: "$",
  };

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="alternate" href={siteUrl} hrefLang="es-AR" />
        <link rel="alternate" href={siteUrl} hrefLang="es" />
        {GA_ID && GA_ID !== "G-XXXXXXXXXX" ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { page_path: window.location.pathname });`,
              }}
            />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

