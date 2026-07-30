import { Metadata } from 'next';

interface ContentData {
  title: string;
  metaDescription: string;
  h1: string;
  description: string;
  benefits: string[];
  faq: { question: string; answer: string }[]; cta: string;
  phone: string;
  whatsapp: string;
}

export const generateContent = (servicio: string, zona: string): ContentData => {
  // Normalizar nombres para semántica
  const servicioNormalizado = servicio.replace(/-/g, ' ');
  const zonaNormalizada = zona.replace(/-/g, ' ').replace('zona', '').trim();

  // Matriz de variantes semánticas
  const variantes = {
    urgente: {
      title: `⚡ ${servicioNormalizado} URGENTE en ${zonaNormalizada} - Pro-Portones™ | Presupuesto GRATIS`,      metaDescription: `✅ ${servicioNormalizado} INMEDIATO en ${zonaNormalizada}. Técnicos certificados. Presupuesto GRATIS en WhatsApp 1163639909. ¡Llamá ahora!`,      h1: `Reparación Urgente de Portones en ${zonaNormalizada} - Servicio 24/7`,      description: `¿Necesitas ${servicioNormalizado} en ${zonaNormalizada}? En Pro-Portones respondemos en menos de 1 hora. Técnicos especializados, herramientas profesionales y presupuesto sin cargo. ¡No esperes a que el problema empeore! Contáctanos al 1163639909 o por WhatsApp y solucionamos tu portón automático, basculante o seccional hoy mismo.`,      benefits: [
        '✅ Servicio en menos de 1 hora en toda la zona',
        '✅ Técnicos certificados con más de 10 años de experiencia',
        '✅ Presupuesto GRATIS sin compromiso',
        '✅ Garantía por escrito en todos nuestros trabajos',
        '✅ Disponibilidad 24/7, los 365 días del año',
        '✅ Repuestos originales y de alta calidad'
      ],
      faq: [
        {
          question: `¿Cuánto cuesta ${servicioNormalizado} en ${zonaNormalizada}?`,          answer: `El costo varía según el tipo de portón y la complejidad del trabajo. En Pro-Portones ofrecemos presupuesto GRATIS en el momento. Contáctanos al 1163639909 y un técnico evaluará tu caso sin cargo.`        },
        {          question: `¿Hacen ${servicioNormalizado} los fines de semana?`,          answer: `¡Sí! Trabajamos los 7 días de la semana, incluyendo feriados. Nuestro servicio de emergencia está disponible las 24 horas. Llámanos al 1163639909 y enviaremos un técnico a tu domicilio en ${zonaNormalizada} de inmediato.`
        }      ],
      cta: `¡No esperes más! Tu portón necesita atención profesional.`,      phone: '1163639909',
      whatsapp: '5491163639909'
    }, economico: {
      title: `💰 ${servicioNormalizado} ECONÓMICO en ${zonaNormalizada} - Pro-Portones™ | Mejor Precio`,      metaDescription: `🔧 ${servicioNormalizado} al MEJOR PRECIO en ${zonaNormalizada}. Presupuesto GRATIS. WhatsApp 1163639909. ¡Calidad garantizada!`,      h1: `${servicioNormalizado} en ${zonaNormalizada} - Calidad al Mejor Precio`,      description: `¿Buscas ${servicioNormalizado} en ${zonaNormalizada} al mejor precio? En Pro-Portones combinamos calidad profesional con tarifas accesibles. Trabajamos con repuestos originales y ofrecemos financiamiento en hasta 12 cuotas. ¡Presupuesto GRATIS y sin compromiso! Contáctanos al WhatsApp 1163639909 y descubre por qué somos la opción más económica de la zona.`,      benefits: [
        '💰 Precios competitivos sin sacrificar calidad',
        '🔧 Repuestos originales y de alta durabilidad',
        '📅 Financiamiento en hasta 12 cuotas sin interés',
        '🛠️ Técnicos especializados en todos los tipos de portones',
        '📞 Presupuesto GRATIS en menos de 1 hora',
        '🏆 Garantía extendida en todos nuestros servicios'
      ],      faq: [
        {
          question: `¿Tienen descuentos para ${servicioNormalizado} en ${zonaNormalizada}?`, answer: `¡Sí! Ofrecemos descuentos por pago en efectivo y promociones especiales para clientes recurrentes. Además, tenemos planes de mantenimiento con tarifas preferenciales. Contáctanos al 1163639909 para conocer nuestras ofertas vigentes.` }      ],
      cta: `Ahorrá dinero sin sacrificar calidad. ¡Solicitá tu presupuesto hoy!`,
      phone: '1163639909',
      whatsapp: '5491163639909'
    }  };

  // Seleccionar variante basada en el servicio
  const variante = servicio.includes('urgente') ? variantes.urgente :
                  servicio.includes('economico') ? variantes.economico :
                  variantes.urgente;

  return {
    ...variante,
    title: variante.title.replace('[SERVICIO]', servicioNormalizado).replace('[ZONA]', zonaNormalizada),    metaDescription: variante.metaDescription.replace('[SERVICIO]', servicioNormalizado).replace('[ZONA]', zonaNormalizada),
    h1: variante.h1.replace('[SERVICIO]', servicioNormalizado).replace('[ZONA]', zonaNormalizada), description: variante.description.replace('[SERVICIO]', servicioNormalizado).replace('[ZONA]', zonaNormalizada)
  };};