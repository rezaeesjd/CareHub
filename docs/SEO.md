# SEO

The site is built for organic search and Google Ads landing pages: fast static
HTML, unique metadata per page, clean localized URLs and conservative structured
data.

## What every page has

- Unique `<title>` and meta description (in `src/i18n/*` or page frontmatter)
- Canonical URL (absolute, from `PUBLIC_SITE_URL`)
- `hreflang` alternates for `en`, `it` and `x-default` → English
- Open Graph + Twitter/X tags
- One `<h1>` and a semantic heading order
- Breadcrumbs (visible + `BreadcrumbList` JSON-LD) on inner pages
- `sitemap-index.xml` + `sitemap-0.xml` (auto, with hreflang), `robots.txt`

`robots.txt` and the sitemap use `PUBLIC_SITE_URL`, so **set that before going
live** — there is no hard-coded placeholder domain in production.

## Structured data (conservative on purpose)

Until legal review confirms the provider model, only neutral schema types are
emitted (see `src/lib/seo.ts`):

- `Organization`, `WebSite` — on every page
- `Service` — on the homepage and service pages
- `FAQPage` — on the FAQ and tourist pages
- `BreadcrumbList` — on inner pages

We intentionally do **not** emit `Hospital`, `MedicalClinic`, `Physician` or
`Pharmacy`. Add those only if a lawyer confirms Florence Care 24 is itself a
provider.

## Localized URLs

| Page          | English                               | Italian                                     |
| ------------- | ------------------------------------- | ------------------------------------------- |
| Home          | `/en/`                                | `/it/`                                      |
| Nursing       | `/en/nursing-care-florence/`          | `/it/assistenza-infermieristica-firenze/`   |
| Physiotherapy | `/en/home-physiotherapy-florence/`    | `/it/fisioterapia-domicilio-firenze/`       |
| Tourists      | `/en/medical-help-tourists-florence/` | `/it/assistenza-sanitaria-turisti-firenze/` |
| About         | `/en/about/`                          | `/it/chi-siamo/`                            |
| FAQ           | `/en/faq/`                            | `/it/faq/`                                  |
| Contact       | `/en/contact/`                        | `/it/contatti/`                             |

Legal pages (privacy / cookies / terms) are `noindex` while they remain drafts,
and are excluded from the sitemap.

## Keyword focus (Florence first)

Target these naturally — never keyword-stuff visible copy:

- **Tourist:** medical help Florence, healthcare assistance Florence, English
  speaking medical help Florence, nurse hotel Florence
- **Nursing:** nurse Florence, nurse at home Florence, home nursing Florence
- **Physiotherapy:** home physiotherapy Florence, physiotherapist home Florence

Do not mass-produce location doorway pages. The content architecture (localized
slugs in `src/config/routes.ts`) makes adding a nearby town later
(Scandicci, Sesto Fiorentino, Prato) straightforward — but only build those on
request, with genuinely unique content.

## Analytics & Consent Mode

Analytics is off unless `PUBLIC_GA_ID` / `PUBLIC_GTM_ID` is set. When you enable
it for EU visitors, wire Google Consent Mode: `src/components/Analytics.astro`
has a commented `consent default (denied)` block to activate alongside a consent
UI. See [GOOGLE-ADS.md](./GOOGLE-ADS.md) for conversion setup.
