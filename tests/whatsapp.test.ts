import { describe, it, expect } from 'vitest';
import { whatsappUrl, whatsappMessage, telUrl } from '../src/lib/whatsapp';
import { contact } from '../src/config/site';

describe('whatsappUrl', () => {
  it('uses the configured number', () => {
    expect(whatsappUrl('en')).toContain(`wa.me/${contact.whatsappNumber}`);
  });

  it('uses the English prefill for en', () => {
    const url = whatsappUrl('en');
    const text = decodeURIComponent(url.split('text=')[1]);
    expect(text).toBe('Hello, I need healthcare assistance in Florence.');
  });

  it('uses the Italian prefill for it', () => {
    const url = whatsappUrl('it');
    const text = decodeURIComponent(url.split('text=')[1]);
    expect(text).toBe('Buongiorno, ho bisogno di assistenza sanitaria a Firenze.');
  });

  it('appends a referral code on its own line', () => {
    const url = whatsappUrl('en', 'H001');
    const text = decodeURIComponent(url.split('text=')[1]);
    expect(text).toContain('Referral: H001');
    expect(text.split('\n')).toHaveLength(2);
  });

  it('URL-encodes the message', () => {
    const url = whatsappUrl('en');
    expect(url).toContain('%20'); // spaces encoded
    expect(url).not.toContain(' ');
  });
});

describe('whatsappMessage', () => {
  it('returns the plain prefill per language', () => {
    expect(whatsappMessage('en')).toMatch(/^Hello/);
    expect(whatsappMessage('it')).toMatch(/^Buongiorno/);
  });
});

describe('telUrl', () => {
  it('builds a tel: link from the E.164 number', () => {
    expect(telUrl()).toBe(`tel:${contact.phoneE164}`);
    expect(telUrl()).toBe('tel:+393758374492');
  });
});
