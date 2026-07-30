import { FC } from 'react';

interface SchemaMarkupProps {
  servicio: string;
  zona: string;
  phone: string;
}

const formatText = (text: string): string => text.replace(/-/g, ' ');

export const SchemaMarkup: FC<SchemaMarkupProps> = ({ servicio, zona, phone }) => { // Declaración explícita de variables con valores por defecto
  const safeServicio = servicio || 'servicio';
  const safeZona = zona || 'zona';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [      {
        "@type": "Service",
        "@id": "https://pro-portones.com/#service",
        "name": `${formatText(safeServicio)} en ${formatText(safeZona)}`,        "description": `Servicio profesional de ${formatText(safeServicio)} en ${formatText(safeZona)}. Técnicos certificados. Presupuesto GRATIS. WhatsApp ${phone}. Disponible 24/7.`,
        "provider": {
          "@type": "Organization",
          "name": "Pro-Portones™",
          "telephone": `+54${phone}`        },
        "areaServed": [
          {
            "@type": "City",
            "name": formatText(safeZona)
          }        ],
        "offers": {          "@type": "Offer",
          "url": `https://pro-portones.com/${safeServicio}/${safeZona}`,
          "priceCurrency": "ARS",
          "price": "0"        }
      },      {
        "@type": "LocalBusiness",
        "@id": "https://pro-portones.com/#localbusiness",
        "name": "Pro-Portones™ - Servicio Técnico Móvil",
        "description": `Servicio técnico especializado en ${formatText(safeServicio)} en ${formatText(safeZona)}.`,
        "telephone": `+54${phone}`, "address": {          "@type": "PostalAddress",
          "addressLocality": formatText(safeZona),
          "addressRegion": "Buenos Aires",          "addressCountry": "AR"        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "23:59"          }
        ]      }
    ]  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}    />
  );};