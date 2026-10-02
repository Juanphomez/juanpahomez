import { footerLinks, site } from '@/content/site';
import { Container } from './Container';
import { ArrowUpRight } from '@/components/ui/Icon';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-surface="deep">
      <Container>
        <div className={styles.top}>
          <div className={styles.identity}>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.descriptor}>{site.descriptor}</p>
          </div>

          <div className={styles.columns}>
            <div>
              <h2 className={styles.columnTitle}>Secciones</h2>
              <ul className={styles.list}>
                {footerLinks.site.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.link}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.columnTitle}>Contacto</h2>
              <ul className={styles.list}>
                {footerLinks.contact.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={styles.link}
                      {...('external' in item && item.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {item.label}
                      {'external' in item && item.external ? (
                        <>
                          <ArrowUpRight size={13} />
                          <span className="sr-only">(se abre en una pestaña nueva)</span>
                        </>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.location}>
            <span className={styles.dot} aria-hidden="true" />
            {site.location.city}, {site.location.country}
          </p>
          <p>© {year} {site.name}</p>
        </div>
      </Container>
    </footer>
  );
}
