<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfileSetting;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * GET /api/profile
     * Public — ดึงข้อมูลทั้งหมดเป็น key-value object
     */
    public function show(): JsonResponse
    {
        return response()->json(ProfileSetting::toMap());
    }
}
