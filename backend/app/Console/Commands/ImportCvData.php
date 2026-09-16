<?php

namespace App\Console\Commands;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Language;
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
        'name_en'             => 'Kittikarn Janbang',
        'name_th'             => 'กิตติกานต์ จันบาง',
        'nickname_en'         => 'Kittikarn',
        'nickname_th'         => 'กิตติกานต์',
        'job_title_en'        => 'Full-Stack Developer',
        'job_title_th'        => 'นักพัฒนา Full-Stack',
        'bio_en'              => "Full-Stack Developer with 3+ years building and maintaining web applications for healthcare and travel businesses. Comfortable owning a feature end-to-end, from the database up to the UI.",
        'bio_th'              => "Full-Stack Developer ที่มีประสบการณ์กว่า 3 ปี ในการสร้างและดูแลเว็บแอปพลิเคชันให้ธุรกิจ Healthcare และ Travel ถนัดดูแลฟีเจอร์ตั้งแต่ต้นจนจบ ตั้งแต่ฐานข้อมูลไปจนถึง UI",
        'about_en'            => "Hi! I'm Kittikarn Janbang, a Full-Stack Developer with 3+ years building and maintaining web applications for healthcare and travel businesses.\n\nMost of that time has gone into taking an old Laravel Blade system apart and rebuilding it as a React frontend talking to a Laravel API, while keeping everything clients already depended on working the same as before.\n\nI'm comfortable owning a feature end-to-end, from the database up to the UI. My stack includes PHP Laravel, .NET Core / C#, React.js, Next.js, TypeScript, MySQL, and Docker.",
        'about_th'            => "สวัสดีครับ! ผมชื่อ Kittikarn Janbang เป็น Full-Stack Developer ที่มีประสบการณ์กว่า 3 ปี ในการสร้างและดูแลเว็บแอปพลิเคชันให้ธุรกิจ Healthcare และ Travel\n\nเวลาส่วนใหญ่ผมใช้ไปกับการรื้อระบบ Laravel Blade เก่าออกแล้วสร้างใหม่เป็น React Frontend ที่คุยกับ Laravel API โดยยังคงทุกอย่างที่ลูกค้าเคยใช้งานอยู่ให้ทำงานเหมือนเดิม\n\nผมถนัดดูแลฟีเจอร์ตั้งแต่ต้นจนจบ ตั้งแต่ฐานข้อมูลไปจนถึง UI สแตกที่ใช้ประจำคือ PHP Laravel, .NET Core / C#, React.js, Next.js, TypeScript, MySQL และ Docker",
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
        'linkedin_url'        => '',
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
            'period_en'      => 'Oct 2022 — Present',
            'period_th'      => 'ต.ค. 2022 — ปัจจุบัน',
            'started_at'     => '2022-10-01',
            'ended_at'       => null,
            'description_en' => [
                'Build and maintain 12 web apps for clinic-appointment and travel-booking systems, handling everything from database design up to the UI.',
                'Migrated a large legacy Laravel Blade app to React solo: evaluated React libraries/packages, then split the old Blade controllers into a standalone API server for the frontend to consume.',
                "Cut a slow report page's load time from ~30s to ~10s by consolidating 2–3 duplicate queries into one, on a 50-row-per-page table pulling from 10,000+ records.",
                'Set up JWT authentication and role-based permissions so different staff roles only see what they should.',
                "Do code reviews and manual/regression testing before releases. It's a small team, so this is what catches most issues before they reach a client.",
            ],
            'description_th' => [
                'สร้างและดูแลเว็บแอป 12 ระบบ สำหรับระบบนัดหมายคลินิกและจองท่องเที่ยว ดูแลตั้งแต่ออกแบบฐานข้อมูลไปจนถึง UI',
                'ย้ายระบบ Laravel Blade เก่าไปเป็น React คนเดียว: ประเมินไลบรารี/แพ็กเกจ React แล้วแยก Blade controller เดิมออกมาเป็น API server แยกต่างหากให้ frontend เรียกใช้',
                'ลดเวลาโหลดหน้ารายงานจาก ~30 วินาที เหลือ ~10 วินาที ด้วยการรวม query ที่ซ้ำกัน 2-3 ตัวเป็นตัวเดียว บนตารางที่แสดง 50 แถวต่อหน้าจากข้อมูลกว่า 10,000 รายการ',
                'ตั้งค่า JWT authentication และสิทธิ์ตาม role ให้พนักงานแต่ละตำแหน่งเห็นเฉพาะส่วนที่ควรเห็น',
                'ทำ code review และ manual/regression testing ก่อนปล่อยรุ่นใหม่ เป็นทีมเล็ก จุดนี้เลยเป็นตัวจับปัญหาส่วนใหญ่ก่อนถึงมือลูกค้า',
            ],
            'tech'           => ['PHP Laravel', '.NET Core / C#', 'React', 'PrimeReact', 'MySQL', 'SQL Server', 'Docker', 'JWT'],
            'order'          => 1,
        ],
        [
            'company'        => 'A-Host Company Limited',
            'position_en'    => 'Developer Intern',
            'position_th'    => 'นักพัฒนาฝึกงาน',
            'period_en'      => 'Dec 2020 — Mar 2021',
            'period_th'      => 'ธ.ค. 2020 — มี.ค. 2021',
            'started_at'     => '2020-12-01',
            'ended_at'       => '2021-03-31',
            'description_en' => [
                'Developed the frontend in Vue.js for an internal system, wired up to .NET Core APIs and a SQL Server database.',
                'Built out the CRUD screens (forms, list/detail views, error handling) for a system handling 1,000+ records a month.',
                'First real exposure to enterprise .NET practices, mostly through code reviews with senior engineers.',
            ],
            'description_th' => [
                'พัฒนา Frontend ด้วย Vue.js สำหรับระบบภายใน เชื่อมกับ .NET Core API และฐานข้อมูล SQL Server',
                'สร้างหน้าจอ CRUD (ฟอร์ม, list/detail view, error handling) สำหรับระบบที่จัดการข้อมูลกว่า 1,000 รายการต่อเดือน',
                'ได้สัมผัสแนวทางการทำงานแบบ Enterprise .NET จริงเป็นครั้งแรก ส่วนใหญ่ผ่านการทำ code review กับวิศวกรอาวุโส',
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

    private array $educationsData = [
        [
            'degree_en'    => 'Bachelor of Science',
            'degree_th'    => 'วิทยาศาสตรบัณฑิต',
            'field_en'     => 'Information Technology',
            'field_th'     => 'เทคโนโลยีสารสนเทศ',
            'institution_en' => 'Burapha University, Thailand',
            'institution_th' => 'มหาวิทยาลัยบูรพา, ประเทศไทย',
            'started_at'   => 2018,
            'graduated_at' => 2022,
            'gpa'          => null,
            'order'        => 1,
        ],
    ];

    private array $projectsData = [
        [
            'title'       => 'Clinic Appointment System (QuickRes.org)',
            'description' => 'A booking platform live in 13 countries (including Thailand, Cambodia, and Ukraine), serving 50+ clinics. Designed the booking flow, doctor calendar, and notification logic myself.',
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
            'tech_stack'  => ['.NET Core', 'React', 'Next.js', 'SQL Server', 'Stripe'],
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

    private array $languagesData = [
        [
            'name_en'         => 'Thai',
            'name_th'         => 'ไทย',
            'proficiency_en'  => 'Native',
            'proficiency_th'  => 'เจ้าของภาษา',
            'order'           => 1,
        ],
        [
            'name_en'         => 'English',
            'name_th'         => 'อังกฤษ',
            'proficiency_en'  => 'Reading/Writing/Listening: Working Proficiency; Speaking: Basic',
            'proficiency_th'  => 'อ่าน เขียน ฟัง ใช้งานได้ดี / พูด พื้นฐาน',
            'order'           => 2,
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
            'deleted'  => ['profiles' => 0, 'experiences' => 0, 'skills' => 0, 'educations' => 0, 'projects' => 0, 'languages' => 0],
            'inserted' => ['profiles' => 0, 'experiences' => 0, 'skills' => 0, 'educations' => 0, 'projects' => 0, 'languages' => 0],
        ];

        try {
            DB::transaction(function () use (&$counts) {
                // ── Delete existing data ────────────────────────────────────
                $counts['deleted']['profiles']    = Profile::query()->delete();
                $counts['deleted']['experiences'] = Experience::query()->delete();
                $counts['deleted']['skills']      = Skill::query()->delete();
                $counts['deleted']['educations']  = Education::query()->delete();
                $counts['deleted']['projects']    = Project::query()->delete();
                $counts['deleted']['languages']   = Language::query()->delete();

                // ── Insert profile ──────────────────────────────────────────
                Profile::create($this->profileData);
                $counts['inserted']['profiles'] = 1;

                // ── Insert experiences ──────────────────────────────────────
                foreach ($this->experiencesData as $exp) {
                    Experience::create([
                        'company'        => $exp['company'],
                        'position_en'    => $exp['position_en'],
                        'position_th'    => $exp['position_th'],
                        'period_en'      => $exp['period_en'],
                        'period_th'      => $exp['period_th'],
                        'started_at'     => $exp['started_at'],
                        'ended_at'       => $exp['ended_at'],
                        'description_en' => $exp['description_en'],
                        'description_th' => $exp['description_th'],
                        'tech'           => $exp['tech'],
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

                // ── Insert languages ────────────────────────────────────────
                foreach ($this->languagesData as $language) {
                    Language::create($language);
                    $counts['inserted']['languages']++;
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
