<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@portfolio.com')],
            [
                'name'     => 'Admin',
                'password' => bcrypt(env('ADMIN_PASSWORD', 'password')),
            ]
        );
    }
}
