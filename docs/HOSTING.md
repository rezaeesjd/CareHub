# Hosting Florence Care 24

The host serves only `dist/`. Ask the provider for hostname, protocol, port, username, authentication method, absolute document root, domain/DNS records and SSL status.

## SSH and rsync (preferred)
Set the `HOSTING_*` variables or GitHub secrets and run `npm run build && npm run deploy`. The script rejects empty and high-risk remote paths, preserves `.well-known/`, and applies `--delete` only inside the configured document root. Use a restricted deployment account and verify the remote path with the provider.

## SFTP and FTPS fallback
If rsync is unavailable, configure a reputable SFTP deployment Action to upload `dist/` after retaining the same path guards. Prefer SFTP. Use FTPS only where SSH/SFTP is unavailable; require TLS and store passwords only in GitHub secrets. Never use plaintext FTP.

## Apache and security
`public/.htaccess` provides a custom 404, compression, cache hints, and conservative `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers. HTTPS redirection and HSTS are intentionally not forced until SSL is confirmed. After testing HTTPS, configure `Strict-Transport-Security`. Develop and test a Content Security Policy in report-only mode before enforcement, especially if GA/GTM is enabled.

Point DNS records supplied by the provider at the host, attach the final domain, provision SSL, then set `PUBLIC_SITE_URL` and rebuild. Never display the hosting address as a customer-facing clinic address.
