import Link from "next/link";
import type { Metadata } from "next";

const siteUrl = "https://portotones.online";

export const metadata: Metadata = {
  title: "Contacto PRO-PORTONES | Presupuesto gratis en Buenos Aires",
  description:
    "Solicitá presupuesto gratis para reparación, mantenimiento o instalación de portones automáticos en Buenos Aires. Atención rápida por WhatsApp o teléfono.",
  alternates: { canonical: `${siteUrl}/contacto` },
  openGraph: {
    title: "Contacto PRO-PORTONES",
    description:
      "Presupuesto gratis para portones automáticos en Buenos Aires. WhatsApp y teléfono directo.",
    url: `${siteUrl}/contacto`,
    siteName: "PRO-PORTONES",
  },
  robots: { index: true, follow: true },
};

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-800 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-3xl border border-yellow-400 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#002366]">Contacto</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#002366] md:text-5xl">
            Solicitá presupuesto gratis para tu portón automático
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Atendemos urgencias y trabajos programados en Zona Norte, Sur, Este, Oeste y Centro de Buenos Aires.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/5491163639909?text=Hola%20necesito%20presupuesto%20gratis"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#FFD700] px-6 py-3 text-center font-semibold text-[#002366] transition hover:bg-yellow-500"
            >
              WhatsApp directo
            </a>
            <a
              href="tel:+541163639909"
              className="rounded-full border border-[#002366] px-6 py-3 text-center font-semibold text-[#002366] transition hover:bg-slate-100"
            >
              Llamar al 11 6363-9909
            </a>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#002366]">¿Qué podés pedir?</h2>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-600">
              <li>• Reparación urgente de portones automáticos.</li>
              <li>• Mantenimiento preventivo para evitar averías.</li>
              <li>• Instalación de portones nuevos o automatización.</li>
              <li>• Asesoramiento y cotización sin compromiso.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#002366] p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold">Datos de contacto</h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-100">
              <p>📞 Teléfono: 11 6363-9909</p>
              <p>💬 WhatsApp: 11 6363-9909</p>
              <p>📍 Buenos Aires, Argentina</p>
              <p>🕒 Atención rápida y servicio en todo el país</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm text-slate-600">Volvé a la home para ver todos los servicios y zonas disponibles.</p>
          <Link href="/" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
