import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { TagList } from '@/components/ui/Tag';
import { cases } from '@/content/cases';
import { AnalyticsEvent } from '@/lib/analytics';
import styles from './Cases.module.css';

/** Each case gets its own composition so the section never reads as a grid. */
const LAYOUTS = ['figure', 'sequence', 'reasoning'] as const;

export function Cases() {
  return (
    <Section id="proyectos" label="Casos de impacto">
      <Container size="wide">
        <Reveal className={styles.header}>
          <Eyebrow>Experiencia aplicada</Eyebrow>
          <LineReveal
            as="h2"
            className={styles.title}
            lines={['De problemas reales', 'a resultados medibles.']}
          />
        </Reveal>

        <ol className={styles.list}>
          {cases.map((item, index) => (
            <li
              key={item.id}
              className={styles.case}
              data-layout={LAYOUTS[index % LAYOUTS.length]}
            >
              <Reveal className={styles.meta}>
                <span className={styles.index}>{item.index}</span>
                <span className={styles.eyebrowText}>{item.eyebrow}</span>
              </Reveal>

              <Reveal delay={80} className={styles.body}>
                <h3 className={styles.caseTitle}>{item.headline}</h3>
                <p className={styles.summary}>{item.summary}</p>
                <p className={styles.problem}>{item.problem}</p>

                <Button
                  href="#contacto"
                  variant="link"
                  trailing="right"
                  className={styles.cta}
                  event={AnalyticsEvent.caseCta}
                  eventPayload={{ caso: item.id, etiqueta: item.cta }}
                >
                  {item.cta}
                </Button>
              </Reveal>

              <Reveal delay={160} className={styles.aside}>
                {item.figures.length > 0 ? (
                  <ul className={styles.figures}>
                    {item.figures.map((figure) => (
                      <li key={figure.value} className={styles.figure}>
                        <span className={styles.figureValue}>
                          {figure.readAs ? (
                            <span className="sr-only">{figure.readAs}</span>
                          ) : null}
                          <span aria-hidden={figure.readAs ? 'true' : undefined}>
                            {figure.value}
                          </span>
                        </span>
                        <span className={styles.figureLabel} aria-hidden={figure.readAs ? 'true' : undefined}>
                          {figure.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div>
                  <p className={styles.approachTitle}>Enfoque</p>
                  <ul className={styles.approach}>
                    {item.approach.map((step) => (
                      <li key={step}>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <TagList
                  items={item.tags}
                  className={styles.tags}
                  label={`Temas del caso ${item.index}`}
                />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
