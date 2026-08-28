/**
 * Conservative structured data (JSON-LD) builders.
 *
 * Until legal review confirms Florence Care 24 is itself a healthcare provider,
 * we use ONLY neutral schema types: Organization, WebSite, Service, FAQPage,
 * BreadcrumbList. We never emit Hospital / MedicalClinic / Physician / Pharmacy.
 */
import { SITE_URL, brand, contact, serviceArea, social } from '../config/site';
import type { Lang } from '../config/site';

const sameAs = [social.instagram, social.facebook, social.googleBusinessProfile].filter(Boolean);

/** Organization — the safe, always-included entity. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: `${SITE_URL}/`,
    email: contact.email,
    telephone: contact.phoneE164,
    areaServed: {
      '@type': 'City',
      name: serviceArea.primaryCity,
      containedInPlace: { '@type': 'Country', name: serviceArea.country },
    },
    availableLanguage: ['en', 'it'],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** WebSite — helps search engines understand the site + language. */
export function websiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url: `${SITE_URL}/${lang}/`,
    inLanguage: lang,
  };
}

/** Service — for service pages. provider is Organization (coordination), not a clinic. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    provider: { '@type': 'Organization', name: brand.name, url: `${SITE_URL}/` },
    areaServed: { '@type': 'City', name: serviceArea.primaryCity },
    availableLanguage: ['en', 'it'],
  };
}

/** FAQPage — for FAQ and tourist pages. */
export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** BreadcrumbList — for non-home pages. items are {name, url}. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Absolute URL from a site-relative path. */
export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
