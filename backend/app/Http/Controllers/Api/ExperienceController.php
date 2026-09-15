<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use Illuminate\Support\Facades\Cache;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Cache::remember('public.experiences', now()->addHour(), fn () => Experience::ordered()->get());

        return ExperienceResource::collection($experiences);
    }
}
