import type { Metadata } from 'next';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section space="loose" label="Página no encontrada">
      <Container size="narrow">
        <div style={{ display: 'grid', gap: 'var(--s-6)', justifyItems: 'start' }}>
          <Eyebrow>Error 404</Eyebrow>
          <h1
            style={{
              margin: 0,
              fontSize: 'var(--fs-h2)',
              fontWeight: 'var(--fw-medium)',
              letterSpacing: 'var(--ls-tighter)',
              lineHeight: 'var(--lh-snug)',
              maxWidth: '20ch',
            }}
          >
            Esta página no existe.
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: '44ch',
              color: 'var(--fg-muted)',
              fontSize: 'var(--fs-body-lg)',
              lineHeight: 'var(--lh-relaxed)',
            }}
          >
            Puede que el enlace esté roto o que el contenido haya cambiado de lugar.
          </p>
          <Button href="/" trailing="right">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </Section>
  );
}
