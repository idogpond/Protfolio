<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Education extends Model
{
    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('public.educations'));
        static::deleted(fn () => Cache::forget('public.educations'));
    }

    protected $table = 'educations';

    protected $fillable = [
        'degree_en', 'degree_th', 'field_en', 'field_th',
        'institution_en', 'institution_th', 'started_at', 'graduated_at', 'gpa', 'order',
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
