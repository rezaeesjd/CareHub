/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
