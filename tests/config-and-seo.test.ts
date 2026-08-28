import { describe, it, expect } from 'vitest';
import { contact, SITE_URL, providerModel } from '../src/config/site';
import { path, alternates } from '../src/config/routes';
import { absoluteUrl, organizationSchema, faqSchema } from '../src/lib/seo';
import { buildEventParams } from '../src/lib/analytics';

describe('contact config', () => {
  it('has consistent phone/whatsapp numbers', () => {
    expect(contact.phoneE164).toBe('+393758374492');
    expect(contact.whatsappNumber).toBe('393758374492');
    expect(contact.email).toBe('florencecare24h@gmail.com');
  });
});

describe('provider-model wording (legal review block)', () => {
  it('uses coordination language, never "verified"', () => {
    const en = providerModel.professionalsDescriptor.en.toLowerCase();
    expect(en).not.toContain('verified');
    expect(en).toMatch(/qualified|licensed/);
  });
});

describe('routes', () => {
  it('builds localized paths with trailing slashes', () => {
    expect(path('home', 'en')).toBe('/en/');
    expect(path('about', 'it')).toBe('/it/chi-siamo/');
    expect(path('tourist', 'en')).toBe('/en/medical-help-tourists-florence/');
    expect(path('tourist', 'it')).toBe('/it/assistenza-sanitaria-turisti-firenze/');
  });

  it('produces both language alternates for a route', () => {
    const alts = alternates('faq');
    expect(alts).toHaveLength(2);
    expect(alts.map((a) => a.lang).sort()).toEqual(['en', 'it']);
    expect(alts.find((a) => a.lang === 'it')?.path).toBe('/it/faq/');
  });
});

describe('seo helpers', () => {
  it('builds absolute URLs from the site URL', () => {
    expect(absoluteUrl('/en/')).toBe(`${SITE_URL}/en/`);
    expect(absoluteUrl('en/faq/')).toBe(`${SITE_URL}/en/faq/`);
  });

  it('organization schema is a neutral Organization (not a clinic/physician)', () => {
    const org = organizationSchema() as Record<string, unknown>;
    expect(org['@type']).toBe('Organization');
    expect(org.telephone).toBe('+393758374492');
  });

  it('faq schema maps questions to Question/Answer nodes', () => {
    const schema = faqSchema([{ q: 'Q1?', a: 'A1.' }]) as { mainEntity: unknown[] };
    expect(schema.mainEntity).toHaveLength(1);
  });
});

describe('analytics params never carry health/PII', () => {
  it('only includes marketing context', () => {
    const params = buildEventParams(
      { page: '/en/', language: 'en' },
      { ref: 'H001', utm_campaign: 'tourist', utm_source: 'google', ts: Date.now() }
    );
    expect(params).toEqual({
      page: '/en/',
      language: 'en',
      referral_code: 'H001',
      utm_campaign: 'tourist',
      utm_source: 'google',
    });
    // no name/phone/symptom keys possible — function signature forbids them
    expect(Object.keys(params)).not.toContain('phone');
  });
});
