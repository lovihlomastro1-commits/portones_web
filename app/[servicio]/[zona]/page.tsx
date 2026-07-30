import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

type Servicio = {
  servicio: string;
  problema: string;
  titulo?: string;
  descripcion?: string;
  beneficios?: string[];
  keywords?: string[];
};

type Zona = {
  slug_zona: string;
  nombre_zona: string;
  descripcion?: string;
};

const baseUrl = "https://portonesweb.vercel.app";
const phone = "+54 11 6363-9909";
const whatsappUrl = "https://wa.me/5491163639909";

function normalizeText(value: string) {
  return value.replace(/-/g, " ").replace(/\s+/g, " ").trim();
}

function readJsonFile<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "data", fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

async function getDatos() {
  const servicios = readJsonFile<Servicio[]>("servicios.json");
  const zonas = readJsonFile<Zona[]>("zonas.json");
  return { servicios, zonas };
}

export async function generateStaticParams() {
  const { servicios, zonas } = await getDatos();
  return servicios.flatMap((servicio) => zonas.map((zona) => ({ servicio: servicio.servicio, zona: zona.slug_zona })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ servicio: string; zona: string }> }): Promise<Metadata> {
  const { servicio, zona } = await params;
  const { servicios, zonas } = await getDatos();
  const servicioData = servicios.find((item) => item.servicio === servicio);
  const zonaData = zonas.find((item) => item.slug_zona === zona);

  const serviceTitle = servicioData?.titulo ?? normalizeText(servicioData?.servicio ?? servicio);
  const areaTitle = zonaData?.nombre_zona ?? normalizeText(zona);
  const title = `${serviceTitle} en ${areaTitle} | PRO-PORTONES`;
  const description =
    servicioData?.descripcion ??
    `Servicio profesional de ${serviceTitle.toLowerCase()} en ${areaTitle}. Presupuesto gratis, atención rápida y garantía.`;
  const canonical = `${baseUrl}/${servicio}/${zona}`;
  const ogImage = `/og-${servicio}-${zona}.svg`;

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [serviceTitle, areaTitle, "portones automáticos", "Buenos Aires", "presupuesto gratis"],
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: "PRO-PORTONES",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ servicio: string; zona: string }> }) {
  const { servicio, zona } = await params;
  const { servicios, zonas } = await getDatos();
  const servicioData = servicios.find((item) => item.servicio === servicio);
  const zonaData = zonas.find((item) => item.slug_zona === zona);

  const serviceTitle = servicioData?.titulo ?? normalizeText(servicioData?.servicio ?? servicio);
  const areaTitle = zonaData?.nombre_zona ?? normalizeText(zona);
  const description =
    servicioData?.descripcion ??
    `Servicio profesional de ${serviceTitle.toLowerCase()} en ${areaTitle}. Presupuesto gratis, atención rápida y garantía.`;
  const benefits = servicioData?.beneficios ?? [
    "Atención rápida en urgencias",
    "Técnicos certificados",
    "Presupuesto gratis",
    "Garantía en todos los trabajos",
  ];
  const faqs = [
    {
      question: `¿Cuánto cuesta ${serviceTitle.toLowerCase()} en ${areaTitle}?`,
      answer: `El precio depende del tipo de portón y la complejidad del trabajo. En PRO-PORTONES hacemos una evaluación y te enviamos un presupuesto gratis sin compromiso.`,
    },
    {
      question: `¿Atención ${serviceTitle.toLowerCase()} los fines de semana?`,
      answer: `Sí. Atendemos durante todo el año, incluso fines de semana y feriados, para resolver urgencias de forma rápida.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${serviceTitle} en ${areaTitle}`,
        description,
        provider: {
          "@type": "Organization",
          name: "PRO-PORTONES",
          telephone: phone,
          url: baseUrl,
        },
        areaServed: areaTitle,
        offers: {
          "@type": "Offer",
          url: `${baseUrl}/${servicio}/${zona}`,
          priceCurrency: "ARS",
          price: "0",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "PRO-PORTONES",
        telephone: phone,
        url: baseUrl,
        areaServed: areaTitle,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Buenos Aires",
          addressCountry: "AR",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
          { "@type": "ListItem", position: 2, name: serviceTitle, item: `${baseUrl}/${servicio}/${zona}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-800 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-3xl border border-yellow-400 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#002366]">Servicio profesional</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#002366] md:text-5xl">
            {serviceTitle} en {areaTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`${whatsappUrl}?text=Hola%20necesito%20${encodeURIComponent(serviceTitle)}%20en%20${encodeURIComponent(areaTitle)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#FFD700] px-6 py-3 text-center font-semibold text-[#002366] transition hover:bg-yellow-500"
            >
              Solicitar presupuesto gratis
            </a>
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="rounded-full border border-[#002366] px-6 py-3 text-center font-semibold text-[#002366] transition hover:bg-slate-100">
              Llamar al 11 6363-9909
            </a>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#002366]">¿Qué incluye este servicio?</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-600">
              {benefits.map((benefit) => (
                <li key={benefit} className="rounded-xl bg-slate-50 p-3">
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#002366] p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold">Contactanos</h2>
            <p className="mt-4 text-base leading-7 text-slate-100">
              Atendemos urgencias y trabajos programados en toda la zona de Buenos Aires.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-100">
              <p>📞 {phone}</p>
              <p>💬 WhatsApp {whatsappUrl.replace("https://wa.me/", "")}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-[#002366]">Preguntas frecuentes</h2>
          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-semibold text-[#002366]">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm text-slate-600">
            Si necesitás más información, volvemos al inicio para ver todos los servicios y zonas.
          </p>
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
            Volver al inicio
          </Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}