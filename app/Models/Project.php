<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'location', 'description', 'full_description',
        'image_url', 'image_path', 'status', 'capacity',
        'order', 'is_active', 'is_featured',
    ];

    protected $casts = ['is_active' => 'boolean', 'is_featured' => 'boolean', 'order' => 'integer'];

    public function scopeActive($query) { return $query->where('is_active', true)->orderBy('order'); }

    public function getImageAttribute(): string {
        return $this->image_path ? asset('storage/' . $this->image_path) : ($this->image_url ?? '');
    }
}
