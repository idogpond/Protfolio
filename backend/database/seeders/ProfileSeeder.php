<?php
namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        Profile::firstOrCreate([], [
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
        ]);
    }
}
