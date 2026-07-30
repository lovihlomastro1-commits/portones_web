'use client';

import { useParams } from 'next/navigation';
import { LogoImage } from '@/components/LogoImage';

// ========== 1. COMPONENTE DE SCHEMA MARKUP ==========
const SchemaMarkup = ({ servicio, zona, phone }: { servicio: string; zona: string; phone: string }) => {
  const formatText = (text: string) => text.replace(/-/g, ' ');

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `${formatText(servicio)} en ${formatText(zona)}`,
        "description": `Servicio profesional de ${formatText(servicio)} en ${formatText(zona)}. Presupuesto GRATIS. WhatsApp ${phone}.`,
        "provider": {
          "@type": "Organization",
          "name": "Pro-Portones™",
          "telephone": `+54${phone}`
        },
        "areaServed": [{ "@type": "City", "name": formatText(zona) }],
        "offers": {
          "@type": "Offer",
          "url": `https://pro-portones.com/${servicio}/${zona}`,
          "priceCurrency": "ARS",
          "price": "0"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Pro-Portones™ - Servicio Técnico Móvil",
        "telephone": `+54${phone}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": formatText(zona),
          "addressRegion": "Buenos Aires",
          "addressCountry": "AR"
        },
        "openingHoursSpecification": [{
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// ========== 2. FUNCIÓN PARA FORMATEAR TÍTULOS ==========
const formatTitle = (text: string | undefined) => {
  if (!text) return 'Servicio';
  return text.replace(/-/g, ' ');
};

// ========== 3. ESTILOS CSS ==========
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    textAlign: 'center' as const,
  },
  title: {
    color: '#2c3e50',
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    fontWeight: 700,
    textTransform: 'capitalize' as const,
  },
  description: {
    color: '#34495e',
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.6'
  },
  ctaButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '1rem'
  },
  footerInfo: {
    marginTop: '3rem',
    color: '#7f8c8d',
    fontSize: '0.9rem'
  }
};

// ========== 4. COMPONENTE PRINCIPAL ==========
export default function ServicePage() {
  const params = useParams();
  const servicioParam = params?.servicio as string || 'servicio';
  const zonaParam = params?.zona as string || 'zona';

  // Eliminamos "portones", "servicio de" o "servicio" que vengan desde la URL
  const servicioLimpio = formatTitle(servicioParam)
    .replace(/portones/gi, '')
    .replace(/servicio\s+de/gi, '')
    .replace(/servicio/gi, '')
    .trim();

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={{ marginBottom: '2rem' }}>
        <LogoImage
          src="/logo-pro-portones.png"
          alt="Pro-Portones Logo"
          style={{ maxWidth: '200px', height: 'auto' }}
        />
      </div>

      {/* Título limpio: "Servicio de Reparación de Portones en Zona Norte" */}
      <h1 style={styles.title}>
        Servicio de {servicioLimpio} de Portones en {formatTitle(zonaParam)}
      </h1>

      {/* Descripción */}
      <p style={styles.description}>
        Presupuesto <strong>GRATIS</strong>. Nuestros técnicos certificados están disponibles las 24 horas para resolver cualquier problema con sus portones.
      </p>

      {/* Botón de WhatsApp */}
      <a
        href={`https://wa.me/541163639909?text=Hola,%20necesito%20${encodeURIComponent(formatTitle(servicioParam))}%20en%20${encodeURIComponent(formatTitle(zonaParam))}`}
        style={styles.ctaButton}
      >
        Contáctanos por WhatsApp
      </a>

      {/* Información adicional */}
      <div style={styles.footerInfo}>
        <p>Atención inmediata en toda la zona de Buenos Aires</p>
        <p>Teléfono: 11 6363-9909</p>
      </div>

      {/* Schema Markup */}
      <SchemaMarkup servicio={servicioParam} zona={zonaParam} phone="1163639909" />
    </div>
  );
}