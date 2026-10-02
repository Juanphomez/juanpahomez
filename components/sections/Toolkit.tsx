import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { toolGroups, toolsClosingLine } from '@/content/tools';
import { complementaryTraining, education } from '@/content/experience';
import styles from './Toolkit.module.css';

export function Toolkit() {
  return (
    <Section label="Herramientas y formación">
      <Container size="wide">
        <div className={styles.layout}>
          <Reveal className={styles.intro}>
            <Eyebrow>Herramientas</Eyebrow>
            <h2 className={styles.title}>
              La tecnología es una herramienta, no la estrategia.
            </h2>
          </Reveal>

          <div className={styles.groups}>
            {toolGroups.map((group, index) => (
              <Reveal key={group.id} delay={index * 100} className={styles.group}>
                <p className={styles.groupLabel}>{group.label}</p>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.education}>
            <div>
              <p className={styles.groupLabel}>Formación</p>
            </div>
            <ul className={styles.educationList}>
              {education.map((item) => (
                <li key={item.institution} className={styles.educationItem}>
                  <span className={styles.institution}>{item.institution}</span>
                  <span className={styles.credential}>{item.credential}</span>
                </li>
              ))}
            </ul>
            <ul className={styles.training} aria-label="Formación complementaria">
              {complementaryTraining.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className={styles.closing}>
            <p className={styles.closingText}>{toolsClosingLine}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
