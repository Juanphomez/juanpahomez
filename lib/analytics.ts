/**
 * Analytics contract.
 *
 * The site does not ship a tracker by itself. It pushes typed events to
 * `window.dataLayer`, which is what Google Tag Manager reads, and calls
 * `gtag` directly when GA4 is installed without GTM. Set
 * NEXT_PUBLIC_GTM_ID (or NEXT_PUBLIC_GA_ID) to activate either one.
 *
 * Event names are defined here and nowhere else, so the GA4 / GTM
 * configuration and the code can never drift apart.
 */

export const AnalyticsEvent = {
  heroCta: 'cta_hero',
  heroScroll: 'cta_hero_scroll',
  serviceCta: 'cta_servicio',
  serviceSelect: 'servicio_seleccionado',
  caseCta: 'cta_caso',
  talksCta: 'cta_conferencias',
  articleOpen: 'articulo_abierto',
  contactStart: 'contacto_iniciado',
  contactSubmit: 'contacto_enviado',
  contactError: 'contacto_error',
  linkedinClick: 'click_linkedin',
  emailClick: 'click_email',
  navClick: 'nav_click',
} as const;

export type AnalyticsEventName = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/** Context attached to an event. Flat and primitive — GA4 rejects nesting. */
export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (command: 'event', name: string, params?: AnalyticsPayload) => void;
};

/**
 * Records an interaction. Safe to call anywhere: it is a no-op on the server
 * and when no tag manager is installed.
 */
export function track(name: AnalyticsEventName, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  const w = window as DataLayerWindow;
  const params = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  ) as AnalyticsPayload;

  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: name, ...params });

  w.gtag?.('event', name, params);
}
