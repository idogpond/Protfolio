<?php

namespace Database\Seeders;

use App\Models\ProfileSetting;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            // ── Personal ────────────────────────────────────────────────────
            'name'                => 'Your Name',
            'nickname'            => 'Dev',
            'job_title'           => 'Full Stack Developer',
            'bio'                 => '3+ years crafting modern web applications with React, Laravel, and C# .NET Core. Passionate about clean code and great user experiences.',
            'about_me'            => "สวัสดีครับ! ผมเป็น Full Stack Developer ที่มีประสบการณ์กว่า 3 ปี ในการพัฒนา Web Application ทั้งฝั่ง Frontend และ Backend ตั้งแต่ออกแบบ UI จนถึง Deploy บน Production\n\nผมถนัด React / Next.js สำหรับ Frontend และ PHP Laravel กับ C# .NET Core สำหรับ Backend รวมถึงมีความรู้ด้าน Docker และ Database Design\n\nนอกจากนี้ยังชอบเรียนรู้เทคโนโลยีใหม่ๆ และให้ความสำคัญกับการเขียนโค้ดที่สะอาด อ่านง่าย และ Maintainable ในระยะยาว",
            'profile_image'       => '',
            'years_of_experience' => '3',
            'date_of_birth'       => '1998-01-01',
            'location'            => 'Bangkok, Thailand',
            'available_for_hire'  => 'true',

            // ── Contact ──────────────────────────────────────────────────────
            'email'               => 'your@email.com',
            'phone'               => '+66 8X-XXXX-XXXX',
            'line_id'             => 'your_line_id',
            'whatsapp'            => '',

            // ── Social Links ─────────────────────────────────────────────────
            'github_url'          => 'https://github.com/yourusername',
            'linkedin_url'        => 'https://linkedin.com/in/yourprofile',
            'facebook_url'        => '',
            'twitter_url'         => '',
            'instagram_url'       => '',
            'youtube_url'         => '',
            'website_url'         => '',

            // ── Resume ───────────────────────────────────────────────────────
            'resume_url'          => '/resume.pdf',
            'resume_label'        => 'Download CV',

            // ── SEO & Meta ───────────────────────────────────────────────────
            'meta_title'          => 'Your Name | Full Stack Web Developer',
            'meta_description'    => 'Full Stack Web Developer with 3+ years of experience in React, Laravel, and .NET Core. Available for new opportunities.',
            'og_image'            => '',
        ];

        foreach ($defaults as $key => $value) {
            ProfileSetting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
