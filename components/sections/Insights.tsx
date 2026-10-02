import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { articles } from '@/content/articles';
import { site } from '@/content/site';
import { AnalyticsEvent } from '@/lib/analytics';
import styles from './Insights.module.css';

/**
 * Insights. The articles are not published yet, so the titles are not links:
 * a link to a page that does not exist costs trust and search ranking. The
 * shape is the one a CMS will fill, so publishing one only means setting
 * `status: 'published'` and adding the route.
 */
export function Insights() {
  return (
    <Section id="insights" label="Insights">
      <Container size="wide">
        <Reveal className={styles.header}>
          <Eyebrow>Insights</Eyebrow>
          <h2 className={styles.title}>
            Ideas sobre datos, finanzas, tecnología y producto.
          </h2>
        </Reveal>

        <ul className={styles.list}>
          {articles.map((article, index) => (
            <li key={article.slug} className={styles.item}>
              <Reveal delay={index * 70}>
                <span className={styles.topic}>{article.topic}</span>
              </Reveal>

              <Reveal delay={index * 70 + 40} className={styles.body}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <p className={styles.meta}>{article.readingTime} de lectura</p>
              </Reveal>

              <Reveal delay={index * 70 + 80}>
                <span className={styles.status}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  En preparación
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className={styles.footer}>
          <p className={styles.note}>
            Los primeros artículos están en preparación. Mientras tanto publico notas
            cortas sobre estos temas en LinkedIn.
          </p>
          <Button
            href={site.linkedin}
            variant="secondary"
            trailing="external"
            event={AnalyticsEvent.linkedinClick}
            eventPayload={{ origen: 'insights' }}
          >
            Seguir en LinkedIn
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
