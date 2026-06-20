<?php

namespace App\Console\Commands;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportCvData extends Command
{
    protected $signature   = 'cv:import';
    protected $description = 'Wipe candidate profile data and reimport from CV (single source of truth)';

    // ── CV Data ────────────────────────────────────────────────────────────────

    private array $profileData = [
        'name'                => 'Kittikarn Janbang',
        'nickname'            => 'Kittikarn',
        'job_title_en'        => 'Full-Stack Developer',
        'job_title_th'        => 'นักพัฒนา Full-Stack',
        'bio_en'              => 'Full-Stack Developer with 3+ years of experience specializing in modernizing legacy systems — migrating monolithic Laravel Blade applications into decoupled architectures with React frontends and Laravel REST APIs. Experienced in full backend refactoring, version upgrades, and API redesign to ensure full feature parity. Also built and maintained 10+ production applications in healthcare and travel domains.',
        'bio_th'              => 'Full-Stack Developer ที่มีประสบการณ์กว่า 3 ปี เชี่ยวชาญการ Modernize Legacy Systems — ย้ายระบบ Laravel Blade แบบ Monolith ไปเป็น Decoupled Architecture ที่มี React Frontend กับ Laravel REST API สร้างและดูแล Production Application มากกว่า 10 ระบบในกลุ่ม Healthcare และ Travel',
        'about_en'            => "Hi! I'm Kittikarn Janbang, a Full-Stack Developer with 3+ years of experience building web applications on both Frontend and Backend.\n\nI specialize in modernizing legacy systems — migrating monolithic Laravel Blade applications to a decoupled architecture with a React Frontend and Laravel REST API, including full backend refactoring, version upgrades, and API redesign.\n\nI'm proficient in PHP Laravel, .NET Core / C#, React.js, TypeScript, MySQL, and Docker. I have experience building and maintaining 10+ production systems in the Healthcare and Travel domains.",
        'about_th'            => "สวัสดีครับ! ผมชื่อ Kittikarn Janbang เป็น Full-Stack Developer ที่มีประสบการณ์กว่า 3 ปี ในการพัฒนา Web Application ทั้งฝั่ง Frontend และ Backend\n\nผมเชี่ยวชาญในการ Modernize Legacy Systems — ย้ายระบบ Laravel Blade แบบ Monolith ไปเป็น Decoupled Architecture ที่มี React Frontend กับ Laravel REST API รวมถึงมีประสบการณ์ทำ Full Backend Refactoring, Version Upgrade และ API Redesign\n\nผมถนัด PHP Laravel, .NET Core / C#, React.js, TypeScript, MySQL และ Docker มีประสบการณ์สร้างและดูแล Production Application มากกว่า 10 ระบบในกลุ่ม Healthcare และ Travel",
        'profile_image'       => '',
        'years_of_experience' => 3,
        'date_of_birth'       => null,
        'location_en'         => 'Samut Prakan, Thailand',
        'location_th'         => 'สมุทรปราการ, ไทย',
        'available_for_hire'  => true,
        'email'               => 'kt.janbang@gmail.com',
        'phone'               => '064-956-4959',
        'line_id'             => '',
        'whatsapp'            => '',
        'github_url'          => 'https://github.com/idogpond',
        'linkedin_url'        => 'https://www.linkedin.com/in/kittikarn-janbang',
        'facebook_url'        => '',
        'twitter_url'         => '',
        'instagram_url'       => '',
        'youtube_url'         => '',
        'website_url'         => '',
        'resume_url'          => '/resume.pdf',
        'resume_label_en'     => 'Download CV',
        'resume_label_th'     => 'ดาวน์โหลด CV',
        'meta_title_en'       => 'Kittikarn Janbang | Full-Stack Developer',
        'meta_title_th'       => 'กิตติกานต์ จันบาง | นักพัฒนา Full-Stack',
        'meta_description_en' => 'Full-Stack Developer with 3+ years of experience in PHP Laravel, .NET Core C#, React, and TypeScript. Specialized in legacy system modernization. Based in Samut Prakan, Thailand.',
        'meta_description_th' => 'Full-Stack Developer ที่มีประสบการณ์ 3+ ปี ในด้าน PHP Laravel, .NET Core C#, React และ TypeScript เชี่ยวชาญการ Modernize Legacy Systems ตั้งอยู่ที่สมุทรปราการ',
        'og_image'            => '',
    ];

