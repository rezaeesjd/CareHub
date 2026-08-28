import { describe, it, expect } from 'vitest';
import {
  sanitizeParam,
  parseAttribution,
  mergeFirstTouch,
  isFresh,
  type Attribution,
} from '../src/lib/attribution';

describe('sanitizeParam', () => {
  it('keeps safe characters and drops the rest', () => {
    expect(sanitizeParam('H001')).toBe('H001');
    expect(sanitizeParam('hotel-example_1.2')).toBe('hotel-example_1.2');
  });

  it('strips unsafe characters (no injection into WhatsApp text)', () => {
    expect(sanitizeParam('H001<script>')).toBe('H001script');
    expect(sanitizeParam('a b c')).toBe('abc');
    expect(sanitizeParam('drop; rm -rf /')).toBe('droprm-rf');
  });

  it('returns undefined for empty / null', () => {
    expect(sanitizeParam('')).toBeUndefined();
    expect(sanitizeParam(null)).toBeUndefined();
    expect(sanitizeParam('###')).toBeUndefined();
  });

  it('caps length', () => {
    expect(sanitizeParam('a'.repeat(100), 32)).toHaveLength(32);
  });
});

describe('parseAttribution', () => {
  it('extracts ref and utm params with the landing path', () => {
    const attr = parseAttribution('?ref=H001&utm_source=hotel&utm_medium=referral', '/en/');
    expect(attr.ref).toBe('H001');
    expect(attr.utm_source).toBe('hotel');
    expect(attr.utm_medium).toBe('referral');
    expect(attr.landing).toBe('/en/');
    expect(typeof attr.ts).toBe('number');
  });

  it('returns an empty object (no landing/ts) when there is no signal', () => {
    const attr = parseAttribution('?foo=bar', '/en/');
    expect(attr.ref).toBeUndefined();
    expect(attr.landing).toBeUndefined();
    expect(attr.ts).toBeUndefined();
  });

  it('captures gclid', () => {
    const attr = parseAttribution('?gclid=abc123.-_', '/it/');
    expect(attr.gclid).toBe('abc123.-_');
  });
});

describe('mergeFirstTouch', () => {
  it('keeps the original source when one already exists', () => {
    const existing: Attribution = { ref: 'H001', ts: Date.now() };
    const incoming: Attribution = { ref: 'B002', ts: Date.now() };
    expect(mergeFirstTouch(existing, incoming).ref).toBe('H001');
  });

  it('uses the incoming source when there is no prior signal', () => {
    expect(mergeFirstTouch(null, { ref: 'B002' }).ref).toBe('B002');
    expect(mergeFirstTouch({}, { utm_source: 'google' }).utm_source).toBe('google');
  });
});

describe('isFresh', () => {
  const now = 1_000_000_000_000;
  it('is true within the retention window', () => {
    expect(isFresh({ ts: now - 1000 }, now)).toBe(true);
  });
  it('is false when older than retention (90 days)', () => {
    const ninetyOneDays = 91 * 24 * 60 * 60 * 1000;
    expect(isFresh({ ts: now - ninetyOneDays }, now)).toBe(false);
  });
  it('is false without a timestamp', () => {
    expect(isFresh({ ref: 'H001' }, now)).toBe(false);
    expect(isFresh(null, now)).toBe(false);
  });
});
