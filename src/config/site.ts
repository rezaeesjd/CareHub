/**
 * ============================================================================
 * FLORENCE CARE 24 — CENTRAL SITE CONFIGURATION
 * ============================================================================
 *
 * This is the ONE file to edit for business-critical settings. A non-developer
 * can safely change the phone number, WhatsApp number, email, service area,
 * social links and analytics IDs here without touching any page or component.
 *
 * Nothing below should be duplicated in components — always import from here.
 * See docs/CONTENT-EDITING.md for a plain-language guide.
 */

// ---------------------------------------------------------------------------
// Production domain
// ---------------------------------------------------------------------------
// MUST be set via the PUBLIC_SITE_URL environment variable before deploying to
// production (used for canonical URLs, hreflang, sitemap, structured data and
// Open Graph). The fallback is a placeholder only for local development.
export const SITE_URL: string = (
  import.meta.env.PUBLIC_SITE_URL || 'https://florencecare24.com'
).replace(/\/$/, '');

// ---------------------------------------------------------------------------
// Contact details — the most important values on the whole site
// ---------------------------------------------------------------------------
export const contact = {
  /** Human-readable phone number, shown as text. */
  phoneDisplay: '+39 375 837 4492',
  /** E.164 phone for tel: links (no spaces, leading +). */
  phoneE164: '+393758374492',
  /** WhatsApp number in international format WITHOUT the leading + (wa.me format). */
  whatsappNumber: '393758374492',
  /** Contact email. */
  email: 'florencecare24h@gmail.com',
} as const;

/** Pre-built tel: href. */
export const telHref = `tel:${contact.phoneE164}`;
/** Pre-built mailto: href. */
export const mailtoHref = `mailto:${contact.email}`;

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const brand = {
  name: 'Florence Care 24',
  tagline: {
    en: 'Healthcare Assistance & Coordination',
    it: 'Assistenza e Coordinamento Sanitario',
  },
  // Colours mirror the printed brand identity (flyer). Kept here for reference;
  // the source of truth for CSS is the custom properties in src/styles/global.css.
  colors: {
    navy: '#1B3A6B',
    red: '#D62828',
    whatsappGreen: '#25D366',
    white: '#FFFFFF',
  },
} as const;

// ---------------------------------------------------------------------------
// Service area (configurable — do not over-promise a precise radius publicly)
// ---------------------------------------------------------------------------
export const serviceArea = {
  primaryCity: 'Florence',
  region: 'Tuscany',
  country: 'Italy',
  countryCode: 'IT',
  // Kept intentionally soft. Business leadership can confirm a precise radius later.
  description: {
    en: 'Florence and the surrounding area',
    it: 'Firenze e zone limitrofe',
  },
} as const;

// ---------------------------------------------------------------------------
// Social / external profiles — leave empty ('') to hide.
// ---------------------------------------------------------------------------
export const social = {
  instagram: '',
  facebook: '',
  googleBusinessProfile: '', // review / profile URL, when available
} as const;

// ---------------------------------------------------------------------------
// Analytics — nothing loads unless an ID is configured (privacy by default).
// Health information must NEVER be sent to analytics. See src/lib/analytics.ts.
// ---------------------------------------------------------------------------
export const analytics = {
  ga4Id: import.meta.env.PUBLIC_GA_ID || '',
  gtmId: import.meta.env.PUBLIC_GTM_ID || '',
} as const;

// ---------------------------------------------------------------------------
// LEGAL / PROVIDER MODEL WORDING  ⚖️  REQUIRES ITALIAN HEALTHCARE-LAW REVIEW
// ---------------------------------------------------------------------------
// Every sentence that touches the "who is the provider / who is responsible"
// question lives HERE so the lawyer can review and change it in one place.
// The site never describes Florence Care 24 as the direct clinical provider.
// Preferred verbs: "we connect", "we coordinate", "we help organise".
export const providerModel = {
  /** One-line description of what the company does (coordination, not treatment). */
  positioning: {
    en: 'We help connect you with qualified, independent healthcare professionals for assistance at home, in hotels and in accommodation in Florence.',
    it: 'Ti aiutiamo a metterti in contatto con professionisti sanitari qualificati e indipendenti per assistenza a domicilio, in hotel e nelle strutture ricettive a Firenze.',
  },
  /** How professionals are described. "qualified/licensed", never "verified". */
  professionalsDescriptor: {
    en: 'qualified, licensed independent healthcare professionals',
    it: 'professionisti sanitari qualificati e indipendenti',
  },
  /** Short professional-services note used on the legal page and footers. */
  professionalServicesNote: {
    en: 'Florence Care 24 provides assistance and coordination. Healthcare services are delivered by independent, licensed professionals acting under their own professional responsibility and VAT registration (Partita IVA).',
    it: 'Florence Care 24 fornisce assistenza e coordinamento. Le prestazioni sanitarie sono erogate da professionisti indipendenti e abilitati, che operano sotto la propria responsabilità professionale e con la propria Partita IVA.',
  },
  /** Optional legal limitation line. Kept OUT of marketing by default. Enable
   *  only after legal review; when non-empty it renders on legal/FAQ pages. */
  legalLimitation: {
    en: '',
    it: '',
  },
} as const;

// ---------------------------------------------------------------------------
// Referral / attribution settings (see src/lib/attribution.ts)
// ---------------------------------------------------------------------------
export const attribution = {
  /** How long a first-touch referral is remembered, in days. */
  retentionDays: 90,
  /** localStorage key prefix. */
  storageKey: 'fc24_attribution',
} as const;

export type Lang = 'en' | 'it';
export const LANGS: Lang[] = ['en', 'it'];
export const DEFAULT_LANG: Lang = 'en';
