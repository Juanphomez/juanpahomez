import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { Metric } from '@/components/ui/Metric';
import { Photo } from '@/components/ui/Photo';
import { metrics } from '@/content/metrics';
import { photos } from '@/content/photos';
import { AnalyticsEvent } from '@/lib/analytics';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <Section id="inicio" space="flush" grid label="Presentación" className={styles.hero}>
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.opening}>
            <Reveal fast>
              <Eyebrow>Contabilidad · Datos · Tecnología · Producto</Eyebrow>
            </Reveal>

            <LineReveal
              as="h1"
              className={styles.title}
              delay={60}
              stagger={70}
              fast
              lines={[
                'Menos procesos manuales.',
                <>
                  Más información para <em>decidir</em>.
                </>,
              ]}
            />
          </div>

          <div className={styles.lead}>
            <Reveal fast delay={120} className={styles.body}>
              <p>
                Soy Juan Pablo Hómez. Ayudo a empresas a transformar procesos financieros,
                contables y de negocio utilizando datos, automatización y tecnología.
              </p>
              <p className={styles.bodySecondary}>
                Desde optimizar un proceso hasta construir una solución digital, el objetivo
                es el mismo: hacer las cosas más simples, medibles y escalables.
              </p>
            </Reveal>

            <Reveal fast delay={200} className={styles.actions}>
              <Button
                href="#contacto"
                size="lg"
                trailing="right"
                fluid
                event={AnalyticsEvent.heroCta}
                eventPayload={{ etiqueta: 'Cuéntame tu proyecto' }}
              >
                Cuéntame tu proyecto
              </Button>
              <Button
                href="#servicios"
                variant="link"
                trailing="down"
                event={AnalyticsEvent.heroScroll}
              >
                Conoce cómo puedo ayudarte
              </Button>
            </Reveal>
          </div>

          <div className={styles.visual}>
            <Reveal from="scale" fast delay={120} className={styles.portrait}>
              <Photo
                photo={photos.portrait}
                ratio="4 / 5"
                sizes="(min-width: 80rem) 30vw, (min-width: 64rem) 36vw, (min-width: 48rem) 55vw, 100vw"
                priority
              />
            </Reveal>

            {/* The figures annotate the portrait rather than sitting in cards. */}
            <ul className={styles.rail}>
              {metrics.map((metric, index) => (
                <li key={metric.id} className={styles.railItem}>
                  <Reveal fast delay={240 + index * 70}>
                    <Metric metric={metric} size="sm" delay={index * 120} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
