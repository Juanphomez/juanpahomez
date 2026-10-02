import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { eras, todayLabel } from '@/content/experience';
import styles from './Timeline.module.css';

export function Timeline() {
  return (
    <Section surface="sunken" label="Trayectoria profesional">
      <Container size="wide">
        <Reveal className={styles.header}>
          <Eyebrow>Trayectoria</Eyebrow>
          <h2 className={styles.title}>Cada etapa no reemplazó a la anterior. Se sumó.</h2>
        </Reveal>

        <ol className={styles.track}>
          {eras.map((era, index) => (
            <li
              key={era.id}
              className={styles.era}
              data-current={index === eras.length - 1 ? 'true' : 'false'}
            >
              <span className={styles.marker} aria-hidden="true" />
              <Reveal delay={index * 110} className={styles.eraInner}>
                <p className={styles.period}>{era.period}</p>
                <h3 className={styles.eraTitle}>{era.title}</h3>
                <p className={styles.note}>{era.note}</p>
                <ul className={styles.capabilities}>
                  {era.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}

          <li className={styles.today}>
            <Reveal delay={eras.length * 110}>
              <p className={styles.period}>{todayLabel.period}</p>
            </Reveal>
            <Reveal delay={eras.length * 110 + 80} className={styles.todayBody}>
              <h3 className={styles.todayTitle}>{todayLabel.title}</h3>
              <p className={styles.note}>{todayLabel.note}</p>
            </Reveal>
          </li>
        </ol>
      </Container>
    </Section>
  );
}
