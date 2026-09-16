<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Language extends Model
{
    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('public.languages'));
        static::deleted(fn () => Cache::forget('public.languages'));
    }

    protected $fillable = ['name_en', 'name_th', 'proficiency_en', 'proficiency_th', 'order'];

    protected $casts = [
        'order' => 'integer',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
