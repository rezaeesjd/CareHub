# Florence Care 24

**Healthcare Assistance & Coordination in Florence.** A conversion-first,
bilingual (English / Italian) static website. Its job is simple: help a worried
visitor — often in a hotel room, on a phone, on bad wifi — reach a real person
by **WhatsApp** or **phone** in seconds.

Built with **Astro + TypeScript**. Ships static HTML/CSS/SVG and a few KB of JS.
No Node runtime on the server; no database; no booking calendar.

---

## Quick start

```bash
npm install
npm run dev        # local preview at http://localhost:4321
```

## Production build

```bash
npm run build      # outputs static files to dist/
npm run preview    # serve the built site locally
```

## Testing & checks

```bash
npm run check      # TypeScript / Astro type check
npm run lint       # formatting check (Prettier)
npm test           # unit tests (Vitest)
npm run verify:dist # sanity-check the built dist/
```

---

## What's in the box

- **7 pages × EN/IT:** Home, Nursing, Physiotherapy, Tourists, About, FAQ,
  Contact — plus draft legal pages (privacy / cookies / terms) and a bilingual 404.
- **Sticky Call | WhatsApp bar** on mobile, present from the first pixel.
- **Referral + UTM attribution** (`?ref=H001`, first-touch, 90 days) that tags
  the WhatsApp message automatically — with a local **QR generator**.
- **Privacy-first analytics:** GA4 events (`click_whatsapp`, `click_phone`,
  `click_email`, `language_change`, `partner_referral_visit`, plus CTA events).
  Nothing loads and no cookies are set unless you configure an ID.
- **SEO:** unique metadata, canonical + `hreflang`, conservative structured
  data, sitemap and `robots.txt`.
- **CI + one-way deploy** to any static host over SSH/rsync.

## Deployment

`main` is the source of truth, and **GitHub builds the site for you** — you
never install Node/npm on your computer or the host. Two paths:

- **Copy-and-paste (no tools):** each push to `main` publishes the finished
  files to a **`deploy` branch** and a downloadable **ZIP** (workflow
  `publish-static.yml`). Download it and upload to your web root, or point a
  host's Git Version Control at the `deploy` branch to auto-sync.
- **Automatic SSH deploy (optional):** set hosting secrets and GitHub rsyncs to
  your host on every merge; skips cleanly if the secrets aren't set.

Full steps (and set `PUBLIC_SITE_URL` first): **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)**
and **[docs/HOSTING.md](./docs/HOSTING.md)**.

## Editing content

You almost never need to touch a component. Phone/WhatsApp/email, service copy,
SEO text and the legal wording all live in named config/content files. See
**[docs/CONTENT-EDITING.md](./docs/CONTENT-EDITING.md)**.

## Contact configuration

All contact details are centralized in `src/config/site.ts` (`contact` block) —
change them once and every button, link and footer updates. The current values:

- Phone / WhatsApp: **+39 375 837 4492**
- Email: **florencecare24h@gmail.com**

The **`PUBLIC_SITE_URL`** environment variable sets the production domain used
for canonical URLs, hreflang, the sitemap and structured data — **set it before
going live**. Copy `.env.example` → `.env` for local development.

## Analytics

Set `PUBLIC_GA_ID` (and optionally `PUBLIC_GTM_ID`) as env/secrets to enable
GA4. Leave them blank to ship zero tracking and zero cookies. See
**[docs/GOOGLE-ADS.md](./docs/GOOGLE-ADS.md)** and **[docs/SEO.md](./docs/SEO.md)**.

## Partner referrals

```bash
npm run partner:create -- --code H001 --name "Hotel Example" --type hotel
```

Generates a branded QR and a `?ref=` link. See
**[docs/PARTNER-REFERRALS.md](./docs/PARTNER-REFERRALS.md)** and
**[docs/GOOGLE-BUSINESS-PROFILE.md](./docs/GOOGLE-BUSINESS-PROFILE.md)**.

---

## Copy & positioning guardrails

These are deliberate — please preserve them when editing:

- **Coordination, not treatment.** "We connect / we coordinate", never "we
  treat you". All provider-model wording is centralized in
  `src/config/site.ts → providerModel` for the lawyer to review in one place.
- **"Qualified / licensed"** professionals — not "verified".
- **No 24/7 arrival promise.** The brand name stays "Florence Care 24"; the
  trust point says "one contact point", not guaranteed round-the-clock arrival.
- **IV therapy:** prescription is never automatic — "doctor consultation and
  prescription available when required".
- **Insurance:** "documentation and invoice support for reimbursement requests"
  — never a promise of reimbursement or direct billing.
- **No emergency disclaimer** in the marketing flow (handled operationally).
- No fake reviews, patient counts, statistics, address, or lorem ipsum.

## Not built in v1 (by design)

Booking calendar, patient portal, payment checkout, AI chatbot, live
availability, insurer direct billing, a public partner page, and any host→GitHub
auto-sync. The architecture leaves room for these later without implying they
exist now.

## Tech notes

- System font stack (no web font) keeps the homepage tiny for bad hotel wifi.
- Astro ships zero JS by default; the only client script captures attribution,
  upgrades WhatsApp links and fires analytics.
- Structured data stays neutral (`Organization` / `Service` / `FAQPage`) until
  the legal review of the provider model.
