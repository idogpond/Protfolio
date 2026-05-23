<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfileSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminProfileController extends Controller
{
    /**
     * GET /api/admin/profile
     */
    public function show(): JsonResponse
    {
        return response()->json(ProfileSetting::toMap());
    }

    /**
     * POST /api/admin/profile
     * Bulk update — รับ { key: value, ... } บันทึกทีเดียว
     */
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'                => ['nullable', 'string', 'max:255'],
            'nickname'            => ['nullable', 'string', 'max:100'],
            'job_title'           => ['nullable', 'string', 'max:255'],
            'bio'                 => ['nullable', 'string'],
            'about_me'            => ['nullable', 'string'],
            'profile_image'       => ['nullable', 'string', 'max:500'],
            'years_of_experience' => ['nullable', 'string', 'max:10'],
            'date_of_birth'       => ['nullable', 'string', 'max:20'],
            'location'            => ['nullable', 'string', 'max:255'],
            'available_for_hire'  => ['nullable'],
            'email'               => ['nullable', 'email', 'max:255'],
            'phone'               => ['nullable', 'string', 'max:50'],
            'line_id'             => ['nullable', 'string', 'max:100'],
            'whatsapp'            => ['nullable', 'string', 'max:50'],
            'github_url'          => ['nullable', 'string', 'max:500'],
            'linkedin_url'        => ['nullable', 'string', 'max:500'],
            'facebook_url'        => ['nullable', 'string', 'max:500'],
            'twitter_url'         => ['nullable', 'string', 'max:500'],
            'instagram_url'       => ['nullable', 'string', 'max:500'],
            'youtube_url'         => ['nullable', 'string', 'max:500'],
            'website_url'         => ['nullable', 'string', 'max:500'],
            'resume_url'          => ['nullable', 'string', 'max:500'],
            'resume_label'        => ['nullable', 'string', 'max:100'],
            'meta_title'          => ['nullable', 'string', 'max:255'],
            'meta_description'    => ['nullable', 'string', 'max:500'],
            'og_image'            => ['nullable', 'string', 'max:500'],
        ]);

        ProfileSetting::bulkSet($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data'    => ProfileSetting::toMap(),
        ]);
    }
}
