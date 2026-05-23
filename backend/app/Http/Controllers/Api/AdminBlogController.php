<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Str;

class AdminBlogController extends Controller
{
    /**
     * GET /api/admin/blogs
     * ดึงทั้งหมด ไม่ว่าจะ published หรือไม่
     */
    public function index(): AnonymousResourceCollection
    {
        return BlogResource::collection(
            Blog::orderByDesc('created_at')->get()
        );
    }

    /**
     * GET /api/admin/blogs/{blog}
     */
    public function show(Blog $blog): BlogResource
    {
        return new BlogResource($blog);
    }

    /**
     * POST /api/admin/blogs
     */
    public function store(StoreBlogRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);

        // Auto-set published_at when publishing
        if (! empty($data['is_published']) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $blog = Blog::create($data);

        return response()->json([
            'message' => 'Blog created successfully',
            'data'    => new BlogResource($blog),
        ], 201);
    }

    /**
     * PUT /api/admin/blogs/{blog}
     */
    public function update(StoreBlogRequest $request, Blog $blog): JsonResponse
    {
        $data = $request->validated();

        if (! empty($data['is_published']) && empty($blog->published_at) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $blog->update($data);

        return response()->json([
            'message' => 'Blog updated successfully',
            'data'    => new BlogResource($blog->fresh()),
        ]);
    }

    /**
     * DELETE /api/admin/blogs/{blog}
     */
    public function destroy(Blog $blog): JsonResponse
    {
        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully']);
    }
}
