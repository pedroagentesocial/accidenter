#!/usr/bin/env bash
set -euo pipefail

# Required env vars:
# FTP_SERVER, FTP_PORT, FTP_PATH, FTP_USERNAME, FTP_PASSWORD
#
# Usage:
#   export FTP_SERVER=...
#   export FTP_PORT=21
#   export FTP_PATH=public_html
#   export FTP_USERNAME=...
#   export FTP_PASSWORD=...
#   ./scripts/deploy.sh
#
# Builds the site and uploads dist/ to FTP_PATH, preserving directory structure.

echo "Building site..."
npm run build

echo "Uploading dist to FTP..."
find dist -type f -print0 | while IFS= read -r -d $'\0' file; do
  rel="${file#dist/}"
  enc_rel="$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1]))' "$rel")"
  curl --ftp-pasv -s --ftp-create-dirs \
    -T "$file" \
    "ftp://${FTP_SERVER}:${FTP_PORT}/${FTP_PATH}/${enc_rel}" \
    --user "${FTP_USERNAME}:${FTP_PASSWORD}" || {
    echo "Failed $rel"
    exit 1
  }
done

echo "Uploading favicon (logo.svg) ..."
curl --ftp-pasv -s --ftp-create-dirs \
  -T "public/images/logo.svg" \
  "ftp://${FTP_SERVER}:${FTP_PORT}/${FTP_PATH}/images/logo.svg" \
  --user "${FTP_USERNAME}:${FTP_PASSWORD}" || {
  echo "Failed logo.svg"
  exit 1
}

echo "Deploy complete."
