/**
 * Referral + UTM attribution — the lightweight version.
 *
 * On first visit we read ?ref= and any utm_* / gclid params, sanitise them,
 * and store them in localStorage as FIRST TOUCH (a later visit never overwrites
 * the original source). The referral code is appended to WhatsApp prefills and
 * sent as a GA4 event parameter on WhatsApp/phone clicks.
 *
 * NEVER store health information here. Only marketing attribution.
 *
 * The parse/sanitise/merge functions are pure (no DOM) so they are unit-tested.
 */
import { attribution as cfg } from '../config/site';

export interface Attribution {
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  gclid?: string;
  landing?: string;
  ts?: number;
}

const ATTR_KEYS = [
  'ref',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'gclid',
] as const;

/**
 * Sanitise a raw parameter value: allow only safe characters and cap length.
 * Returns undefined for empty / invalid values. This prevents junk or injection
 * attempts from being persisted or echoed into a WhatsApp message.
 */
export function sanitizeParam(value: string | null | undefined, maxLen = 64): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[^A-Za-z0-9_.\-]/g, '').slice(0, maxLen);
  return cleaned.length ? cleaned : undefined;
}

/**
 * Parse attribution from a URL query string (pure — pass a search string like
 * "?ref=H001&utm_source=hotel"). landing is the path the visitor first landed on.
 */
export function parseAttribution(search: string, landing = ''): Attribution {
  const params = new URLSearchParams(search);
  const out: Attribution = {};
  for (const key of ATTR_KEYS) {
    const maxLen = key === 'gclid' ? 128 : key === 'ref' ? 32 : 64;
    const value = sanitizeParam(params.get(key), maxLen);
    if (value) out[key] = value;
  }
  if (Object.keys(out).length > 0) {
    out.landing = landing.slice(0, 128);
    out.ts = Date.now();
  }
  return out;
}

/** First-touch merge: keep the existing record if it already has any signal. */
export function mergeFirstTouch(existing: Attribution | null, incoming: Attribution): Attribution {
  const existingHasSignal = existing && ATTR_KEYS.some((k) => existing[k] !== undefined);
  if (existingHasSignal) return existing as Attribution;
  return incoming;
}

/** True when the stored record is still within the retention window. */
export function isFresh(attr: Attribution | null, now = Date.now()): boolean {
  if (!attr || !attr.ts) return false;
  const ageMs = now - attr.ts;
  return ageMs >= 0 && ageMs <= cfg.retentionDays * 24 * 60 * 60 * 1000;
}

// ---------------------------------------------------------------------------
// Browser-only helpers (guarded — safe to import anywhere).
// ---------------------------------------------------------------------------

function safeGet(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(cfg.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    return isFresh(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function safeSet(attr: Attribution): void {
  try {
    window.localStorage.setItem(cfg.storageKey, JSON.stringify(attr));
  } catch {
    /* private mode / storage disabled — degrade silently */
  }
}

/**
 * Read current URL attribution, merge as first-touch with any stored record,
 * persist, and return the effective attribution. Call once on page load.
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  const stored = safeGet();
  const incoming = parseAttribution(window.location.search, window.location.pathname);
  const hasIncoming = ATTR_KEYS.some((k) => incoming[k] !== undefined);

  if (!hasIncoming) return stored;

  const merged = mergeFirstTouch(stored, incoming);
  if (merged === incoming) safeSet(merged);
  return merged;
}

/** The stored referral code, if any. */
export function getReferralCode(): string | undefined {
  const attr = safeGet();
  return attr?.ref;
}

/** The stored attribution record (for analytics context). */
export function getStoredAttribution(): Attribution | null {
  return typeof window === 'undefined' ? null : safeGet();
}
