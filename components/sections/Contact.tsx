import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { ContactForm } from './ContactForm';
import { site } from '@/content/site';
import { AnalyticsEvent } from '@/lib/analytics';
import styles from './Contact.module.css';

/**
 * The closing argument and the form, together. Two separate calls to action
 * this close to each other would compete; one block converts better.
 */
export function Contact() {
  return (
    <Section id="contacto" surface="deep" space="loose" label="Contacto">
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <Reveal>
              <Eyebrow marked>Hablemos</Eyebrow>
            </Reveal>

            <LineReveal
              as="h2"
              className={styles.title}
              delay={80}
              lines={['¿Tienes un proceso', 'que sabes que podría', 'funcionar mejor?']}
            />

            <Reveal delay={200} className={styles.copy}>
              <p>Cuéntame qué estás intentando resolver.</p>
              <p>
                No importa si todavía no sabes si necesitas una automatización, un
                dashboard, una integración o un desarrollo.
              </p>
              <p className={styles.emphasis}>Primero entendamos el problema.</p>
            </Reveal>

            <Reveal delay={300} className={styles.direct}>
              <p className={styles.directLabel}>También puedes escribirme directo</p>
              <div className={styles.directLinks}>
                <Button
                  href={`mailto:${site.email}`}
                  variant="link"
                  event={AnalyticsEvent.emailClick}
                  eventPayload={{ origen: 'contacto' }}
                >
                  {site.email}
                </Button>
                <Button
                  href={site.linkedin}
                  variant="link"
                  trailing="external"
                  event={AnalyticsEvent.linkedinClick}
                  eventPayload={{ origen: 'contacto' }}
                >
                  LinkedIn
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
