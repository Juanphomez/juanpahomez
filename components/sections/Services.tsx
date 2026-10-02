'use client';

import { useId, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Minus, Plus } from '@/components/ui/Icon';
import { services, type Service } from '@/content/services';
import { AnalyticsEvent, track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import styles from './Services.module.css';

function Detail({ service }: { service: Service }) {
  return (
    <div className={styles.detail}>
      <p className={styles.detailHeadline}>{service.headline}</p>

      <div className={styles.detailBody}>
        {service.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div>
        <p className={styles.examplesTitle}>Qué incluye</p>
        <ul className={styles.examples}>
          {service.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </div>

      <Button
        href="#contacto"
        variant="secondary"
        trailing="right"
        className={styles.detailCta}
        event={AnalyticsEvent.serviceCta}
        eventPayload={{ servicio: service.name, etiqueta: service.cta }}
      >
        {service.cta}
      </Button>
    </div>
  );
}

export function Services() {
  const [activeId, setActiveId] = useState<string>(services[0]!.id);
  const [openId, setOpenId] = useState<string | null>(services[0]!.id);
  const baseId = useId();

  const active = services.find((service) => service.id === activeId) ?? services[0]!;

  const select = (service: Service) => {
    setActiveId(service.id);
    track(AnalyticsEvent.serviceSelect, { servicio: service.name });
  };

  return (
    <Section id="servicios" surface="deep" labelledBy={`${baseId}-title`}>
      <Container size="wide">
        <Reveal className={styles.header}>
          <Eyebrow marked>Servicios</Eyebrow>
          <h2 className={styles.title} id={`${baseId}-title`}>
            Qué podemos construir juntos.
          </h2>
        </Reveal>

        {/* Desktop: sticky index on the left, one detail panel on the right. */}
        <div className={styles.split}>
          <div className={styles.rail}>
            {/* A tablist: arrow keys are not needed because each tab is a
                single button that swaps the panel, and all content stays
                reachable in source order. */}
            <ul className={styles.railList} role="tablist" aria-label="Servicios">
              {services.map((service) => {
                const selected = service.id === activeId;
                return (
                  <li
                    key={service.id}
                    className={styles.railItem}
                    data-active={selected ? 'true' : 'false'}
                    role="presentation"
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`${baseId}-tab-${service.id}`}
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel-${service.id}`}
                      tabIndex={selected ? 0 : -1}
                      className={styles.railButton}
                      onClick={() => select(service)}
                    >
                      <span className={styles.index} aria-hidden="true">
                        {service.index}
                      </span>
                      <span className={styles.railName}>{service.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.detailWrap}>
            <div
              role="tabpanel"
              id={`${baseId}-panel-${active.id}`}
              aria-labelledby={`${baseId}-tab-${active.id}`}
              tabIndex={0}
              key={active.id}
            >
              <Detail service={active} />
            </div>
          </div>
        </div>

        {/* Mobile / tablet: a plain disclosure list. */}
        <div className={styles.accordion}>
          {services.map((service) => {
            const expanded = openId === service.id;
            return (
              <div key={service.id} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={expanded}
                    aria-controls={`${baseId}-acc-${service.id}`}
                    onClick={() => {
                      setOpenId(expanded ? null : service.id);
                      if (!expanded) track(AnalyticsEvent.serviceSelect, { servicio: service.name });
                    }}
                  >
                    <span className={styles.index} aria-hidden="true">
                      {service.index}
                    </span>
                    <span className={styles.triggerName}>{service.name}</span>
                    <span className={styles.triggerIcon} aria-hidden="true">
                      {expanded ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>
                {expanded ? (
                  <div className={cn(styles.panel)} id={`${baseId}-acc-${service.id}`}>
                    <Detail service={service} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
