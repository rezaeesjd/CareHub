# Google Ads (readiness)

The site is Google-Ads-ready, but **you don't need to run ads to launch.** Start
with organic + Google Business Profile; turn on ads when you're ready to spend
and can measure return. This doc is a reference for that day.

## The conversions that matter

There is no booking checkout. The two real conversions are:

- **`click_whatsapp`** — someone opened WhatsApp to message you
- **`click_phone`** — someone tapped to call

Both already fire (see `src/lib/analytics.ts`) with safe params only: `page`,
`language`, `referral_code`, `utm_campaign`, `utm_source`. No health data.

## Wiring it up

1. Set `PUBLIC_GA_ID` (GA4) — and optionally `PUBLIC_GTM_ID` — as secrets/env.
2. In **GA4 → Admin → Events**, mark `click_whatsapp` and `click_phone` as
   **key events (conversions)**.
3. In **Google Ads**, link the GA4 property and **import** those key events as
   conversions. (Or define them directly in GTM if you use GTM.)
4. For EU visitors, enable **Consent Mode**: activate the commented
   `consent default (denied)` block in `src/components/Analytics.astro` and add a
   consent banner before ad/analytics storage is allowed.

## UTM convention

Tag every ad landing URL so attribution persists (the site stores UTMs
first-touch for 90 days):

```
https://SITE_URL/en/medical-help-tourists-florence/?utm_source=google&utm_medium=cpc&utm_campaign=tourist_assistance&utm_content=hotel_visit
```

Keep names lowercase and consistent (`utm_campaign=tourist_assistance`, etc.).

## Suggested campaigns → landing pages

| Campaign cluster         | Example keywords                                             | Landing page                          |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------- |
| Tourist / immediate help | medical help Florence, healthcare assistance hotel Florence  | `/en/medical-help-tourists-florence/` |
| Nursing                  | nurse Florence, nurse at home Florence, nurse hotel Florence | `/en/nursing-care-florence/`          |
| Physiotherapy            | home physiotherapy Florence, physiotherapist home Florence   | `/en/home-physiotherapy-florence/`    |

Run English and Italian ad groups to the matching `/en/` and `/it/` pages. Never
force these keywords unnaturally into the visible copy.

## Privacy

- Only marketing context reaches analytics — never symptoms, diagnoses, names or
  phone numbers.
- Prefer Consent Mode + a minimal banner over broad tracking.
- Don't enable remarketing audiences that could imply health conditions.
