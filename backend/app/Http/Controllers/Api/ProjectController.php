<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    /**
     * GET /api/projects
     * รองรับ query: ?featured=1
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Project::ordered();

        if ($request->boolean('featured')) {
            $query->featured();
        }

        return ProjectResource::collection($query->get());
    }

    /**
     * GET /api/projects/{id}
     */
    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }
}
