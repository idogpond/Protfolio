<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        Blog::create([
            'title'        => 'Getting Started with Docker for Laravel Development',
            'slug'         => 'getting-started-with-docker-for-laravel-development',
            'excerpt'      => 'Learn how to set up a complete Laravel development environment using Docker Compose with MySQL and phpMyAdmin.',
            'content'      => "# Getting Started with Docker for Laravel Development\n\nDocker has revolutionized how we set up development environments...\n\n## Why Docker?\n\nNo more \"works on my machine\" problems. Docker ensures your team runs identical environments.\n\n## Setting Up\n\nCreate a `docker-compose.yml` and define your services...",
            'cover_image'  => null,
            'is_published' => true,
            'published_at' => now()->subDays(5),
        ]);

        Blog::create([
            'title'        => 'Building RESTful APIs with Laravel 11 and Sanctum',
            'slug'         => 'building-restful-apis-with-laravel-11-and-sanctum',
            'excerpt'      => 'A practical guide to building secure and well-structured REST APIs using Laravel 11, API Resources, and Sanctum authentication.',
            'content'      => "# Building RESTful APIs with Laravel 11\n\nLaravel 11 simplified the project structure significantly...\n\n## API Resources\n\nAPI Resources let you transform Eloquent models into JSON responses cleanly...",
            'cover_image'  => null,
            'is_published' => true,
            'published_at' => now()->subDays(2),
        ]);
    }
}
