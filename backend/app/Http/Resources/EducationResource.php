<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'degree_en'    => $this->degree_en,
            'degree_th'    => $this->degree_th,
            'field_en'     => $this->field_en,
            'field_th'     => $this->field_th,
            'institution_en' => $this->institution_en,
            'institution_th' => $this->institution_th,
            'started_at'   => $this->started_at,
            'graduated_at' => $this->graduated_at,
            'gpa'          => $this->gpa,
            'order'        => $this->order,
        ];
    }
}
