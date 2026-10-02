/**
 * Site-level constants. Single source for metadata, navigation and contact.
 */

export const site = {
  name: 'Juan Pablo Hómez',
  domain: 'juanpablohomez.com',
  /** Canonical origin. Overridable per environment (previews, staging). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://juanpablohomez.com',
  role: 'Contador Público · Datos, automatización y producto',
  descriptor: 'Contabilidad · Datos · Tecnología · Producto',
  location: {
    city: 'Bogotá',
    country: 'Colombia',
    countryCode: 'CO',
  },
  email: 'hola@juanpablohomez.com',
  linkedin: 'https://www.linkedin.com/in/juanpablohomez/',
  /** Used by metadata, Open Graph and JSON-LD. Kept under 160 chars. */
  description:
    'Ayudo a empresas a transformar procesos financieros, contables y de negocio con datos, automatización y tecnología. Contador público con más de 8 años en finanzas y fintech.',
  tagline: 'Menos procesos manuales. Más información para decidir.',
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** id of the section this item tracks, for scroll-spy */
  section?: string;
};

export const navigation: readonly NavItem[] = [
  { label: 'Inicio', href: '#inicio', section: 'inicio' },
  { label: 'Servicios', href: '#servicios', section: 'servicios' },
  { label: 'Proyectos', href: '#proyectos', section: 'proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi', section: 'sobre-mi' },
  { label: 'Conferencias', href: '#conferencias', section: 'conferencias' },
  { label: 'Insights', href: '#insights', section: 'insights' },
] as const;

/** Footer link groups — kept separate from the primary nav on purpose. */
export const footerLinks = {
  site: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Conferencias', href: '#conferencias' },
    { label: 'Insights', href: '#insights' },
  ],
  contact: [
    { label: 'Escríbeme', href: '#contacto' },
    { label: 'LinkedIn', href: site.linkedin, external: true },
    { label: site.email, href: `mailto:${site.email}` },
  ],
} as const;
