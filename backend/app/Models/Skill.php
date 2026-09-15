<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Skill extends Model
{
    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('public.skills'));
        static::deleted(fn () => Cache::forget('public.skills'));
    }

    protected $fillable = ['name', 'icon', 'level', 'category', 'order'];

    protected $casts = [
        'level' => 'integer',
        'order' => 'integer',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('category')->orderBy('order');
    }
}
