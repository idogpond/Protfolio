<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'tech_stack'  => $this->tech_stack ?? [],
            'github_url'  => $this->github_url,
            'demo_url'    => $this->demo_url,
            'image_url'   => $this->image_url,
            'is_featured' => $this->is_featured,
            'order'       => $this->order,
            'created_at'  => $this->created_at?->toISOString(),
            'updated_at'  => $this->updated_at?->toISOString(),
        ];
    }
}
