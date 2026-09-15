<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProfileController extends Controller
{
    public function show(): ProfileResource
    {
        $profile = Cache::remember('public.profile', now()->addHour(), fn () => Profile::current());

        return new ProfileResource($profile);
    }
}
