# Florence Care 24

Production-ready bilingual static website for **Healthcare Assistance & Coordination** in Florence. GitHub `main` is authoritative; production is generated into `dist/` and deployed one way to the host.

## Local development
```bash
npm install
npm run dev
```
Copy `.env.example` to `.env` and set `PUBLIC_SITE_URL` for canonical URLs and sitemap generation. Phone, WhatsApp, email, analytics IDs, service area, social URLs and provider wording are centralized in `src/config/site.ts`.

CI currently installs directly from `package.json`. Do not enable the `setup-node` npm cache until a generated `package-lock.json` is committed, because that cache requires a supported dependency lockfile.

## Production build and testing
```bash
npm run check
npm run lint
npm test
npm run build
npm run verify:dist
```
The deployment host only serves static output and does not need Node.js.

## Deployment
CI validates every pull request and production branch push. A successful CI run on `main` starts the guarded SSH/rsync production workflow. See [deployment](docs/DEPLOYMENT.md) and [hosting](docs/HOSTING.md). Direct host editing is discouraged; take a manual snapshot before reconciling emergency edits into source.

## Content, analytics and referrals
- [Content editing](docs/CONTENT-EDITING.md)
- [SEO](docs/SEO.md)
- [Google Ads and conversion events](docs/GOOGLE-ADS.md)
- [Partner referrals and `?ref=`](docs/PARTNER-REFERRALS.md)
- [Google Business Profile](docs/GOOGLE-BUSINESS-PROFILE.md)

Analytics IDs are optional. When configured, scripts load only after `fc24_analytics_consent=granted`; production must supply a consent UI/platform after legal review. No medical information belongs in analytics, storage, referral URLs or a future CRM.
