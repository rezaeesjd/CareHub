// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// The production domain. MUST be set via PUBLIC_SITE_URL before going live.
// Use Vite's loadEnv so a value in .env is honoured here too (this config runs
// before Vite injects import.meta.env, so a bare process.env read would miss a
// .env-only value and desync the sitemap from canonical/robots). loadEnv also
// includes matching process.env vars, so CI/deploy env vars still work.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');
const SITE_URL = PUBLIC_SITE_URL || 'https://florencecare24.com';

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
