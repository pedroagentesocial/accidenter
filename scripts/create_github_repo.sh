#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   GH_TOKEN=<token> ./scripts/create_github_repo.sh <repo_name> [description]
#
# Creates a GitHub repo under the authenticated user and pushes current directory.
# Requires: curl, git

if [ -z "${GH_TOKEN:-}" ]; then
  echo "GH_TOKEN environment variable is required" >&2
  exit 1
fi

REPO_NAME="${1:-}"
DESCRIPTION="${2:-AccidentER deployable site}"
if [ -z "$REPO_NAME" ]; then
  echo "Repository name is required" >&2
  exit 1
fi

API_URL="https://api.github.com/user/repos"
CREATE_PAYLOAD=$(jq -n --arg name "$REPO_NAME" --arg desc "$DESCRIPTION" '{name:$name, description:$desc, private:false}')

echo "Creating GitHub repository: $REPO_NAME"
RESP=$(curl -s -X POST "$API_URL" \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d "$CREATE_PAYLOAD")

CLONE_URL=$(echo "$RESP" | jq -r '.clone_url')
HTML_URL=$(echo "$RESP" | jq -r '.html_url')

if [ "$CLONE_URL" = "null" ] || [ -z "$CLONE_URL" ]; then
  echo "Failed to create repository. Response:" >&2
  echo "$RESP" >&2
  exit 1
fi

echo "Repo created: $HTML_URL"

echo "Setting git remote and pushing main..."
git remote remove origin >/dev/null 2>&1 || true
git remote add origin "$CLONE_URL"
git push -u origin main

echo "Done. Repository URL: $HTML_URL"
