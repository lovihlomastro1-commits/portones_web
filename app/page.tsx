import fs from 'fs';
import path from 'path';
import Link from 'next/link';

async function getDatos() {
  const serviciosPath = path.join(process.cwd(), 'data', 'servicios.json');
  const zonasPath = path.join(process.cwd(), 'data', 'zonas.json');
  const servicios = JSON.parse(fs.readFileSync(serviciosPath, 'utf8'));
  const zonas = JSON.parse(fs.readFileSync(zonasPath, 'utf8'));
  return { servicios, zonas };
}

export default async function PaginaPrincipal() {
  const { servicios, zonas } = await getDatos();

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#002366] mb-4">PRO-PORTONES</h1>
        <p className="text-lg text-gray-600 mb-8">Seleccioná tu zona para ver nuestros servicios</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map((s: any) => (
            <div key={s.servicio} className="bg-white p-6 rounded-xl shadow-md border border-[#FFD700]">
              <h2 className="text-2xl font-bold text-[#002366] mb-2">{s.servicio}</h2>
              <p className="text-[#B8860B] font_semibold mb-[15px]">{s.problema}</p>
              <div className="flex flex-wrap gap-[10px] justify-center">
                {zonas.map((z: any) => (
                  <Link 
                    key={z.slug_zona} 
                    href={`/${s.servicio}/${z.slug_zona}`} 
                    className="bg-[#FFD700] hover:bg-[#e6c200] text-[#002366] font_bold px-[15px] py-[5px] rounded"
                  >
                    {z.nombre_zona}
                  </Link>                ))}
              </div>
            </div>          ))}
        </div>      </div>    </main>
  ); 
} 
