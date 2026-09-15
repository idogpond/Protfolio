<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use Illuminate\Support\Facades\Cache;

class EducationController extends Controller
{
    public function index()
    {
        $educations = Cache::remember('public.educations', now()->addHour(), fn () => Education::ordered()->get());

        return EducationResource::collection($educations);
    }
}
