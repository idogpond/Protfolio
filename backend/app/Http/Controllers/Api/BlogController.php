<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BlogController extends Controller
{
    /**
     * GET /api/blogs
     * ดึงเฉพาะที่ published แล้ว เรียงล่าสุดก่อน
     */
    public function index(): AnonymousResourceCollection
    {
        $blogs = Blog::published()->latest()->get();

        return BlogResource::collection($blogs);
    }

    /**
     * GET /api/blogs/{slug}
     */
    public function show(string $slug): JsonResponse
    {
        $blog = Blog::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'data' => new BlogResource($blog),
        ]);
    }
}
