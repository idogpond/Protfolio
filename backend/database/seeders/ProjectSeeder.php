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
                'title'       => 'Portfolio Website',
                'description' => 'Personal portfolio built with Next.js 14 and Laravel 11. Features dark theme, smooth animations with Framer Motion, and a contact form backed by a REST API.',
                'tech_stack'  => ['Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Tailwind CSS', 'Docker'],
                'github_url'  => 'https://github.com/yourusername/portfolio',
                'demo_url'    => 'https://yourportfolio.dev',
                'image_url'   => null,
                'is_featured' => true,
                'order'       => 1,
            ],
            [
                'title'       => 'E-Commerce Platform',
                'description' => 'Full-stack e-commerce platform with product catalog, cart management, and payment integration using Stripe. Admin dashboard built with React and Recharts.',
                'tech_stack'  => ['React', 'Laravel', 'MySQL', 'Stripe', 'Redis'],
                'github_url'  => 'https://github.com/yourusername/ecommerce',
                'demo_url'    => null,
                'image_url'   => null,
                'is_featured' => true,
                'order'       => 2,
            ],
            [
                'title'       => 'Task Management API',
                'description' => 'RESTful API built with C# .NET Core 8. Features JWT authentication, role-based access control, real-time notifications via SignalR, and full test coverage.',
                'tech_stack'  => ['C# .NET Core', 'SQL Server', 'SignalR', 'Docker', 'xUnit'],
                'github_url'  => 'https://github.com/yourusername/taskapi',
                'demo_url'    => null,
                'image_url'   => null,
                'is_featured' => true,
                'order'       => 3,
            ],
            [
                'title'       => 'Real-time Chat App',
                'description' => 'Chat application with rooms, private messaging, and online presence using Laravel Broadcasting and Pusher. Frontend built with React and TailwindCSS.',
                'tech_stack'  => ['React', 'Laravel', 'Pusher', 'MySQL', 'Tailwind CSS'],
                'github_url'  => 'https://github.com/yourusername/chatapp',
                'demo_url'    => null,
                'image_url'   => null,
                'is_featured' => false,
                'order'       => 4,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
