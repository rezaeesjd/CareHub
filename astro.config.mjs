// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The production domain. MUST be set via PUBLIC_SITE_URL in the deploy
// environment before going live. See docs/DEPLOYMENT.md and .env.example.
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://florencecare24.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Built-in i18n. English is the default (tourists are the primary market)
  // but is served under an explicit /en/ prefix for clean, symmetrical URLs.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          it: 'it',
        },
      },
      // Keep noindex pages out of the sitemap: the root redirect and the
      // draft legal pages (privacy / cookies / terms in both languages).
      filter: (page) => {
        const url = new URL(page);
        if (url.pathname === '/') return false;
        return !/\/(privacy|cookies|cookie|terms|termini)\/?$/.test(url.pathname);
      },
    }),
  ],
});
