<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LanguageResource;
use App\Models\Language;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminLanguageController extends Controller
{
    public function index() { return LanguageResource::collection(Language::ordered()->get()); }

    public function show(Language $language) { return new LanguageResource($language); }

    public function store(Request $request): JsonResponse
    {
        $language = Language::create($this->validated($request));
        return response()->json(['message' => 'Created', 'data' => new LanguageResource($language)], 201);
    }

    public function update(Request $request, Language $language): JsonResponse
    {
        $language->update($this->validated($request));
        return response()->json(['message' => 'Updated', 'data' => new LanguageResource($language->fresh())]);
    }

    public function destroy(Language $language): JsonResponse
    {
        $language->delete();
        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name_en'        => ['required', 'string', 'max:100'],
            'name_th'        => ['nullable', 'string', 'max:100'],
            'proficiency_en' => ['required', 'string', 'max:255'],
            'proficiency_th' => ['nullable', 'string', 'max:255'],
            'order'          => ['integer', 'min:0'],
        ]);
    }
}
