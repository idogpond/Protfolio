<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class ProfileSetting extends Model
{
    protected $fillable = ['key', 'value'];

    // ─── Static helpers ──────────────────────────────────────────────────────

    /**
     * ดึงค่า setting เดี่ยว
     * ProfileSetting::get('name')
     * ProfileSetting::get('available_for_hire', false)
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $value = static::where('key', $key)->value('value');

        if ($value === null) {
            return $default;
        }

        // Auto-cast booleans stored as string
        if ($value === 'true')  return true;
        if ($value === 'false') return false;

        return $value;
    }

    /**
     * บันทึกค่า setting เดี่ยว
     * ProfileSetting::set('name', 'John Doe')
     */
    public static function set(string $key, mixed $value): void
    {
        if (is_bool($value)) {
            $value = $value ? 'true' : 'false';
        }

        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    /**
     * ดึงทุก settings เป็น associative array
     */
    public static function toMap(): array
    {
        return static::query()->get()->pluck('value', 'key')->map(function ($value) {
            if ($value === 'true')  return true;
            if ($value === 'false') return false;
            return $value;
        })->toArray();
    }

    /**
     * Bulk update หลาย keys พร้อมกัน
     * ProfileSetting::bulkSet(['name' => 'John', 'email' => 'john@example.com'])
     */
    public static function bulkSet(array $data): void
    {
        foreach ($data as $key => $value) {
            static::set($key, $value ?? '');
        }
    }
}
