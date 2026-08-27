#!/usr/bin/env bash
set -euo pipefail
: "${HOSTING_HOST:?required}" "${HOSTING_USERNAME:?required}" "${HOSTING_REMOTE_PATH:?required}"
PORT="${HOSTING_PORT:-22}"
case "$HOSTING_REMOTE_PATH" in ''|'/'|'.'|'..'|'/home'|'/var'|'/var/www') echo "Unsafe HOSTING_REMOTE_PATH" >&2; exit 2;; esac
test -d dist && test -f dist/index.html || { echo "Build and verify dist first" >&2; exit 2; }
rsync -az --delete --exclude='.well-known/' -e "ssh -p $PORT" dist/ "$HOSTING_USERNAME@$HOSTING_HOST:$HOSTING_REMOTE_PATH/"
