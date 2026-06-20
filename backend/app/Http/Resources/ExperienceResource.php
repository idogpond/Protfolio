<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'company'        => $this->company,
            'position_en'    => $this->position_en,
            'position_th'    => $this->position_th,
            'period'         => $this->period,
            'started_at'     => $this->started_at?->toDateString(),
            'ended_at'       => $this->ended_at?->toDateString(),
            'description_en' => $this->description_en ?? [],
            'description_th' => $this->description_th ?? [],
            'tech'           => $this->tech ?? [],
            'order'          => $this->order,
        ];
    }
}
