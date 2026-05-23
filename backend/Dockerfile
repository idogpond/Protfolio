FROM php:8.2-cli

# System dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev libzip-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install dependencies first (better layer caching)
COPY composer.json composer.lock* ./
RUN composer install --no-scripts --no-autoloader --prefer-dist

# Copy application
COPY . .

RUN mkdir -p bootstrap/cache storage/framework/{sessions,views,cache} storage/logs storage/app/public \
    && composer dump-autoload --optimize \
    && chmod +x docker-entrypoint.sh \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000

ENTRYPOINT ["./docker-entrypoint.sh"]
