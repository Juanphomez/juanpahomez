import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Metric } from '@/components/ui/Metric';
import { metrics } from '@/content/metrics';
import styles from './Results.module.css';

export function Results() {
  return (
    <Section
      surface="sunken"
      space="tight"
      ruled="both"
      label="Resultados"
    >
      <Container size="wide">
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <Eyebrow>Evidencia</Eyebrow>
            <p className={styles.headline}>
              Resultados que van más allá de una presentación bonita.
            </p>
          </Reveal>

          <ul className={styles.figures}>
            {metrics.map((metric, index) => (
              <li key={metric.id} className={styles.figure}>
                <Reveal delay={index * 110}>
                  <Metric metric={metric} caption wideLabel delay={index * 140} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
