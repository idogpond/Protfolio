<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminProjectController extends Controller
{
    /**
     * GET /api/admin/projects
     */
    public function index(): AnonymousResourceCollection
    {
        return ProjectResource::collection(
            Project::ordered()->get()
        );
    }

    /**
     * GET /api/admin/projects/{project}
     */
    public function show(Project $project): ProjectResource
    {
        return new ProjectResource($project);
    }

    /**
     * POST /api/admin/projects
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = Project::create($request->validated());

        return response()->json([
            'message' => 'Project created successfully',
            'data'    => new ProjectResource($project),
        ], 201);
    }

    /**
     * PUT /api/admin/projects/{project}
     */
    public function update(StoreProjectRequest $request, Project $project): JsonResponse
    {
        $project->update($request->validated());

        return response()->json([
            'message' => 'Project updated successfully',
            'data'    => new ProjectResource($project->fresh()),
        ]);
    }

    /**
     * DELETE /api/admin/projects/{project}
     */
    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
