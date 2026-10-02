import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Philosophy.module.css';

/** The principle that separates a demo from something a company can run on. */
export function Philosophy() {
  return (
    <Section surface="deep" space="tight" label="Principio de trabajo">
      <Container size="wide">
        <div className={styles.layout}>
          <Reveal>
            <blockquote className={styles.quote}>
              <span className={styles.lead}>
                Automatizar no es hacer que algo funcione una vez.
              </span>
              <span className={styles.turn}>
                Es construir algo que pueda seguir funcionando mañana.
              </span>
            </blockquote>
          </Reveal>

          <Reveal delay={180}>
            <p className={styles.attribution}>
              <span className={styles.attributionRule} aria-hidden="true" />
              Mantenible · Medible · Escalable
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
