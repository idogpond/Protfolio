<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'name_en'         => $this->name_en,
            'name_th'         => $this->name_th,
            'proficiency_en'  => $this->proficiency_en,
            'proficiency_th'  => $this->proficiency_th,
            'order'           => $this->order,
        ];
    }
}
