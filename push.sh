#!/bin/bash
# Push V-day to GitHub (sriich07/V-day)
# Run from project folder: ./push.sh   or   bash push.sh

set -e
cd "$(dirname "$0")"

# Ensure correct remote (GitHub is case-sensitive: V-day not v-day)
git remote set-url origin https://github.com/sriich07/V-day.git

# If remote has new commits, pull with rebase first to avoid "rejected" error
git fetch origin 2>/dev/null || true
git rebase origin/main 2>/dev/null || true

# Push (use your GitHub username + Personal Access Token when prompted)
git push -u origin main

echo "Done! Site: https://sriich07.github.io/V-day/"
