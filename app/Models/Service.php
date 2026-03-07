<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'title', 'description', 'icon',
        'image_url', 'image_path', 'order', 'is_active',
    ];

    protected $appends = ['image'];

    protected $casts = ['is_active' => 'boolean', 'order' => 'integer'];

    public function scopeActive($query) { return $query->where('is_active', true)->orderBy('order'); }

    public function getImageAttribute(): string {
        return $this->image_path ? asset('storage/' . $this->image_path) : ($this->image_url ?? '');
    }
}
