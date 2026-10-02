import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif } from 'next/font/google';
import { site } from '@/content/site';
import { homeSchemaGraph } from '@/lib/schema';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/layout/Analytics';
import './globals.css';

/* Self-hosted, subset and preloaded by next/font — no external request,
   no render-blocking stylesheet, no layout shift from a font swap. */
const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'automatización financiera',
    'automatización contable',
    'análisis de datos',
    'Business Intelligence',
    'dashboards financieros',
    'IA para contadores',
    'facturación electrónica',
    'consultoría financiera',
    'consultoría tecnológica',
    'producto fintech',
    'transformación digital',
    'Juan Pablo Hómez',
    'Bogotá',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    locale: 'es_CO',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    firstName: 'Juan Pablo',
    lastName: 'Hómez',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0b2545' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${interTight.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Opts into the reveal styles before first paint, and only where the
            IntersectionObserver that reverses them exists. Without JavaScript
            or without the API, nothing is ever hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window)document.documentElement.setAttribute('data-js','on')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchemaGraph()) }}
        />
      </head>
      <body>
        <a href="#contenido" className="skipLink">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
