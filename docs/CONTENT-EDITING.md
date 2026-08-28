# Editing content

You do **not** need to touch page components to change the important things.
Everything below lives in a handful of plainly-named files.

## The files that matter

| What you want to change                            | File                                       |
| -------------------------------------------------- | ------------------------------------------ |
| Phone, WhatsApp, email, service area, social links | `src/config/site.ts`                       |
| Analytics IDs (GA4 / GTM)                          | `.env` (see `.env.example`) or hosting env |
| Legal / "who is the provider" wording ⚖️           | `src/config/site.ts` → `providerModel`     |
| The three service clusters + their bullet points   | `src/config/services.ts`                   |
| All English text                                   | `src/i18n/en.ts`                           |
| All Italian text                                   | `src/i18n/it.ts`                           |
| Page URLs (slugs) per language                     | `src/config/routes.ts`                     |

After any change: run `npm run build` (or `npm run dev` to preview locally). If
you edit a URL slug in `routes.ts`, also rename the matching file in
`src/pages/en/` or `src/pages/it/` so the file name matches the new slug.

## Contact details

Open `src/config/site.ts` and edit the `contact` block:

```ts
export const contact = {
  phoneDisplay: '+39 375 837 4492', // shown as text
  phoneE164: '+393758374492', // used by "Call" links
  whatsappNumber: '393758374492', // wa.me format, no "+"
  email: 'florencecare24h@gmail.com',
};
```

Change them in this one place and every button, link and footer updates.

## Legal / provider wording (needs a lawyer)

Every sentence about _who provides care_ and _who is responsible_ is collected
in `providerModel` inside `src/config/site.ts`. When the Italian healthcare
lawyer reviews the wording, that block is the only place to edit. The optional
`legalLimitation` line is empty by default; fill it in (both `en` and `it`) only
if legal advice says a limitation statement is needed — it then appears on the
legal pages, not in the marketing flow.

## Text on pages

- English copy: `src/i18n/en.ts`
- Italian copy: `src/i18n/it.ts`

The two files have the **same shape**. If you add a field to one, add it to the
other or the build will tell you what's missing. Never machine-translate at
runtime — keep reviewed translations in these files.

## Services

`src/config/services.ts` holds the three clusters (Nursing, Physiotherapy,
Tourists), their bullet points in both languages, and the SEO title/description
for the nursing and physiotherapy pages. The homepage shows the first four
bullets of each; the service page shows all of them.

**Do not weaken these safety-critical phrasings** when editing:

- IV therapy: "…doctor consultation and prescription available when required."
- Insurance: "Documentation and invoice support for insurance reimbursement
  requests." (never "we guarantee reimbursement" / "we bill your insurer").

## Images / brand assets

The current logo and hero are lightweight SVG (no external photos, fast on hotel
wifi). Placeholders you may replace later:

| File                                          | Replace with                                          |
| --------------------------------------------- | ----------------------------------------------------- |
| `public/favicon.svg`                          | your final favicon (SVG is fine)                      |
| `public/assets/brand/og-default.svg`          | a 1200×630 **PNG/JPG** for best social-share previews |
| Hero background (`src/components/Hero.astro`) | an optimised WebP photo if desired                    |

If you add a photo, always set width/height, provide alt text, and export WebP.
