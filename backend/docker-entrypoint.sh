#!/bin/bash
set -e

echo "==> Waiting for MySQL..."
until php -r "new PDO('mysql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}');" 2>/dev/null; do
  sleep 2
done
echo "==> MySQL is ready."

# Generate app key if missing
if [ -z "$(grep '^APP_KEY=base64' .env 2>/dev/null)" ]; then
  echo "==> Generating APP_KEY..."
  php artisan key:generate --force
fi

# Run migrations
echo "==> Running migrations..."
php artisan migrate --force

# Seed only if projects table is empty
ROW_COUNT=$(php -r "echo (new PDO('mysql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}'))->query('SELECT COUNT(*) FROM projects')->fetchColumn();")
if [ "$ROW_COUNT" -eq "0" ]; then
  echo "==> Seeding database..."
  php artisan db:seed --force
fi

# Always ensure admin user and profile defaults exist
echo "==> Ensuring admin user..."
php artisan db:seed --class=AdminSeeder --force
echo "==> Ensuring profile defaults..."
php artisan db:seed --class=ProfileSeeder --force

# Clear caches
php artisan config:clear
php artisan route:clear

echo "==> Starting Laravel server..."
# Not `php artisan serve` — its ServeCommand spawns the actual request
# handler as a child process with a hardcoded env passthrough allow-list
# (APP_ENV, PATH, a few IDE/debug vars — see Laravel's ServeCommand
# $passthroughVariables). Everything else silently falls back to whatever
# was in .env at image build time, so docker-compose env vars (DB_*,
# MAIL_*, SANCTUM_*, ADMIN_*, ...) never reach real requests even though
# `php artisan tinker`/seeders see them fine. Running PHP's built-in
# server directly avoids that wrapper entirely.
exec php -S 0.0.0.0:8000 -t public public/index.php
