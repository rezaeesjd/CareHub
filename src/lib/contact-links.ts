/**
 * Client-side initializer shared by every page that shows contact CTAs
 * (the ContactBar on layout pages, and the standalone 404 page).
 *
 * It captures first-touch attribution, upgrades every [data-wa] link so the
 * prefilled WhatsApp message carries the referral code, and fires GA4/GTM
 * conversion events on WhatsApp / phone / email / CTA clicks. Only marketing
 * context is ever sent — never health data.
 *
 * Reads the WhatsApp number + default message from <body data-wa-number
 * data-wa-msg>, which both the layout and the 404 page set.
 */
import { captureAttribution } from './attribution';
import { trackEvent } from './analytics';

export function initContactLinks(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const lang = document.documentElement.lang === 'it' ? 'it' : 'en';
  const page = () => location.pathname;
  const attr = captureAttribution();
  const ref = attr?.ref;

  // Fire a referral-visit event only when a ref actually arrived on this URL.
  if (ref && new URLSearchParams(location.search).get('ref')) {
    trackEvent('partner_referral_visit', { page: page(), language: lang }, attr);
  }

  const number = document.body.dataset.waNumber || '';
  const defaultMsg = document.body.dataset.waMsg || '';

  // Upgrade WhatsApp links: append the referral code to the prefilled message.
  document.querySelectorAll<HTMLAnchorElement>('[data-wa]').forEach((a) => {
    const base = a.dataset.waMsg || defaultMsg;
    let msg = base;
    if (ref) msg += '\nReferral: ' + ref;
    if (number) a.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent(msg);
    a.addEventListener('click', () =>
      trackEvent('click_whatsapp', { page: page(), language: lang }, attr)
    );
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-tel]').forEach((a) => {
    a.addEventListener('click', () =>
      trackEvent('click_phone', { page: page(), language: lang }, attr)
    );
  });
  document.querySelectorAll<HTMLAnchorElement>('[data-email]').forEach((a) => {
    a.addEventListener('click', () =>
      trackEvent('click_email', { page: page(), language: lang }, attr)
    );
  });

  // Lightweight CTA intent events (services / tourist-help buttons opt in).
  document.querySelectorAll<HTMLElement>('[data-cta]').forEach((el) => {
    const name = el.dataset.cta;
    if (name === 'services' || name === 'tourist_help') {
      el.addEventListener('click', () =>
        trackEvent(
          name === 'services' ? 'cta_services' : 'cta_tourist_help',
          { page: page(), language: lang },
          attr
        )
      );
    }
  });
}
