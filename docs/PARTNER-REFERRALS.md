# Partner referrals

Codes use category prefixes such as `H001` hotel, `B001` B&B, `PM001` property manager, `TA001` travel agency, `TO001` tour operator and `U001` university. Create a QR with:
```bash
PUBLIC_SITE_URL=https://your-approved-domain.example npm run partner:create -- --code H001 --name "Hotel Example"
```
The command refuses to invent a domain, creates an SVG in `public/assets/partners/`, and writes ignored internal metadata to `data/partners.internal.json`. Never move that internal metadata into the public directory.

Landing links can combine `?ref=H001&utm_source=hotel&utm_medium=referral`. First-touch referral, landing path, timestamp, supported UTMs and `gclid` persist in first-party local storage. No symptoms, names, phone numbers or other health/patient data are stored. WhatsApp links append only `Referral: H001`; phone events carry the referral code to analytics, but staff should ask and manually record the source because a call cannot carry it to the operator. GA4 can report the event parameter after registering an appropriate custom dimension.
