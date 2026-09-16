<?php
namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        Language::insert([
            [
                'name_en'        => 'Thai',
                'name_th'        => 'ไทย',
                'proficiency_en' => 'Native',
                'proficiency_th' => 'เจ้าของภาษา',
                'order'          => 1,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'name_en'        => 'English',
                'name_th'        => 'อังกฤษ',
                'proficiency_en' => 'Reading, Writing & Listening — Working Proficiency; Speaking — Basic',
                'proficiency_th' => 'อ่าน เขียน ฟัง — ใช้งานได้ดี; พูด — พื้นฐาน',
                'order'          => 2,
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}
