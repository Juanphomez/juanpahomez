import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

/**
 * Social preview, generated at build time. Keeps the brand consistent on
 * LinkedIn and in messages without maintaining a separate image asset.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0b2545 0%, #071a33 100%)',
          color: '#eaf1fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 40, height: 2, background: '#f0a63c' }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#a8bdd8',
            }}
          >
            Contabilidad · Datos · Tecnología · Producto
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Menos procesos manuales. Más información para decidir.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 32,
            borderTop: '1px solid #1b3c66',
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.8 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 24, color: '#a8bdd8' }}>{site.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
