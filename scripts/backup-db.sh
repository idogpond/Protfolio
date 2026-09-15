#!/bin/bash
# Dumps the portfolio MySQL database to backups/<timestamp>.sql
# Usage: ./scripts/backup-db.sh
set -euo pipefail

cd "$(dirname "$0")/.."
set -a
source .env
set +a

mkdir -p backups
timestamp=$(date +%Y%m%d-%H%M%S)
out="backups/portfolio-${timestamp}.sql"

docker exec portfolio_db mysqldump \
  --no-tablespaces \
  -u"${DB_USERNAME:-portfolio_user}" \
  -p"${DB_PASSWORD:-secret}" \
  "${DB_DATABASE:-portfolio_db}" > "$out"

echo "Backup written to $out"

# Keep only the 14 most recent backups
ls -1t backups/portfolio-*.sql | tail -n +15 | xargs -r rm --
