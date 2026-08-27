# Content editing

- Contact, URL, analytics, social links and service area: `src/config/site.ts` and deployment environment.
- Change legally sensitive provider-model wording only in `providerModel` in that file, after Italian healthcare counsel reviews it.
- Navigation and interface translations: `src/i18n/content.ts`.
- Homepage copy: `src/pages/[lang]/index.astro`.
- Unique landing-page copy and metadata: `src/content/pages.ts`.
- Design tokens and responsive styles: `src/styles/global.css`.

Translations are reviewed source content, never runtime machine translation. Add a language by defining its URL mapping, reviewed copy, static paths, metadata, WhatsApp message and hreflang counterpart. Legal pages are visibly draft placeholders and require professional review before launch. Approved brand photography can replace the intentionally abstract hero in `public/assets/photos/`; specify intrinsic dimensions, responsive formats and meaningful alt text.
