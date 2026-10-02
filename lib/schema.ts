/**
 * JSON-LD builders. Only claims that the page itself supports — no invented
 * ratings, reviews, awards or credentials.
 */

import { site } from '@/content/site';
import { services } from '@/content/services';
import { education } from '@/content/experience';

type JsonLd = Record<string, unknown>;

const PERSON_ID = `${site.url}/#juan-pablo-homez`;
const SERVICE_ID = `${site.url}/#servicios`;
const WEBSITE_ID = `${site.url}/#website`;

export function personSchema(): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    url: site.url,
    jobTitle: 'Contador Público · Producto, datos y automatización',
    description: site.description,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    alumniOf: education.map((item) => ({
      '@type': 'EducationalOrganization',
      name: item.institution,
    })),
    knowsAbout: [
      'Automatización financiera',
      'Automatización contable',
      'Análisis de datos',
      'Business Intelligence',
      'Facturación electrónica',
      'Arquitectura de datos',
      'Producto digital',
      'Medios de pago',
      'Inteligencia artificial aplicada',
      'Dashboards financieros',
    ],
    knowsLanguage: ['es', 'en'],
  };
}

export function professionalServiceSchema(): JsonLd {
  return {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: `${site.name} — ${site.descriptor}`,
    description:
      'Consultoría en automatización financiera, análisis de datos, Business Intelligence, producto digital y formación para equipos financieros.',
    url: site.url,
    provider: { '@id': PERSON_ID },
    areaServed: { '@type': 'Country', name: 'Colombia' },
    availableLanguage: ['es'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios profesionales',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.headline,
        },
      })),
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'es',
    description: site.description,
    publisher: { '@id': PERSON_ID },
  };
}

export function webPageSchema(): JsonLd {
  return {
    '@type': 'WebPage',
    '@id': `${site.url}/#webpage`,
    url: site.url,
    name: `${site.name} — ${site.tagline}`,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    inLanguage: 'es',
    primaryImageOfPage: { '@id': `${site.url}/#portrait` },
  };
}

/** One graph for the whole document — the shape search engines prefer. */
export function homeSchemaGraph(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      professionalServiceSchema(),
      websiteSchema(),
      webPageSchema(),
    ],
  };
}
