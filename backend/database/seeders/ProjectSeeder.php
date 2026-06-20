<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title'       => 'Clinic Appointment System (QuickRes.org)',
                'description' => 'Multi-country clinic appointment platform with QuickRes.org as the main system and dedicated country-specific deployments across Thailand, Cambodia, Ukraine, and others — serving 30+ clinics in total. Designed booking flow, doctor calendar, and notification logic.',
                'tech_stack'  => ['Laravel', 'React', 'MySQL'],
                'github_url'  => null,
                'demo_url'    => 'https://quickres.org',
                'image_url'   => null,
                'is_featured' => true,
                'order'       => 1,
            ],
            [
                'title'       => 'Travel Booking Platform',
                'description' => 'In-development travel management system. Implemented Stripe payment integration and built admin panel for back-office workflows.',
                'tech_stack'  => ['.NET Core', 'React', 'SQL Server', 'Stripe'],
                'github_url'  => null,
                'demo_url'    => null,
                'image_url'   => null,
                'is_featured' => true,
                'order'       => 2,
            ],
            [
                'title'       => 'Internal Admin Dashboards',
                'description' => 'Reusable admin templates with PrimeReact components, role-based menus, and standardized API patterns adopted across multiple client projects.',
                'tech_stack'  => ['React', 'PrimeReact', 'Laravel', 'MySQL'],
                'github_url'  => null,
                'demo_url'    => null,
                'image_url'   => null,
                'is_featured' => false,
                'order'       => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
