<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'image_url', 'image_path',
        'category', 'author', 'published_at', 'is_published', 'is_featured', 'order',
    ];

    protected $appends = ['image'];

    protected $casts = [
        'is_published' => 'boolean',
        'is_featured' => 'boolean',
        'published_at' => 'date',
        'order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->orderBy('published_at', 'desc');
    }

    public function getImageAttribute(): string {
        return $this->image_path ? asset('storage/' . $this->image_path) : ($this->image_url ?? '');
    }

    public function getFormattedDateAttribute(): string
    {
        return $this->published_at ? $this->published_at->format('F d, Y') : '';
    }
}
