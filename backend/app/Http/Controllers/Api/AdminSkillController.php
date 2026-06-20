<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminSkillController extends Controller
{
    public function index() { return SkillResource::collection(Skill::ordered()->get()); }

    public function show(Skill $skill) { return new SkillResource($skill); }

    public function store(Request $request): JsonResponse
    {
        $skill = Skill::create($this->validated($request));
        return response()->json(['message' => 'Created', 'data' => new SkillResource($skill)], 201);
    }

    public function update(Request $request, Skill $skill): JsonResponse
    {
        $skill->update($this->validated($request));
        return response()->json(['message' => 'Updated', 'data' => new SkillResource($skill->fresh())]);
    }

    public function destroy(Skill $skill): JsonResponse
    {
        $skill->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'icon'     => ['nullable', 'string', 'max:50'],
            'level'    => ['required', 'integer', 'min:0', 'max:100'],
            'category' => ['required', 'in:frontend,backend,devops,other'],
            'order'    => ['integer', 'min:0'],
        ]);
    }
}
