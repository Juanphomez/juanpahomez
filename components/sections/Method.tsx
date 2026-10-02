'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { methodSteps } from '@/content/method';
import styles from './Method.module.css';

/**
 * The eight stages, in order. A progressive rail marks how far the reader has
 * come — which is the point of the section: the order is the method.
 */
export function Method() {
  const [reached, setReached] = useState(0);

  useEffect(() => {
    // The rail is a progress indicator for the list beside it; without the
    // observer it stays unfilled and the steps are unaffected.
    if (typeof IntersectionObserver === 'undefined') return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-method-step]'),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.methodStep);
          setReached((current) => Math.max(current, index + 1));
        }
      },
      { rootMargin: '0px 0px -35% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const progress = (reached / methodSteps.length) * 100;

  return (
    <Section surface="sunken" label="Cómo trabajo">
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <Reveal>
              <Eyebrow>Cómo trabajo</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className={styles.title}
              delay={80}
              lines={['Primero entendemos.', 'Después construimos.']}
            />
            <Reveal delay={200}>
              <p className={styles.note}>
                El orden importa más que la lista. Cada etapa existe para evitar construir
                algo que después nadie pueda sostener.
              </p>
            </Reveal>
          </div>

          <div className={styles.stepsWrap}>
            <span className={styles.rail} aria-hidden="true">
              <span
                className={styles.railFill}
                style={{ '--progress': `${progress}%` } as React.CSSProperties}
              />
            </span>

            <ol className={styles.steps}>
              {methodSteps.map((step, index) => (
                <li
                  key={`${step.index}-${step.title}`}
                  className={styles.step}
                  data-method-step={index}
                  data-reached={index < reached ? 'true' : 'false'}
                >
                  <span className={styles.marker} aria-hidden="true" />
                  <div className={styles.stepHead}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {step.index}
                    </span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                  </div>
                  <p className={styles.stepQuestion}>{step.question}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
