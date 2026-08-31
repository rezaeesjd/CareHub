# Hosting

Florence Care 24 builds to plain static files in `dist/` (HTML, CSS, a little
JS, SVG). **No Node.js runs on the hosting server.** Any host that serves static
files works.

## What you need from your hosting provider

| Item                                                        | Why                                |
| ----------------------------------------------------------- | ---------------------------------- |
| Hostname (e.g. `ssh.host.com`)                              | where to connect                   |
| Port (usually 22 for SSH)                                   | connection                         |
| Username                                                    | connection                         |
| SSH key **or** password                                     | authentication (SSH key preferred) |
| Document root (absolute path, e.g. `/home/you/public_html`) | where files go                     |
| Protocol available (SSH+rsync / SFTP / FTP)                 | how we deploy                      |
| Domain                                                      | the public address                 |
| SSL status                                                  | whether HTTPS is active            |

## Three ways to deploy

### 1. SSH + rsync (preferred)

Fastest and safest. Used by both the GitHub Actions deploy and the local
`npm run deploy` script. Only changed files are transferred; removed files are
deleted on the host (`--delete`), scoped strictly to your document root.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the exact secrets and workflow.

### 2. SFTP

If the host offers SFTP but not shell/rsync, upload the **contents of `dist/`**
into your document root with any SFTP client (FileZilla, Cyberduck) or a CI
SFTP action. Upload into the document root itself, not a subfolder.

### 3. FTP / FTPS (last resort)

Same idea as SFTP but over FTP. Prefer FTPS (encrypted) over plain FTP. Upload
the contents of `dist/` to the document root.

## Apache shared hosting (`.htaccess`)

If your host runs Apache, `public/.htaccess` is included in the build output. It
is **optional** and conservative — each block is commented:

1. **HTTPS redirect** — commented out; enable once your SSL certificate is live.
2. **Security headers** — `X-Content-Type-Options`, `Referrer-Policy`,
   `Permissions-Policy` (and HSTS, commented, for after HTTPS is confirmed).
3. **Deny `.git`** — blocks VCS metadata if a checkout ever lands in the web
   root (defense in depth; `.well-known` still served).
4. **Compression** (`mod_deflate`) and **caching** (`mod_expires`).
5. **Custom 404** → `/404.html`.

Remove any block your host doesn't support. If your host is **not** Apache
(nginx, a static-CDN host, etc.), configure the equivalent headers/caching in
that host's control panel and ignore `.htaccess`.

## DNS (high level)

1. Point your domain's **A record** (and `www` **CNAME**, if used) at your
   host's IP / target, per your provider's instructions.
2. Enable **SSL** (most hosts offer free Let's Encrypt).
3. Set `PUBLIC_SITE_URL` to the final `https://…` domain (GitHub secret /
   `.env`) so canonical URLs, the sitemap and structured data are correct.
4. After HTTPS works everywhere, enable the HTTPS-redirect and HSTS lines in
   `.htaccess` (or the host equivalent).

## Recommended security headers

Set these at the host if you're not using `.htaccess`:

- `Content-Security-Policy` — start report-only; allow `self`, plus
  `https://www.googletagmanager.com` / `https://www.google-analytics.com`
  **only if** you enable analytics.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (only after
  HTTPS is confirmed).
