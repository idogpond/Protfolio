<?php
namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        Profile::firstOrCreate([], [
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
        ]);
    }
}
