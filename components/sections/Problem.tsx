import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { ProcessFlow } from './ProcessFlow';
import styles from './Problem.module.css';

const INVENTORY = ['Información', 'Excel', 'Sistemas', 'Reportes', 'Herramientas de IA'];

export function Problem() {
  return (
    <Section space="loose" label="El problema">
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <Reveal>
              <Eyebrow>Probablemente no necesitas más herramientas</Eyebrow>
            </Reveal>
            <LineReveal
              as="h2"
              className={styles.heading}
              delay={80}
              lines={['Necesitas entender', 'mejor el problema.']}
            />
          </div>

          <Reveal delay={160} className={styles.copy}>
            <p>Muchas empresas ya tienen todo lo necesario para decidir mejor:</p>
            <ul className={styles.inventory}>
              {INVENTORY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Y aun así siguen dependiendo de tareas manuales, información dispersa y
              procesos difíciles de escalar.
            </p>
            <p className={styles.emphasis}>
              Mi trabajo empieza antes de elegir la tecnología: entender qué está pasando y
              qué realmente vale la pena cambiar.
            </p>
          </Reveal>

          <div className={styles.visualWrap}>
            <ProcessFlow />
          </div>
        </div>
      </Container>
    </Section>
  );
}
