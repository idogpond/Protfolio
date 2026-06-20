<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company', 'position_en', 'position_th', 'period',
        'started_at', 'ended_at',
        'description_en', 'description_th', 'tech', 'order',
    ];

    protected $casts = [
        'description_en' => 'array',
        'description_th' => 'array',
        'tech'           => 'array',
        'started_at'     => 'date',
        'ended_at'       => 'date',
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('started_at');
    }
}
