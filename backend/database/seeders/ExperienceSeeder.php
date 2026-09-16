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
                'period_en'      => 'Oct 2022 — Present',
                'period_th'      => 'ต.ค. 2022 — ปัจจุบัน',
                'started_at'     => '2022-10-01',
                'ended_at'       => null,
                'description_en' => json_encode([
                    'Build and maintain 12 web apps for clinic-appointment and travel-booking systems, handling everything from database design up to the UI.',
                    'Migrated a large legacy Laravel Blade app to React solo: evaluated React libraries/packages, then split the old Blade controllers into a standalone API server for the frontend to consume.',
                    "Cut a slow report page's load time from ~30s to ~10s by consolidating 2–3 duplicate queries into one, on a 50-row-per-page table pulling from 10,000+ records.",
                    'Set up JWT authentication and role-based permissions so different staff roles only see what they should.',
                    "Do code reviews and manual/regression testing before releases. It's a small team, so this is what catches most issues before they reach a client.",
                ]),
                'description_th' => json_encode([
                    'สร้างและดูแลเว็บแอป 12 ระบบ สำหรับระบบนัดหมายคลินิกและจองท่องเที่ยว ดูแลตั้งแต่ออกแบบฐานข้อมูลไปจนถึง UI',
                    'ย้ายระบบ Laravel Blade เก่าไปเป็น React คนเดียว: ประเมินไลบรารี/แพ็กเกจ React แล้วแยก Blade controller เดิมออกมาเป็น API server แยกต่างหากให้ frontend เรียกใช้',
                    'ลดเวลาโหลดหน้ารายงานจาก ~30 วินาที เหลือ ~10 วินาที ด้วยการรวม query ที่ซ้ำกัน 2-3 ตัวเป็นตัวเดียว บนตารางที่แสดง 50 แถวต่อหน้าจากข้อมูลกว่า 10,000 รายการ',
                    'ตั้งค่า JWT authentication และสิทธิ์ตาม role ให้พนักงานแต่ละตำแหน่งเห็นเฉพาะส่วนที่ควรเห็น',
                    'ทำ code review และ manual/regression testing ก่อนปล่อยรุ่นใหม่ เป็นทีมเล็ก จุดนี้เลยเป็นตัวจับปัญหาส่วนใหญ่ก่อนถึงมือลูกค้า',
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
                'period_en'      => 'Dec 2020 — Mar 2021',
                'period_th'      => 'ธ.ค. 2020 — มี.ค. 2021',
                'started_at'     => '2020-12-01',
                'ended_at'       => '2021-03-31',
                'description_en' => json_encode([
                    'Developed the frontend in Vue.js for an internal system, wired up to .NET Core APIs and a SQL Server database.',
                    'Built out the CRUD screens (forms, list/detail views, error handling) for a system handling 1,000+ records a month.',
                    'First real exposure to enterprise .NET practices, mostly through code reviews with senior engineers.',
                ]),
                'description_th' => json_encode([
                    'พัฒนา Frontend ด้วย Vue.js สำหรับระบบภายใน เชื่อมกับ .NET Core API และฐานข้อมูล SQL Server',
                    'สร้างหน้าจอ CRUD (ฟอร์ม, list/detail view, error handling) สำหรับระบบที่จัดการข้อมูลกว่า 1,000 รายการต่อเดือน',
                    'ได้สัมผัสแนวทางการทำงานแบบ Enterprise .NET จริงเป็นครั้งแรก ส่วนใหญ่ผ่านการทำ code review กับวิศวกรอาวุโส',
                ]),
                'tech'           => json_encode(['Vue.js', '.NET Core', 'SQL Server']),
                'order'          => 2,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}
