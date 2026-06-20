<?php
namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        Experience::insert([
            [
                'company'        => 'AD System Asia Co., Ltd.',
                'position_en'    => 'Full-Stack Web Developer',
                'position_th'    => 'นักพัฒนาเว็บ Full-Stack',
                'period'         => 'Oct 2022 — Present',
                'started_at'     => '2022-10-01',
                'ended_at'       => null,
                'description_en' => json_encode([
                    'Designed, built, and maintained 10+ production-grade web applications powering Clinic Appointment and Travel-booking systems used by daily clients.',
                    'Owned full-stack development end-to-end: API architecture in PHP Laravel and .NET Core, frontend in React with PrimeReact, and MySQL / SQL Server data layer.',
                    'Implemented secure JWT-based authentication, role-based access control, and environment-based configuration for staging / production parity.',
                    'Optimized database queries and refactored legacy modules, cutting page load and API response times by approximately half.',
                    'Led solo migration of a monolithic Laravel Blade application to a decoupled architecture (React SPA + Laravel REST API), including full backend refactoring and version upgrade.',
                    'Conducted code reviews, regression testing, and manual QA to keep release quality high in a small, fast-moving team.',
                ]),
                'description_th' => json_encode([
                    'ออกแบบ สร้าง และดูแลเว็บแอปพลิเคชันระดับ Production มากกว่า 10 ระบบ สำหรับระบบนัดหมายคลินิกและจองท่องเที่ยว',
                    'รับผิดชอบการพัฒนา Full-Stack ตั้งแต่ต้นจนจบ: API ด้วย PHP Laravel และ .NET Core, Frontend ด้วย React + PrimeReact และ MySQL / SQL Server',
                    'พัฒนาระบบ Authentication ด้วย JWT, Role-based Access Control และ Environment Config สำหรับ Staging/Production',
                    'ปรับปรุง Query และ Refactor Legacy Module ลดเวลาโหลดหน้าและ Response Time ลงประมาณครึ่งหนึ่ง',
                    'นำทีมย้ายระบบ Laravel Blade แบบ Monolith ไปเป็น Decoupled Architecture (React SPA + Laravel REST API) รวมถึง Backend Refactoring และ Version Upgrade',
                    'ทำ Code Review, Regression Testing และ Manual QA เพื่อรักษาคุณภาพของ Release ในทีมขนาดเล็ก',
                ]),
                'tech'           => json_encode(['PHP Laravel', '.NET Core / C#', 'React', 'PrimeReact', 'MySQL', 'SQL Server', 'Docker', 'JWT']),
                'order'          => 1,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'company'        => 'A-Host Company Limited',
                'position_en'    => 'Developer Intern',
                'position_th'    => 'นักพัฒนาฝึกงาน',
                'period'         => 'Dec 2020 — Mar 2021',
                'started_at'     => '2020-12-01',
                'ended_at'       => '2021-03-31',
                'description_en' => json_encode([
                    'Built a responsive frontend in Vue.js integrated with .NET Core APIs backed by Microsoft SQL Server.',
                    'Implemented CRUD modules processing 1,000+ records per month, including form validation, list/detail views, and error handling.',
                    'Collaborated with senior engineers in code reviews and gained exposure to enterprise-grade .NET workflows.',
                ]),
                'description_th' => json_encode([
                    'พัฒนา Frontend ด้วย Vue.js เชื่อมต่อกับ .NET Core API และ Microsoft SQL Server',
                    'สร้าง CRUD Module ที่จัดการข้อมูลมากกว่า 1,000 รายการต่อเดือน รวมถึง Form Validation, List/Detail View และ Error Handling',
                    'ร่วม Code Review กับวิศวกรอาวุโสและเรียนรู้ .NET Workflow ระดับ Enterprise',
                ]),
                'tech'           => json_encode(['Vue.js', '.NET Core', 'SQL Server']),
                'order'          => 2,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}
