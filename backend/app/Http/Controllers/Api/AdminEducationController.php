<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminEducationController extends Controller
{
    public function index() { return EducationResource::collection(Education::ordered()->get()); }

    public function show(Education $education) { return new EducationResource($education); }

    public function store(Request $request): JsonResponse
    {
        $edu = Education::create($this->validated($request));
        return response()->json(['message' => 'Created', 'data' => new EducationResource($edu)], 201);
    }

    public function update(Request $request, Education $education): JsonResponse
    {
        $education->update($this->validated($request));
        return response()->json(['message' => 'Updated', 'data' => new EducationResource($education->fresh())]);
    }

    public function destroy(Education $education): JsonResponse
    {
        $education->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'degree_en'    => ['required', 'string', 'max:255'],
            'degree_th'    => ['nullable', 'string', 'max:255'],
            'field_en'     => ['required', 'string', 'max:255'],
            'field_th'     => ['nullable', 'string', 'max:255'],
            'institution'  => ['required', 'string', 'max:255'],
            'started_at'   => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'graduated_at' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'gpa'          => ['nullable', 'numeric', 'min:0', 'max:4'],
            'order'        => ['integer', 'min:0'],
        ]);
    }
}
