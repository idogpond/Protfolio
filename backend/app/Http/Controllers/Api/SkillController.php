<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Support\Facades\Cache;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Cache::remember('public.skills', now()->addHour(), fn () => Skill::ordered()->get());

        return SkillResource::collection($skills);
    }
}
