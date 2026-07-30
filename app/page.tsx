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

async function getDatos() {
  const serviciosPath = path.join(process.cwd(), "data", "servicios.json");
  const zonasPath = path.join(process.cwd(), "data", "zonas.json");
  const servicios = JSON.parse(fs.readFileSync(serviciosPath, "utf8")) as Servicio[];
  const zonas = JSON.parse(fs.readFileSync(zonasPath, "utf8")) as Zona[];
  return { servicios, zonas };
}

export const metadata: Metadata = {
  title: "ReparaciÃ³n, mantenimiento e instalaciÃ³n de portones automÃ¡ticos en Buenos Aires",
  description:
    "PRO-PORTONES ofrece reparaciÃ³n, mantenimiento e instalaciÃ³n de portones automÃ¡ticos en Buenos Aires. Presupuesto gratis, servicio rÃ¡pido y garantÃ­a.",
  alternates: { canonical: "https://portotones.online" },
  openGraph: {
    title: "PRO-PORTONES | Portones automÃ¡ticos en Buenos Aires",
    description:
      "ReparaciÃ³n, mantenimiento e instalaciÃ³n de portones automÃ¡ticos en Buenos Aires. Presupuesto gratis y atenciÃ³n rÃ¡pida.",
    url: "https://portotones.online",
    siteName: "PRO-PORTONES",
  },
};

export default async function PaginaPrincipal() {
  const { servicios, zonas } = await getDatos();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:px-10 lg:px-12">
        <header className="rounded-3xl border border-yellow-400 bg-white p-8 shadow-xl md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#002366]">
            Servicio profesional en Buenos Aires
          </p>
          <h1 className="text-4xl font-black leading-tight text-[#002366] md:text-5xl">
            Portones automÃ¡ticos, reparaciÃ³n y mantenimiento para tu hogar o negocio
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            En PRO-PORTONES solucionamos problemas urgentes, realizamos mantenimiento preventivo y
            instalamos portones automÃ¡ticos con tecnologÃ­a confiable, presupuesto gratis y garantÃ­a.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/5491163639909?text=Hola%20necesito%20un%20presupuesto%20gratis"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#FFD700] px-6 py-3 text-center font-semibold text-[#002366] transition hover:bg-yellow-500"
            >
              Solicitar presupuesto gratis
            </a>
            <a
              href="tel:+541163639909"
              className="rounded-full border border-[#002366] px-6 py-3 text-center font-semibold text-[#002366] transition hover:bg-slate-100"
            >
              Llamar al 11 6363-9909
            </a>
            <Link
              href="/contacto"
              className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Ver contacto
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#002366]">Servicios destacados</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Nuestros tÃ©cnicos atienden en toda la regiÃ³n de Buenos Aires con soluciones rÃ¡pidas para
              portones seccionales, basculantes, corredizos y automÃ¡ticos.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {servicios.map((servicio) => (
                <article key={servicio.servicio} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-[#002366]">{servicio.titulo ?? servicio.servicio.replace(/-/g, " ")}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{servicio.descripcion ?? servicio.problema}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {zonas.map((zona) => (
                      <Link
                        key={`${servicio.servicio}-${zona.slug_zona}`}
                        href={`/${servicio.servicio}/${zona.slug_zona}`}
                        className="rounded-full bg-[#002366] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-900"
                      >
                        {zona.nombre_zona}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-yellow-400 bg-[#002366] p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold">Â¿Por quÃ© elegir PRO-PORTONES?</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-100">
              <li>â€¢ AtenciÃ³n rÃ¡pida y soluciones para urgencias.</li>
              <li>â€¢ Presupuesto gratis y sin compromiso.</li>
              <li>â€¢ Trabajo profesional con garantÃ­a.</li>
              <li>â€¢ Repuestos originales y mantenimiento preventivo.</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Atendemos en:</p>
              <p className="mt-2 text-sm leading-7 text-slate-100">
                Zona Norte, Zona Sur, Zona Este, Zona Oeste y Centro de Buenos Aires.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}


