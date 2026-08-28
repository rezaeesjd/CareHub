# Partner referrals

The lightweight version — no dashboard, no affiliate platform, no commission
logic on the website. Just enough to know which hotel/partner sent a client.

## How it works

1. Each partner gets a short **code**, e.g. `H001`.
2. Their flyer / QR points to `https://SITE_URL/en/?ref=H001&utm_source=hotel&utm_medium=referral`.
3. When a visitor lands, the site stores that attribution in their browser
   (**first touch**, kept 90 days). A later visit doesn't overwrite the original
   source, so a message on Wednesday still credits Monday's hotel scan.
4. When they tap **WhatsApp**, the code is appended to the prefilled message:
   `Referral: H001`.
5. If analytics is enabled, a `partner_referral_visit` event fires on arrival,
   and `click_whatsapp` / `click_phone` events carry `referral_code`.

No health information is ever stored or sent — only the marketing code and UTM
values.

## Creating a partner + QR

```bash
npm run partner:create -- --code H001 --name "Hotel Example" --type hotel
```

Output:

```
public/assets/partners/H001.svg   ← branded QR to print
partners.json                     ← internal registry (git-ignored)
```

`--type` becomes the `utm_source` (e.g. `hotel`, `bnb`, `property-manager`).
Add `--lang it` to point the QR at the Italian homepage.

> The QR files and `partners.json` are git-ignored on purpose — the partner list
> is internal and never needs to ship on the website.

## Suggested code scheme

| Prefix  | Partner type        |
| ------- | ------------------- |
| `H001`  | Hotel               |
| `B001`  | B&B                 |
| `PM001` | Property manager    |
| `TA001` | Travel agency       |
| `TO001` | Tour operator       |
| `U001`  | University / school |

## Phone callers (attribution is limited)

A phone call can't carry a URL parameter. Two things help:

- If the caller first visited the site (ref stored), the `click_phone` event
  still carries the code.
- Otherwise, the operator simply asks **"How did you hear about us?"** and notes
  it. Keep a column for source in your expense/lead sheet.

## Reporting

In GA4, build an exploration grouped by the `referral_code` event parameter (and
`utm_source`) to compare partners by visits and WhatsApp/phone clicks. Give the
hotel only commercial counts — never any client or medical detail.

## Not built yet (future)

Partner web page, commission calculation, and a partner-facing report are
intentionally out of scope for launch. The attribution above is the foundation
they would build on.
