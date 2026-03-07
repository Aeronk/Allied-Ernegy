<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'subtitle', 'description', 'image_url', 'image_path',
        'cta_primary_text', 'cta_primary_url',
        'cta_secondary_text', 'cta_secondary_url',
        'order', 'is_active',
    ];

    protected $appends = ['image'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }

    public function getImageAttribute(): string
    {
        return $this->image_path
            ? asset('storage/' . $this->image_path)
            : ($this->image_url ?? '');
    }
}
