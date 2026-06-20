<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'nickname', 'job_title_en', 'job_title_th',
        'bio_en', 'bio_th', 'about_en', 'about_th',
        'profile_image', 'years_of_experience', 'date_of_birth',
        'location_en', 'location_th', 'available_for_hire',
        'email', 'phone', 'line_id', 'whatsapp',
        'github_url', 'linkedin_url', 'facebook_url', 'twitter_url',
        'instagram_url', 'youtube_url', 'website_url',
        'resume_url', 'resume_label_en', 'resume_label_th',
        'meta_title_en', 'meta_title_th',
        'meta_description_en', 'meta_description_th', 'og_image',
    ];

    protected $casts = [
        'available_for_hire'  => 'boolean',
        'years_of_experience' => 'integer',
        'date_of_birth'       => 'date',
    ];

    public static function current(): self
    {
        return static::firstOrFail();
    }
}
