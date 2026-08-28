/**
 * Privacy-conscious GA4 event helpers.
 *
 * Only marketing context is ever sent (page, language, referral code, campaign).
 * NEVER send symptoms, diagnoses, names or phone numbers. There is no place in
 * this file to pass such data, by design.
 *
 * Events fire only if analytics is configured (a gtag function exists on the
 * page). When no GA4/GTM ID is set, these are silent no-ops.
 */
import type { Attribution } from './attribution';

export type ConversionEvent =
  | 'click_whatsapp'
  | 'click_phone'
  | 'click_email'
  | 'language_change'
  | 'partner_referral_visit'
  | 'cta_services'
  | 'cta_tourist_help'
  | 'callback_form_start'
  | 'callback_form_submit';

interface Gtag {
  (command: 'event', eventName: string, params?: Record<string, unknown>): void;
  (command: string, ...args: unknown[]): void;
}

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/** Build a safe, non-PII params object from marketing attribution only. */
export function buildEventParams(
  base: { page?: string; language?: string },
  attr?: Attribution | null
): Record<string, unknown> {
  const params: Record<string, unknown> = {};
  if (base.page) params.page = base.page;
  if (base.language) params.language = base.language;
  if (attr?.ref) params.referral_code = attr.ref;
  if (attr?.utm_campaign) params.utm_campaign = attr.utm_campaign;
  if (attr?.utm_source) params.utm_source = attr.utm_source;
  return params;
}

/** Fire a conversion event if analytics is present. Silent no-op otherwise. */
export function trackEvent(
  event: ConversionEvent,
  base: { page?: string; language?: string } = {},
  attr?: Attribution | null
): void {
  if (typeof window === 'undefined') return;
  const params = buildEventParams(base, attr);
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...params });
    }
  } catch {
    /* never let analytics break the page */
  }
}
