import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { Photo } from '@/components/ui/Photo';
import { photos } from '@/content/photos';
import { site } from '@/content/site';
import styles from './About.module.css';

const CONVERGENCE = ['Finanzas', 'Datos', 'Tecnología', 'Negocio'];

export function About() {
  return (
    <Section id="sobre-mi" label="Sobre mí">
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.visual}>
            <Reveal from="scale" className={styles.portrait}>
              <Photo
                photo={photos.portrait}
                ratio="4 / 5"
                sizes="(min-width: 75rem) 24vw, (min-width: 60rem) 28vw, 22rem"
              />
            </Reveal>
            <Reveal delay={140} className={styles.signature}>
              <span className={styles.signatureName}>{site.name}</span>
              <span className={styles.signatureRole}>Contador Público</span>
            </Reveal>
          </div>

          <div className={styles.body}>
            <Reveal>
              <Eyebrow>Sobre mí</Eyebrow>
            </Reveal>

            <LineReveal
              as="h2"
              className={styles.title}
              delay={80}
              lines={['Empecé entendiendo los números.', 'Terminé construyendo soluciones', 'alrededor de ellos.']}
            />

            <Reveal delay={180} className={styles.copy}>
              <p>
                Mi carrera empezó entre conciliaciones, estados financieros, impuestos y
                procesos contables. Muy temprano descubrí algo que cambió el resto de mi
                trayectoria.
              </p>

              <blockquote className={styles.turn}>
                Muchos problemas financieros no eran realmente problemas contables. Eran
                problemas de procesos y de información.
              </blockquote>

              <p>
                Eso me llevó primero hacia la automatización. Después hacia los datos. Y
                posteriormente hacia la construcción de productos digitales.
              </p>

              <p>
                Hoy combino esas experiencias para entender un problema desde diferentes
                perspectivas:
              </p>

              <ul className={styles.convergence}>
                {CONVERGENCE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
