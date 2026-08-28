/**
 * WhatsApp + tel link builders. Every WhatsApp CTA on the site goes through
 * here so the number is never duplicated and the prefilled message is always
 * correct for the page language. Referral codes are appended at click time by
 * the ContactBar upgrade script (see attribution.ts) — but a server-rendered
 * default is provided so links work even before JavaScript runs.
 */
import { contact } from '../config/site';
import type { Lang } from '../config/site';

/** Default prefilled messages per language. Kept short and neutral (no health data). */
const PREFILL: Record<Lang, string> = {
  en: 'Hello, I need healthcare assistance in Florence.',
  it: 'Buongiorno, ho bisogno di assistenza sanitaria a Firenze.',
};

/**
 * Build a wa.me URL for a language, optionally with a referral code appended
 * to the message body (e.g. "Referral: H001").
 */
export function whatsappUrl(lang: Lang, referralCode?: string): string {
  let message = PREFILL[lang];
  if (referralCode) {
    message += `\nReferral: ${referralCode}`;
  }
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** The default prefill text for a language (no referral). */
export function whatsappMessage(lang: Lang): string {
  return PREFILL[lang];
}

/** tel: href — same for every page. */
export function telUrl(): string {
  return `tel:${contact.phoneE164}`;
}
