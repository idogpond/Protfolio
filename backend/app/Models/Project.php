<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Project extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('public.projects'));
        static::deleted(fn () => Cache::forget('public.projects'));
    }

    protected $fillable = [
        'title',
        'title_th',
        'description',
        'description_th',
        'tech_stack',
        'github_url',
        'demo_url',
        'image_url',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'tech_stack'  => 'array',
        'is_featured' => 'boolean',
        'order'       => 'integer',
    ];

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderByDesc('created_at');
    }
}
