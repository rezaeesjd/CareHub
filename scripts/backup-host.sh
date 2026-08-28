#!/usr/bin/env bash
set -euo pipefail
: "${HOSTING_HOST:?required}" "${HOSTING_USERNAME:?required}" "${HOSTING_REMOTE_PATH:?required}"
REMOTE_PATH="$HOSTING_REMOTE_PATH"
while [[ "$REMOTE_PATH" == */ && "$REMOTE_PATH" != "/" ]]; do REMOTE_PATH="${REMOTE_PATH%/}"; done
case "$REMOTE_PATH" in ''|'/'|'.'|'..'|'/home'|'/var'|'/var/www') echo "Unsafe HOSTING_REMOTE_PATH" >&2; exit 2;; esac
case "$REMOTE_PATH/" in *'/../'*|*'/./'*|*'//'*) echo "HOSTING_REMOTE_PATH must be normalized" >&2; exit 2;; esac
case "$REMOTE_PATH" in /*) ;; *) echo "HOSTING_REMOTE_PATH must be absolute" >&2; exit 2;; esac
dest="host-backups/$(date -u +%Y%m%d-%H%M%S)"; mkdir -p "$dest"; rsync -az -e "ssh -p ${HOSTING_PORT:-22}" "$HOSTING_USERNAME@$HOSTING_HOST:$REMOTE_PATH/" "$dest/"; echo "$dest"
