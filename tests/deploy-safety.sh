#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
temp="$(mktemp -d)"
trap 'rm -rf "$temp"' EXIT
mkdir -p "$temp/bin" "$root/dist"
touch "$root/dist/index.html"
cat > "$temp/bin/rsync" <<'EOF'
#!/usr/bin/env bash
printf '%s\n' "$*" > "${RSYNC_CAPTURE:?}"
EOF
chmod +x "$temp/bin/rsync"

run_deploy() {
  env PATH="$temp/bin:$PATH" RSYNC_CAPTURE="$temp/capture" HOSTING_HOST=host HOSTING_USERNAME=user HOSTING_REMOTE_PATH="$1" bash "$root/scripts/deploy.sh"
}

for unsafe in / /home /home/ /var/www /var/www/ /var/www// /var//www relative/path /srv/../home; do
  if run_deploy "$unsafe" >/dev/null 2>&1; then
    echo "unsafe deployment path was accepted: $unsafe" >&2
    exit 1
  fi
done

run_deploy /srv/florence-care/ >/dev/null
grep -F 'user@host:/srv/florence-care/' "$temp/capture" >/dev/null
echo 'Deployment path safety checks passed.'
