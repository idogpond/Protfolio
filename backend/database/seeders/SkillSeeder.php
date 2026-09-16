<?php
namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Frontend
            ['name' => 'React.js',          'icon' => '⚛️',  'level' => 90, 'category' => 'frontend', 'order' => 1],
            ['name' => 'TypeScript',        'icon' => 'TS',  'level' => 85, 'category' => 'frontend', 'order' => 2],
            ['name' => 'JavaScript (ES6+)', 'icon' => 'JS',  'level' => 90, 'category' => 'frontend', 'order' => 3],
            ['name' => 'Vue.js',            'icon' => '🟢',  'level' => 75, 'category' => 'frontend', 'order' => 4],
            ['name' => 'Tailwind CSS',      'icon' => '🎨',  'level' => 90, 'category' => 'frontend', 'order' => 5],
            ['name' => 'PrimeReact',        'icon' => '🔵',  'level' => 80, 'category' => 'frontend', 'order' => 6],
            // Backend
            ['name' => 'PHP Laravel',       'icon' => '🔴',  'level' => 90, 'category' => 'backend',  'order' => 7],
            ['name' => '.NET Core / C#',    'icon' => '🟣',  'level' => 85, 'category' => 'backend',  'order' => 8],
            ['name' => 'Express.js',        'icon' => '🟡',  'level' => 70, 'category' => 'backend',  'order' => 9],
            ['name' => 'RESTful API',       'icon' => '🔌',  'level' => 90, 'category' => 'backend',  'order' => 10],
            ['name' => 'MySQL',             'icon' => '🐬',  'level' => 85, 'category' => 'backend',  'order' => 11],
            ['name' => 'SQL Server',        'icon' => '🗄️',  'level' => 80, 'category' => 'backend',  'order' => 12],
            ['name' => 'Next.js',            'icon' => '▲',  'level' => 80, 'category' => 'frontend', 'order' => 15],
            ['name' => 'HTML5',              'icon' => '🌐', 'level' => 90, 'category' => 'frontend', 'order' => 16],
            ['name' => 'CSS3 / SCSS / SASS', 'icon' => '🎨', 'level' => 85, 'category' => 'frontend', 'order' => 17],
            ['name' => 'Bootstrap',          'icon' => '🅱️', 'level' => 70, 'category' => 'frontend', 'order' => 18],
            ['name' => 'PrimeFlex',          'icon' => '🔷', 'level' => 75, 'category' => 'frontend', 'order' => 19],
            // DevOps
            ['name' => 'Docker',            'icon' => '🐳',  'level' => 75, 'category' => 'devops',   'order' => 13],
            ['name' => 'Git',               'icon' => '🌿',  'level' => 90, 'category' => 'devops',   'order' => 14],
            ['name' => 'Composer',          'icon' => '📦', 'level' => 80, 'category' => 'devops',   'order' => 20],
            ['name' => 'npm / yarn',        'icon' => '📦', 'level' => 85, 'category' => 'devops',   'order' => 21],
            ['name' => 'VS Code',           'icon' => '🧩', 'level' => 90, 'category' => 'devops',   'order' => 22],
            ['name' => 'Visual Studio',     'icon' => '🧩', 'level' => 75, 'category' => 'devops',   'order' => 23],
        ];

        foreach ($skills as $skill) {
            Skill::create(array_merge($skill, ['created_at' => now(), 'updated_at' => now()]));
        }
    }
}
