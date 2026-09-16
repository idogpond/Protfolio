<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LanguageResource;
use App\Models\Language;
use Illuminate\Support\Facades\Cache;

class LanguageController extends Controller
{
    public function index()
    {
        $languages = Cache::remember('public.languages', now()->addHour(), fn () => Language::ordered()->get());

        return LanguageResource::collection($languages);
    }
}
