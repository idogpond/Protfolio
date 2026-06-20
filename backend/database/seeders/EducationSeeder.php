<?php
namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        Education::firstOrCreate([], [
            'degree_en'    => 'Bachelor of Science',
            'degree_th'    => 'วิทยาศาสตรบัณฑิต',
            'field_en'     => 'Information Technology',
            'field_th'     => 'เทคโนโลยีสารสนเทศ',
            'institution'  => 'FILL_FROM_CV',
            'started_at'   => 2018,
            'graduated_at' => 2022,
            'gpa'          => null,
            'order'        => 1,
        ]);
    }
}
