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

### Required GitHub secrets

Set these in **Settings → Secrets and variables → Actions**:

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
