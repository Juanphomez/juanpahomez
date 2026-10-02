'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { navigation, site } from '@/content/site';
import { useScrolled } from '@/hooks/useScrolled';
import { useActiveId } from '@/hooks/useActiveId';
import { track, AnalyticsEvent } from '@/lib/analytics';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import styles from './Header.module.css';

const SECTION_IDS = navigation
  .map((item) => item.section)
  .filter((id): id is string => Boolean(id));

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const activeId = useActiveId(SECTION_IDS);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes the panel and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  // Close when the viewport grows into the desktop layout.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 60rem)');
    const onChange = () => {
      if (mql.matches) close();
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [close]);

  return (
    <header className={styles.header} data-scrolled={scrolled ? 'true' : 'false'}>
      <Container>
        <div className={styles.inner}>
          <Link href="#inicio" className={styles.brand} onClick={close}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandRole}>{site.descriptor}</span>
          </Link>

          <nav className={styles.nav} aria-label="Navegación principal">
            <ul className={styles.navList}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.navLink}
                    aria-current={item.section === activeId ? 'true' : undefined}
                    onClick={() => track(AnalyticsEvent.navClick, { destino: item.label })}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button
              href="#contacto"
              size="sm"
              className={styles.desktopCta}
              event={AnalyticsEvent.navClick}
              eventPayload={{ destino: 'Hablemos', origen: 'header' }}
            >
              Hablemos
            </Button>

            <button
              ref={triggerRef}
              type="button"
              className={styles.trigger}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={styles.bars} aria-hidden="true">
                <span />
                <span />
              </span>
              {open ? 'Cerrar' : 'Menú'}
            </button>
          </div>
        </div>
      </Container>

      {/* Rendered only when open: nothing hidden stays in the tab order. */}
      {open ? (
        <div className={styles.panel} id={panelId}>
          <Container>
            <nav className={styles.panelInner} aria-label="Navegación">
              {navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={styles.panelLink}
                  aria-current={item.section === activeId ? 'true' : undefined}
                  onClick={() => {
                    track(AnalyticsEvent.navClick, { destino: item.label, origen: 'menu' });
                    close();
                  }}
                >
                  <span className={styles.panelIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              ))}
              <Button
                href="#contacto"
                className={styles.panelCta}
                trailing="right"
                block
                onClick={close}
                event={AnalyticsEvent.navClick}
                eventPayload={{ destino: 'Hablemos', origen: 'menu' }}
              >
                Hablemos
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
