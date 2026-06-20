<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'degree_en', 'degree_th', 'field_en', 'field_th',
        'institution', 'started_at', 'graduated_at', 'gpa', 'order',
    ];

    protected $casts = [
        'gpa'   => 'float',
        'order' => 'integer',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderByDesc('graduated_at');
    }
}
