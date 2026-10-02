'use client';

import { useInView } from '@/hooks/useInView';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { statementTools } from '@/content/tools';
import styles from './Statement.module.css';

/**
 * The single idea the brand rests on. The tool names enumerate themselves and
 * the closing line arrives last, so the section argues instead of asserting.
 */
export function Statement() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <Section space="loose" label="No vendo herramientas">
      <Container>
        <div ref={ref} className={styles.layout} data-revealed={inView ? 'true' : 'false'}>
          <p className={styles.statement}>
            <span className={styles.quiet}>No vendo herramientas.</span>
            <br />
            Resuelvo problemas utilizando la <em>herramienta adecuada</em>.
          </p>

          <ul className={styles.tools}>
            {statementTools.map((tool, index) => (
              <li
                key={tool}
                className={styles.tool}
                style={{ '--i': index } as React.CSSProperties}
              >
                {tool}
              </li>
            ))}
          </ul>

          <div className={styles.conclusion}>
            <span className={styles.conclusionRule} aria-hidden="true" />
            <p className={styles.conclusionText}>La herramienta depende del problema.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
