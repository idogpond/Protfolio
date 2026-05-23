<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isAdmin = str_starts_with($request->path(), 'api/admin');

        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'excerpt'      => $this->excerpt,
            'cover_image'  => $this->cover_image,
            'is_published' => $this->is_published,
            'published_at' => $this->published_at?->toISOString(),
            'created_at'   => $this->created_at?->toISOString(),
            'updated_at'   => $this->updated_at?->toISOString(),
            // content: ส่งเสมอสำหรับ admin, ส่งเฉพาะ single post สำหรับ public
            'content'      => $this->when(
                $isAdmin || $request->routeIs('blogs.show'),
                $this->content
            ),
        ];
    }
}