    private array $experiencesData = [
        [
            'company'        => 'AD System Asia Co., Ltd.',
            'position_en'    => 'Full-Stack Web Developer',
            'position_th'    => 'นักพัฒนาเว็บ Full-Stack',
            'period'         => 'Oct 2022 — Present',
            'started_at'     => '2022-10-01',
            'ended_at'       => null,
            'description_en' => [
                'Designed, built, and maintained 10+ production-grade web applications powering Clinic Appointment and Travel-booking systems used by daily clients.',
                'Owned full-stack development end-to-end: API architecture in PHP Laravel and .NET Core, frontend in React with PrimeReact, and MySQL / SQL Server data layer.',
                'Implemented secure JWT-based authentication, role-based access control, and environment-based configuration for staging / production parity.',
                'Optimized database queries and refactored legacy modules, cutting page load and API response times by approximately half.',
                'Led solo migration of a monolithic Laravel Blade application to a decoupled architecture (React SPA + Laravel REST API), including full backend refactoring and version upgrade.',
                'Conducted code reviews, regression testing, and manual QA to keep release quality high in a small, fast-moving team.',
            ],
            'description_th' => [
                'ออกแบบ สร้าง และดูแลเว็บแอปพลิเคชันระดับ Production มากกว่า 10 ระบบ สำหรับระบบนัดหมายคลินิกและจองท่องเที่ยว',
                'รับผิดชอบการพัฒนา Full-Stack ตั้งแต่ต้นจนจบ: API ด้วย PHP Laravel และ .NET Core, Frontend ด้วย React + PrimeReact และ MySQL / SQL Server',
                'พัฒนาระบบ Authentication ด้วย JWT, Role-based Access Control และ Environment Config สำหรับ Staging/Production',
                'ปรับปรุง Query และ Refactor Legacy Module ลดเวลาโหลดหน้าและ Response Time ลงประมาณครึ่งหนึ่ง',
                'นำทีมย้ายระบบ Laravel Blade แบบ Monolith ไปเป็น Decoupled Architecture (React SPA + Laravel REST API) รวมถึง Backend Refactoring และ Version Upgrade',
                'ทำ Code Review, Regression Testing และ Manual QA เพื่อรักษาคุณภาพของ Release ในทีมขนาดเล็ก',
            ],
            'tech'           => ['PHP Laravel', '.NET Core / C#', 'React', 'PrimeReact', 'MySQL', 'SQL Server', 'Docker', 'JWT'],
            'order'          => 1,
        ],
        [
            'company'        => 'A-Host Company Limited',
            'position_en'    => 'Developer Intern',
            'position_th'    => 'นักพัฒนาฝึกงาน',
            'period'         => 'Dec 2020 — Mar 2021',
            'started_at'     => '2020-12-01',
            'ended_at'       => '2021-03-31',
            'description_en' => [
                'Built a responsive frontend in Vue.js integrated with .NET Core APIs backed by Microsoft SQL Server.',
                'Implemented CRUD modules processing 1,000+ records per month, including form validation, list/detail views, and error handling.',
                'Collaborated with senior engineers in code reviews and gained exposure to enterprise-grade .NET workflows.',
            ],
            'description_th' => [
                'พัฒนา Frontend ด้วย Vue.js เชื่อมต่อกับ .NET Core API และ Microsoft SQL Server',
                'สร้าง CRUD Module ที่จัดการข้อมูลมากกว่า 1,000 รายการต่อเดือน รวมถึง Form Validation, List/Detail View และ Error Handling',
                'ร่วม Code Review กับวิศวกรอาวุโสและเรียนรู้ .NET Workflow ระดับ Enterprise',
            ],
            'tech'           => ['Vue.js', '.NET Core', 'SQL Server'],
            'order'          => 2,
        ],
    ];

