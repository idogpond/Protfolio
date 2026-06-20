<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminProfileController extends Controller
{
    public function show(): ProfileResource
    {
        return new ProfileResource(Profile::current());
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'                => ['required', 'string', 'max:255'],
            'nickname'            => ['nullable', 'string', 'max:100'],
            'job_title_en'        => ['required', 'string', 'max:255'],
            'job_title_th'        => ['nullable', 'string', 'max:255'],
            'bio_en'              => ['required', 'string'],
            'bio_th'              => ['nullable', 'string'],
            'about_en'            => ['nullable', 'string'],
            'about_th'            => ['nullable', 'string'],
            'profile_image'       => ['nullable', 'string', 'max:500'],
            'years_of_experience' => ['nullable', 'integer', 'min:0', 'max:50'],
            'date_of_birth'       => ['nullable', 'date'],
            'location_en'         => ['nullable', 'string', 'max:255'],
            'location_th'         => ['nullable', 'string', 'max:255'],
            'available_for_hire'  => ['boolean'],
            'email'               => ['nullable', 'email', 'max:255'],
            'phone'               => ['nullable', 'string', 'max:50'],
            'line_id'             => ['nullable', 'string', 'max:100'],
            'whatsapp'            => ['nullable', 'string', 'max:50'],
            'github_url'          => ['nullable', 'url', 'max:500'],
            'linkedin_url'        => ['nullable', 'url', 'max:500'],
            'facebook_url'        => ['nullable', 'string', 'max:500'],
            'twitter_url'         => ['nullable', 'string', 'max:500'],
            'instagram_url'       => ['nullable', 'string', 'max:500'],
            'youtube_url'         => ['nullable', 'string', 'max:500'],
            'website_url'         => ['nullable', 'string', 'max:500'],
            'resume_url'          => ['nullable', 'string', 'max:500'],
            'resume_label_en'     => ['nullable', 'string', 'max:100'],
            'resume_label_th'     => ['nullable', 'string', 'max:100'],
            'meta_title_en'       => ['nullable', 'string', 'max:255'],
            'meta_title_th'       => ['nullable', 'string', 'max:255'],
            'meta_description_en' => ['nullable', 'string', 'max:500'],
            'meta_description_th' => ['nullable', 'string', 'max:500'],
            'og_image'            => ['nullable', 'string', 'max:500'],
        ]);

        $profile = Profile::current();
        $profile->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data'    => new ProfileResource($profile->fresh()),
        ]);
    }
}
