#!/usr/bin/env bash
set -euo pipefail
: "${HOSTING_HOST:?required}" "${HOSTING_USERNAME:?required}" "${HOSTING_REMOTE_PATH:?required}"
case "$HOSTING_REMOTE_PATH" in ''|'/'|'.'|'..') echo "Unsafe HOSTING_REMOTE_PATH" >&2; exit 2;; esac
dest="host-backups/$(date -u +%Y%m%d-%H%M%S)"; mkdir -p "$dest"; rsync -az -e "ssh -p ${HOSTING_PORT:-22}" "$HOSTING_USERNAME@$HOSTING_HOST:$HOSTING_REMOTE_PATH/" "$dest/"; echo "$dest"