    private array $skillsData = [
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
        // DevOps
        ['name' => 'Docker',            'icon' => '🐳',  'level' => 75, 'category' => 'devops',   'order' => 13],
        ['name' => 'Git',               'icon' => '🌿',  'level' => 90, 'category' => 'devops',   'order' => 14],
    ];

    private array $educationsData = [
        [
            'degree_en'    => 'Bachelor of Science',
            'degree_th'    => 'วิทยาศาสตรบัณฑิต',
            'field_en'     => 'Information Technology',
            'field_th'     => 'เทคโนโลยีสารสนเทศ',
            'institution'  => 'FILL_FROM_CV',
            'started_at'   => 2018,
            'graduated_at' => 2022,
            'gpa'          => null,
            'order'        => 1,
        ],
    ];

    private array $projectsData = [
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

    // ── Command Logic ──────────────────────────────────────────────────────────

    public function handle(): int
    {
        $this->info('');
        $this->info('═══════════════════════════════════════');
        $this->info('   CV Import — Kittikarn Janbang CV');
        $this->info('═══════════════════════════════════════');

        $counts = [
            'deleted'  => ['profiles' => 0, 'experiences' => 0, 'skills' => 0, 'educations' => 0, 'projects' => 0],
            'inserted' => ['profiles' => 0, 'experiences' => 0, 'skills' => 0, 'educations' => 0, 'projects' => 0],
        ];

        try {
            DB::transaction(function () use (&$counts) {
                // ── Delete existing data ────────────────────────────────────
                $counts['deleted']['profiles']    = Profile::query()->delete();
                $counts['deleted']['experiences'] = Experience::query()->delete();
                $counts['deleted']['skills']      = Skill::query()->delete();
                $counts['deleted']['educations']  = Education::query()->delete();
                $counts['deleted']['projects']    = Project::query()->delete();

                // ── Insert profile ──────────────────────────────────────────
                Profile::create($this->profileData);
                $counts['inserted']['profiles'] = 1;

                // ── Insert experiences ──────────────────────────────────────
                foreach ($this->experiencesData as $exp) {
                    Experience::create([
                        'company'        => $exp['company'],
                        'position_en'    => $exp['position_en'],
                        'position_th'    => $exp['position_th'],
                        'period'         => $exp['period'],
                        'started_at'     => $exp['started_at'],
                        'ended_at'       => $exp['ended_at'],
                        'description_en' => json_encode($exp['description_en']),
                        'description_th' => json_encode($exp['description_th']),
                        'tech'           => json_encode($exp['tech']),
                        'order'          => $exp['order'],
                    ]);
                    $counts['inserted']['experiences']++;
                }

                // ── Insert skills ───────────────────────────────────────────
                foreach ($this->skillsData as $skill) {
                    Skill::create($skill);
                    $counts['inserted']['skills']++;
                }

                // ── Insert educations ───────────────────────────────────────
                foreach ($this->educationsData as $edu) {
                    Education::create($edu);
                    $counts['inserted']['educations']++;
                }

                // ── Insert projects ─────────────────────────────────────────
                foreach ($this->projectsData as $project) {
                    Project::create($project);
                    $counts['inserted']['projects']++;
                }
            });
        } catch (\Throwable $e) {
            $this->error('Transaction rolled back: ' . $e->getMessage());
            return self::FAILURE;
        }

        // ── Summary Report ─────────────────────────────────────────────────
        $this->info('');
        $this->info('DELETED:');
        foreach ($counts['deleted'] as $table => $n) {
            $this->line(sprintf('  %-15s : %d', $table, $n));
        }
        $this->info('');
        $this->info('INSERTED:');
        foreach ($counts['inserted'] as $table => $n) {
            $this->line(sprintf('  %-15s : %d', $table, $n));
        }
        $this->info('');
        $this->info('Import complete.');
        $this->info('');

        return self::SUCCESS;
    }
}
