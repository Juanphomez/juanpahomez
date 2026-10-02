import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { Photo } from '@/components/ui/Photo';
import { talks, trainingTopics } from '@/content/talks';
import { photos } from '@/content/photos';
import { AnalyticsEvent } from '@/lib/analytics';
import styles from './Talks.module.css';

export function Talks() {
  return (
    <Section id="conferencias" surface="sunken" label="Conferencias y workshops">
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <Reveal>
              <Eyebrow>Conferencias &amp; workshops</Eyebrow>
            </Reveal>

            <LineReveal
              as="h2"
              className={styles.title}
              delay={80}
              lines={['Compartir conocimiento', 'también transforma procesos.']}
            />

            <Reveal delay={180}>
              <p className={styles.copy}>
                Diseño charlas y talleres para empresas, universidades y equipos que quieran
                entender cómo aplicar tecnología, datos e inteligencia artificial en su
                trabajo.
              </p>
            </Reveal>

            <Reveal delay={260} className={styles.photoWrap}>
              <Photo
                photo={photos.fintechEvent}
                ratio="4 / 3"
                sizes="(min-width: 64rem) 40vw, 100vw"
                className={styles.photo}
              />
              <p className={styles.caption}>
                <span className={styles.captionRule} aria-hidden="true" />
                {photos.fintechEvent.caption}
              </p>
            </Reveal>
          </div>

          <div className={styles.topicsWrap}>
            <ol className={styles.topics}>
              {talks.map((talk, index) => (
                <li key={talk.id} className={styles.topic}>
                  <span className={styles.topicIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Reveal delay={index * 90} className={styles.topicBody}>
                    <h3 className={styles.topicTitle}>{talk.title}</h3>
                    <p className={styles.topicDescription}>{talk.description}</p>
                    <p className={styles.audience}>{talk.audience}</p>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal>
              <p className={styles.trainingNote}>
                También he liderado capacitaciones internas en {trainingTopics.join(', ')}.
              </p>
              <Button
                href="#contacto"
                trailing="right"
                className={styles.cta}
                event={AnalyticsEvent.talksCta}
                eventPayload={{ etiqueta: 'Invítame a una conferencia' }}
              >
                Invítame a una conferencia
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
