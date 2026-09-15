<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;

class ProjectController extends Controller
{
    /**
     * GET /api/projects
     * รองรับ query: ?featured=1
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $projects = Cache::remember('public.projects', now()->addHour(), fn () => Project::ordered()->get());

        if ($request->boolean('featured')) {
            $projects = $projects->where('is_featured', true)->values();
        }

        return ProjectResource::collection($projects);
    }

    /**
     * GET /api/projects/{id}
     */
    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }
}
