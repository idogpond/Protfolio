<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'name'                => $this->name,
            'nickname'            => $this->nickname,
            'job_title_en'        => $this->job_title_en,
            'job_title_th'        => $this->job_title_th,
            'bio_en'              => $this->bio_en,
            'bio_th'              => $this->bio_th,
            'about_en'            => $this->about_en,
            'about_th'            => $this->about_th,
            'profile_image'       => $this->profile_image,
            'years_of_experience' => $this->years_of_experience,
            'date_of_birth'       => $this->date_of_birth?->toDateString(),
            'location_en'         => $this->location_en,
            'location_th'         => $this->location_th,
            'available_for_hire'  => $this->available_for_hire,
            'email'               => $this->email,
            'phone'               => $this->phone,
            'line_id'             => $this->line_id,
            'whatsapp'            => $this->whatsapp,
            'github_url'          => $this->github_url,
            'linkedin_url'        => $this->linkedin_url,
            'facebook_url'        => $this->facebook_url,
            'twitter_url'         => $this->twitter_url,
            'instagram_url'       => $this->instagram_url,
            'youtube_url'         => $this->youtube_url,
            'website_url'         => $this->website_url,
            'resume_url'          => $this->resume_url,
            'resume_label_en'     => $this->resume_label_en,
            'resume_label_th'     => $this->resume_label_th,
            'meta_title_en'       => $this->meta_title_en,
            'meta_title_th'       => $this->meta_title_th,
            'meta_description_en' => $this->meta_description_en,
            'meta_description_th' => $this->meta_description_th,
            'og_image'            => $this->og_image,
        ];
    }
}
