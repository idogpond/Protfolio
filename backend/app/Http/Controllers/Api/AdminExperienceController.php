<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminExperienceController extends Controller
{
    public function index() { return ExperienceResource::collection(Experience::ordered()->get()); }

    public function show(Experience $experience) { return new ExperienceResource($experience); }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request);
        $exp  = Experience::create($data);
        return response()->json(['message' => 'Created', 'data' => new ExperienceResource($exp)], 201);
    }

    public function update(Request $request, Experience $experience): JsonResponse
    {
        $experience->update($this->validated($request));
        return response()->json(['message' => 'Updated', 'data' => new ExperienceResource($experience->fresh())]);
    }

    public function destroy(Experience $experience): JsonResponse
    {
        $experience->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'company'          => ['required', 'string', 'max:255'],
            'position_en'      => ['required', 'string', 'max:255'],
            'position_th'      => ['nullable', 'string', 'max:255'],
            'period'           => ['required', 'string', 'max:50'],
            'started_at'       => ['nullable', 'date'],
            'ended_at'         => ['nullable', 'date'],
            'description_en'   => ['required', 'array'],
            'description_en.*' => ['string'],
            'description_th'   => ['nullable', 'array'],
            'description_th.*' => ['string'],
            'tech'             => ['nullable', 'array'],
            'tech.*'           => ['string', 'max:100'],
            'order'            => ['integer', 'min:0'],
        ]);
    }
}
