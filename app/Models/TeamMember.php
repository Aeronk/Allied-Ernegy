<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'role', 'bio', 'image_url', 'image_path',
        'linkedin_url', 'email', 'order', 'is_active',
    ];

    protected $appends = ['image'];

    protected $casts = ['is_active' => 'boolean', 'order' => 'integer'];

    public function scopeActive($query) { return $query->where('is_active', true)->orderBy('order'); }

    public function getImageAttribute(): string {
        return $this->image_path ? asset('storage/' . $this->image_path) : ($this->image_url ?? '');
    }
}
