/**
 * Central route table. Maps a stable route key to its localised URL slug in
 * each language. This is the single source of truth used by:
 *   - the language switcher (to jump to the equivalent page)
 *   - hreflang alternate links
 *   - internal navigation links
 * Service-page slugs are pulled from services.ts so they are never duplicated.
 */
import { clusters } from './services';
import type { Lang } from './site';
import { LANGS } from './site';

export type RouteKey =
  | 'home'
  | 'nursing'
  | 'physio'
  | 'tourist'
  | 'about'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms';

const clusterSlug = (id: string): Record<Lang, string> => clusters.find((c) => c.id === id)!.slug;

export const routeSlugs: Record<RouteKey, Record<Lang, string>> = {
  home: { en: '', it: '' },
  nursing: clusterSlug('nursing'),
  physio: clusterSlug('physio'),
  tourist: clusterSlug('tourist'),
  about: { en: 'about', it: 'chi-siamo' },
  faq: { en: 'faq', it: 'faq' },
  contact: { en: 'contact', it: 'contatti' },
  privacy: { en: 'privacy', it: 'privacy' },
  cookies: { en: 'cookies', it: 'cookie' },
  terms: { en: 'terms', it: 'termini' },
};

/** Full path for a route in a language, e.g. path('about','it') => '/it/chi-siamo/'. */
export function path(key: RouteKey, lang: Lang): string {
  const slug = routeSlugs[key][lang];
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}

/** All language alternates for a route, for hreflang / language switching. */
export function alternates(key: RouteKey): { lang: Lang; path: string }[] {
  return LANGS.map((lang) => ({ lang, path: path(key, lang) }));
}
