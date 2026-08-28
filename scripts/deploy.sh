#!/usr/bin/env bash
#
# Manual emergency deploy: build locally and rsync dist/ to the host over SSH.
# Normal deploys go through GitHub Actions (.github/workflows/deploy-production.yml).
# Use this only when you must push from your machine.
#
# Credentials come from the environment — NEVER hard-code them here.
#   HOSTING_HOST         e.g. ssh.yourhost.com          (required)
#   HOSTING_USERNAME     e.g. florencecare              (required)
#   HOSTING_REMOTE_PATH  absolute web root on the host  (required)
#   HOSTING_PORT         SSH port                       (default 22)
#   HOSTING_SSH_KEY      path to a private key file     (optional)
#
set -euo pipefail

: "${HOSTING_HOST:?Set HOSTING_HOST}"
: "${HOSTING_USERNAME:?Set HOSTING_USERNAME}"
: "${HOSTING_REMOTE_PATH:?Set HOSTING_REMOTE_PATH}"
PORT="${HOSTING_PORT:-22}"

REMOTE_PATH="$HOSTING_REMOTE_PATH"

# ---- Safety guards on the remote path (prevents catastrophic --delete) -------
case "$REMOTE_PATH" in
  ""|"/"|"/*"|"//"|"."|"./"|"~"|"~/")
    echo "✖ Refusing to deploy: HOSTING_REMOTE_PATH ('$REMOTE_PATH') is unsafe." >&2
    exit 1
    ;;
esac
if [[ "${REMOTE_PATH:0:1}" != "/" ]]; then
  echo "✖ HOSTING_REMOTE_PATH must be an absolute path (start with /). Got: '$REMOTE_PATH'" >&2
  exit 1
fi
# Reject filesystem roots / system directories, even if length passes
# (rsync --delete against these could erase unrelated data).
STRIPPED="${REMOTE_PATH%/}"
case "$STRIPPED" in
  ""|/|/home|/root|/etc|/var|/usr|/bin|/sbin|/lib|/lib64|/boot|/dev|/proc|/sys|/opt|/mnt|/media|/srv|/tmp|/run)
    echo "✖ Refusing to deploy: HOSTING_REMOTE_PATH is a system directory: '$STRIPPED'" >&2
    exit 1
    ;;
esac
if [[ "${#STRIPPED}" -lt 6 ]]; then
  echo "✖ HOSTING_REMOTE_PATH looks too short to be a real web root: '$STRIPPED'" >&2
  exit 1
fi
# Ensure a trailing slash so rsync writes INTO the directory.
REMOTE_PATH="${STRIPPED}/"

# ---- Build -------------------------------------------------------------------
echo "▶ Building static site..."
npm run build
node scripts/verify-dist.mjs

if [[ ! -d dist ]] || [[ -z "$(ls -A dist)" ]]; then
  echo "✖ dist/ is empty after build — aborting." >&2
  exit 1
fi

# ---- SSH options -------------------------------------------------------------
SSH_OPTS=(-p "$PORT" -o StrictHostKeyChecking=accept-new)
if [[ -n "${HOSTING_SSH_KEY:-}" ]]; then
  SSH_OPTS+=(-i "$HOSTING_SSH_KEY")
fi

echo "▶ Deploying dist/ → ${HOSTING_USERNAME}@${HOSTING_HOST}:${REMOTE_PATH} (port ${PORT})"
rsync -az --delete \
  --exclude '.well-known/' \
  -e "ssh ${SSH_OPTS[*]}" \
  dist/ "${HOSTING_USERNAME}@${HOSTING_HOST}:${REMOTE_PATH}"

echo "✔ Deploy complete."
