# Deployment

**GitHub is the source of truth.** The flow is one-directional:

```
You edit → push to GitHub → CI builds & checks → deploy to hosting
```

Never edit files directly on the hosting server as a normal workflow. If you
ever must make an emergency change on the host, reproduce it in the repository
afterwards and redeploy, so GitHub stays authoritative. (We deliberately do
**not** run any automatic host→GitHub sync — that avoids overwrite loops and
prevents a compromised server from flowing back into source.)

> **Important:** the repository holds the _source_. A web host needs the
> _built_ files (plain HTML/CSS/JS). GitHub builds them for you — you never
> install Node, npm, or anything on your computer or on the host. Pick a path
> below.

---

## Copy-and-paste (no tools) deploy — recommended if you upload files yourself

After CI passes on `main`, GitHub builds the site (workflow
`.github/workflows/publish-static.yml`) and publishes the finished files two ways:

- a **`deploy` branch** that contains ONLY the ready-to-serve site, and
- a downloadable **artifact** (`florence-care-24-site`) attached to each run.

You need nothing installed. To put the site online:

### Option 1 — download the files, upload to the host

1. On GitHub: **Actions → Publish static site → (latest run) → Artifacts →
   `florence-care-24-site`** → download. GitHub gives you one ZIP; **unzip it
   once** and you get the site files (`index.html`, `.htaccess`, `en/`, `it/`,
   `assets/`, …) at the top level.
2. Upload **those files** into your host's web root (`public_html`, `htdocs`,
   `www` — whatever your host calls it) via your host's File Manager or any
   SFTP/FTP app. Upload the files themselves, not a wrapping folder.
3. Done — visiting your domain shows the site.

### Option 2 — download the `deploy` branch as a ZIP

1. On GitHub: switch the branch dropdown to **`deploy`** → **Code → Download
   ZIP**.
2. Unzip; it contains one top folder (`CareHub-deploy/`). Upload the **contents
   of that folder** into your web root.

### Option 3 — let the host pull the `deploy` branch (auto-sync, no upload)

If your host has **Git Version Control** (common in cPanel/Plesk):

1. In the host panel, **clone** your GitHub repo and select the **`deploy`**
   branch, with the deploy path set to your web root.
2. Because `deploy` already contains built files, the host runs **no build** —
   it just serves them.
3. After any change reaches `main`, GitHub rebuilds `deploy`; click **Update
   from Remote** (or set the host's webhook) to pull the new version. This is
   the "synced with GitHub" flow with nothing installed on your side.

**Set your domain first (one click, no install):** so links, the sitemap and
canonical tags use your real address, add a repository _variable_
**`PUBLIC_SITE_URL`** = `https://yourdomain.com` under **Settings → Secrets and
variables → Actions → Variables**. (Optional: `PUBLIC_GA_ID`, `PUBLIC_GTM_ID`
for analytics.) Then re-run **Publish static site** so the files pick it up.

**Serve from the domain/subdomain root**, not a sub-folder like
`example.com/site/` — the site uses root-absolute links (`/en/`, `/assets/…`).
Root or a subdomain (e.g. `www.` or `care.yourdomain.com`) both work.

Apache hosts also get `.htaccess` automatically (it ships inside the built
output) — see [HOSTING.md](./HOSTING.md).

---

## Automatic SSH deploy (optional) — GitHub pushes to the host for you

If you'd rather GitHub upload straight to the host on every merge (no manual
download), use the SSH path below instead. It's **optional and off by default**:
the deploy job runs only when you set the repository variable
**`DEPLOY_SSH_ENABLED=true`** (plus the hosting secrets). Until then the job is
skipped entirely — it never runs and never waits — and you just use the
copy-and-paste path above.

## Continuous integration — `.github/workflows/ci.yml`

Runs on every pull request and on pushes to `main` / `develop`:

1. Install dependencies from the lockfile (`npm ci`)
2. Type check (`npm run check`)
3. Lint / formatting (`npm run lint`)
4. Build (`npm run build`)
5. Verify static output (`npm run verify:dist`)
6. Unit tests (`npm test`)

The build fails the workflow on any error.

## Production deploy — `.github/workflows/deploy-production.yml`

Runs automatically after CI succeeds on `main`, or manually via
**Actions → Deploy to production → Run workflow**. It builds the site with
production env, verifies `dist/`, then rsyncs over SSH to your host.

This workflow runs **only** when the repository variable
`DEPLOY_SSH_ENABLED` is `true`; otherwise the job is skipped (it never enters the
`production` environment, so it can't get stuck "waiting for approval"). Safe to
ignore entirely if you use the copy-and-paste path above.

### To enable it — one variable + secrets

First add the opt-in **variable** under **Settings → Secrets and variables →
Actions → Variables**:

| Variable             | Value  |
| -------------------- | ------ |
| `DEPLOY_SSH_ENABLED` | `true` |

Then add the **secrets** under the same page → **Secrets**:

| Secret                | Example                      | Notes                                |
| --------------------- | ---------------------------- | ------------------------------------ |
| `HOSTING_HOST`        | `ssh.yourhost.com`           | required                             |
| `HOSTING_USERNAME`    | `florencecare`               | required                             |
| `HOSTING_REMOTE_PATH` | `/home/you/public_html`      | **absolute** web root; required      |
| `HOSTING_SSH_KEY`     | _(private key contents)_     | required; the whole key, PEM/OpenSSH |
| `HOSTING_PORT`        | `22`                         | optional (defaults to 22)            |
| `PUBLIC_SITE_URL`     | `https://florencecare24.com` | your final domain                    |
| `PUBLIC_GA_ID`        | `G-XXXXXXXXXX`               | optional; omit to ship no analytics  |
| `PUBLIC_GTM_ID`       | `GTM-XXXXXXX`                | optional                             |

> **Never commit credentials.** They belong only in GitHub Secrets (or your
> shell env for a local deploy). `.env` is git-ignored and must contain only
> `PUBLIC_*` values.

### Path-safety guards

Both the workflow and `scripts/deploy.sh` refuse to run if `HOSTING_REMOTE_PATH`
is empty, `/`, `/*`, not absolute, or implausibly short — because deploy uses
`rsync --delete`. Deletion is always scoped **inside** the remote path; nothing
outside it is touched. An empty `dist/` also aborts the deploy.

## Local emergency deploy

When you must deploy from your machine:

```bash
export HOSTING_HOST=ssh.yourhost.com
export HOSTING_USERNAME=florencecare
export HOSTING_REMOTE_PATH=/home/you/public_html
export HOSTING_SSH_KEY=~/.ssh/florencecare_deploy   # path to a private key
npm run deploy
```

This builds, verifies and rsyncs with the same safety guards.

## Generating the SSH key

```bash
ssh-keygen -t ed25519 -C "florencecare-deploy" -f florencecare_deploy
# Add the .pub key to the host's ~/.ssh/authorized_keys
# Paste the PRIVATE key contents into the HOSTING_SSH_KEY GitHub secret
```

## SFTP / FTP-only hosts

If the host has no SSH/rsync, deploy the **contents of `dist/`** with an SFTP or
FTP client / CI action (see [HOSTING.md](./HOSTING.md)). The build step is
identical (`npm run build`); only the upload transport changes.
