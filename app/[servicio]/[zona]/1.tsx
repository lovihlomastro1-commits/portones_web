import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';

interface Servicio {
  servicio: string;
  beneficios?: string[];  descripcion?: string;}

interface Zona {
  slug_zona: string;
  nombre_zona: string;
}

async function getDatos(): Promise<{ servicios: Servicio[]; zonas: Zona[] }> {
  try {
    const dataDir = path.join(process.cwd(), 'data'); const serviciosPath = path.join(dataDir, 'servicios.json');    const zonasPath = path.join(dataDir, 'zonas.json');

    try {
      await fs.access(dataDir); } catch {      await fs.mkdir(dataDir, { recursive: true });
    } let serviciosData: Servicio[] = [];    let zonasData: Zona[] = []; try {
      const serviciosFile = await fs.readFile(serviciosPath, 'utf8');      serviciosData = JSON.parse(serviciosFile); } catch (error) {
      console.warn('Archivo servicios.json no encontrado o inválido');    }

    try {
      const zonasFile = await fs.readFile(zonasPath, 'utf8'); zonasData = JSON.parse(zonasFile);
    } catch (error) {
      console.warn('Archivo zonas.json no encontrado o inválido'); }

    return {      servicios: Array.isArray(serviciosData) ? serviciosData : [],
      zonas: Array.isArray(zonasData) ? zonasData : []
    };  } catch (error) { console.error('Error en getDatos:', error);
    return { servicios: [], zonas: [] }; }
}

export async function generateStaticParams() { const { servicios, zonas } = await getDatos();  if (servicios.length === 0 || zonas.length === 0) {
    return [{ servicio: 'reparacion-portones', zona: 'zona-norte' }];  }

  return servicios.flatMap((servicio) =>    zonas.map((zona) => ({ servicio: servicio.servicio,
      zona: zona.slug_zona    }))  );}

export async function generateMetadata({ params }: { params: { servicio: string; zona: string } }): Promise<Metadata> {
  const { servicio, zona } = params;
  const { servicios, zonas } = await getDatos();
  const servicioEncontrado = servicios.find(s => s.servicio === servicio);
  const zonaEncontrada = zonas.find(z => z.slug_zona === zona);  const title = servicioEncontrado
    ? `${servicioEncontrado.servicio.replace(/-/g, ' ')} en ${zonaEncontrada?.nombre_zona || zona}| Pro-Portones`
    : "Servicio Profesional de Portones";

  const description = servicioEncontrado
    ? `Especialistas en ${servicioEncontrado.servicio.replace(/-/g, ' ')} en ${zonaEncontrada?.nombre_zona || zona}. ${servicioEncontrado.descripcion || ''}` : "Servicios profesionales de portones en todas las zonas";  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/logo-pro-portones.png' }]    }
  };}

export default async function Pagina({ params }: { params: { servicio: string; zona: string } }) {
  const { servicio, zona } = params;
  const { servicios, zonas } = await getDatos();  const s = servicios.find(x => x.servicio === servicio);
  const z = zonas.find(x => x.slug_zona === zona); const contenidoPorDefecto = {
    servicioNombre: 'Reparación de Portones',
    beneficios: [
      'Servicio rápido y eficiente',
      'Técnicos certificados',
      'Garantía en todos nuestros trabajos',
      'Presupuestos sin compromiso',
      'Disponibilidad 24/7'
    ],    descripcionZona: 'Zona Norte de Santiago, incluyendo comunas como Huechuraba, Recoleta, Independencia y Conchalí'
  }; const datosServicio = s || {
    servicio: contenidoPorDefecto.servicioNombre,
    beneficios: contenidoPorDefecto.beneficios,
    descripcion:`Especialistas en reparación de portones para ${contenidoPorDefecto.descripcionZona}. ${contenidoPorDefecto.beneficios.join('. ')}. Contáctenos al 11 6363 9909 o por WhatsApp para solicitar su presupuesto sin compromiso.`
  };  const datosZona = z || {
    slug_zona: zona,
    nombre_zona: 'Zona Norte'
  };

return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12"> <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-yellow-400">
        <div className="bg-[#002366] p-8 text-center"> <h1 className="text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.3em] mb-2"> Servicio Profesional
          </h1>
          <h2 className="text-white text-3xl font-black uppercase italic leading-tight"> {datosServicio.servicio.replace(/-/g, ' ')}            <span className="text-[#FFD700]"> en </span>
            <br/>
            {datosZona.nombre_zona}
          </h2>
        </div>

        <div className="p-8 text-[#334155]"> <section className="mb-6">            <h3 className="text-[#002366] text-[22px] font-bold mb-3 border-b border-[#FFD700] pb-1"> Descripción
            </h3>
            <p className="text-[17px] leading-[1.6]"> {datosServicio.descripcion} </p>
          </section>

          <section className="mb-6"> <h3 className="text-[#002366] text-[22px] font-bold mb-3 border-b border-[#FFD700] pb-1">
              Beneficios
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-[17px] leading-[1.6]">
              {datosServicio.beneficios?.map((beneficio, index) => (
                <li key={index} className="text-[#334155]">
                  {beneficio}                </li>
              ))}            </ul>
          </section>

          <section className="mb-8">            <h3 className="text-[#002366] text-[22px] font-bold mb-3 border-b border-[#FFD700] pb-1">
              Contáctenos
            </h3>
            <div className="space-y-4 text-[17px] leading-[1.6]">
              <p>
                <strong className="text-[#002366]">Teléfono:</strong> 11 63639909
              </p>
              <p>
                <strong className="text-[#002366]">WhatsApp:</strong>{' '}
                <a href="https://wa.me/5491163639909" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">                  11 63639909
                </a>
              </p>
              <p>
                Nuestro equipo está disponible para atender sus consultas y brindarle un presupuesto personalizado sin compromiso.
              </p>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 justify-center"> <Link
              href={`/contacto?servicio=${encodeURIComponent(datosServicio.servicio)}&zona=${encodeURIComponent(datosZona.slug_zona)}`}
              className="bg-[#FFD700] text-[#002366] font-bold py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-center" >
              SOLICITAR PRESUPUESTO
            </Link>
            <Link
              href="/"              className="bg-[#002366] text-white font-bold py-3 px-8 rounded-full hover:bg-blue-8oo transition-colors duration-300 text-center"
            >              VOLVER AL INICIO
            </Link>
          </div>

          <div className="mt-8 text-center text-sm text-gray-5oo">            <p>Servicio disponible las 24 horas, los 7 días de la semana</p>
          </div>
        </div>
      </div>
   </main>
  );
}