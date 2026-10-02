import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { LineReveal } from '@/components/ui/LineReveal';
import { ChevronDown } from '@/components/ui/Icon';
import { services, type Service, type ServiceResource } from '@/content/services';
import { AnalyticsEvent } from '@/lib/analytics';
import styles from './Services.module.css';

const KIND_LABEL: Record<ServiceResource['kind'], string> = {
  video: 'Video',
  webinar: 'Webinar',
  caso: 'Caso',
  tablero: 'Tablero',
  articulo: 'Artículo',
};

/**
 * Supporting material for a service. Rendered only when the service actually
 * has some, so the section never shows an empty shelf.
 */
function Resources({ items, serviceName }: { items: readonly ServiceResource[]; serviceName: string }) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className={styles.blockTitle}>Material relacionado</p>
      <ul className={styles.resources}>
        {items.map((item) => {
          const content = (
            <>
              <span className={styles.resourceKind}>{KIND_LABEL[item.kind]}</span>
              <span className={styles.resourceTitle}>{item.title}</span>
              {item.meta ? <span className={styles.resourceMeta}>{item.meta}</span> : null}
            </>
          );

          // No url yet: it is still in preparation, so it is not a link.
          return (
            <li key={item.title}>
              {item.url ? (
                <a
                  className={styles.resource}
                  href={item.url}
                  {...(item.url.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {content}
                </a>
              ) : (
                <div className={styles.resource}>
                  {content}
                  <span className={styles.resourceMeta}>En preparación</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <span className="sr-only">Material de {serviceName}</span>
    </div>
  );
}

function Row({ service, defaultOpen }: { service: Service; defaultOpen: boolean }) {
  return (
    <details className={styles.item} open={defaultOpen}>
      <summary className={styles.summary}>
        <span className={styles.index} aria-hidden="true">
          {service.index}
        </span>
        <span className={styles.headings}>
          <h3 className={styles.name}>{service.name}</h3>
          <span className={styles.tagline}>{service.headline}</span>
        </span>
        <span className={styles.toggle} aria-hidden="true">
          <ChevronDown size={18} />
        </span>
      </summary>

      <div className={styles.panel}>
        <div className={styles.body}>
          {service.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Button
            href="#contacto"
            variant="secondary"
            trailing="right"
            className={styles.cta}
            event={AnalyticsEvent.serviceCta}
            eventPayload={{ servicio: service.name, etiqueta: service.cta }}
          >
            {service.cta}
          </Button>
        </div>

        <div className={styles.aside}>
          <div>
            <p className={styles.blockTitle}>Qué incluye</p>
            <ul className={styles.examples}>
              {service.examples.map((example) => (
                <li key={example}>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          <Resources items={service.resources} serviceName={service.name} />
        </div>
      </div>
    </details>
  );
}

/**
 * Five capabilities as rows that open in place. Built on <details> rather than
 * a tab widget: the browser supplies the keyboard behaviour and the state
 * survives with JavaScript switched off — and several rows can stay open while
 * someone compares them.
 */
export function Services() {
  return (
    <Section id="servicios" surface="deep" label="Servicios">
      <Container size="wide">
        <Reveal className={styles.header}>
          <Eyebrow>Servicios</Eyebrow>
          <LineReveal
            as="h2"
            className={styles.title}
            lines={['Qué podemos', 'construir juntos.']}
          />
          <p className={styles.lead}>
            Cinco capacidades, no veinte servicios sueltos. Abre la que te interese para
            ver cómo trabajo cada una.
          </p>
        </Reveal>

        <div className={styles.list}>
          {services.map((service, index) => (
            <Row key={service.id} service={service} defaultOpen={index === 0} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
