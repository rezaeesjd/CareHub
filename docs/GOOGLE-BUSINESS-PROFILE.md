# Google Business Profile

Google Business Profile (GBP) will be a major source of calls. Florence Care 24
has **no public clinic**, so set it up as a **service-area business** — do not
publish a fake storefront address.

## Setup

1. Create the profile at business.google.com.
2. **Business name:** `Florence Care 24` (use it identically everywhere — name,
   flyer, website, social — so Google trusts the match).
3. **Category:** choose a coordination/assistance-oriented category rather than
   "Hospital" or "Doctor". (Revisit categories after the legal review.)
4. **Address:** choose _"I deliver goods and services to my customers"_ and hide
   the address. Set the **service area** to Florence (and nearby towns you
   actually cover).
5. **Phone:** `+39 375 837 4492` (same number as the site).
6. **Website:** use a UTM-tagged link so GBP traffic is measurable:
   `https://SITE_URL/en/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile`
7. **Hours:** reflect when you actually respond. Avoid implying guaranteed 24/7
   arrival (see the copy note in the README).
8. **Services:** list nursing, physiotherapy and tourist assistance, mirroring
   the site's wording (coordination language, not clinical guarantees).
9. **Photos:** brand, Florence context, professional-but-approachable. No stock
   hospital imagery, no fake premises.

## Reviews

Reviews matter more than anything else here.

- After a positive experience, send the client your GBP review short-link.
- Put that link in `src/config/site.ts` → `social.googleBusinessProfile` so it
  appears in the site's structured data `sameAs`.

## Measuring GBP traffic

Because the website link is UTM-tagged, GA4 will separate GBP visits
(`utm_source=google`, `utm_campaign=google_business_profile`) from generic
organic. Compare WhatsApp/phone conversion between GBP and other channels.

## Consistency (NAP)

Keep **N**ame, **A**ddress-area and **P**hone identical across the website, GBP,
flyers and any directory listing. Inconsistency hurts local ranking. The site
supports having **no** public address — GBP should match that choice.
