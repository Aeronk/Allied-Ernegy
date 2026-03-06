<?php
// ══════════════════════════════════════════════════════════════
// app/Models/HeroSlide.php
// ══════════════════════════════════════════════════════════════
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class HeroSlide extends Model
{
    protected $fillable = [
        'title', 'subtitle', 'image', 'image_url',
        'cta_label', 'cta_url', 'secondary_cta_label', 'secondary_cta_url',
        'sort_order', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean'];

    // Scopes
    public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }
    public function scopeOrdered(Builder $q): Builder { return $q->orderBy('sort_order'); }

    // Accessors
    public function getImageSrcAttribute(): ?string
    {
        if ($this->image) return Storage::url($this->image);
        return $this->image_url;
    }
}

// ══════════════════════════════════════════════════════════════
// app/Models/Service.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class Service extends Model
// {
//     protected $fillable = [
//         'slug', 'title', 'description', 'icon', 'image', 'image_url',
//         'sort_order', 'is_active',
//     ];
//     protected $casts = ['is_active' => 'boolean'];
//
//     public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }
//     public function scopeOrdered(Builder $q): Builder { return $q->orderBy('sort_order'); }
//     public function getImageSrcAttribute(): ?string
//     {
//         if ($this->image) return Storage::url($this->image);
//         return $this->image_url;
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/Partner.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class Partner extends Model
// {
//     protected $fillable = [
//         'name', 'description', 'website_url', 'logo', 'logo_url', 'image',
//         'sort_order', 'is_active',
//     ];
//     protected $casts = ['is_active' => 'boolean'];
//
//     public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }
//     public function getLogoSrcAttribute(): ?string
//     {
//         if ($this->logo) return Storage::url($this->logo);
//         return $this->logo_url;
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/Project.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class Project extends Model
// {
//     protected $fillable = [
//         'title', 'slug', 'location', 'description', 'body',
//         'image', 'image_url', 'status', 'capacity_mw', 'year',
//         'is_featured', 'is_active', 'sort_order',
//     ];
//     protected $casts = ['is_active' => 'boolean', 'is_featured' => 'boolean'];
//
//     public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }
//     public function scopeFeatured(Builder $q): Builder { return $q->where('is_featured', true); }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/TeamMember.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class TeamMember extends Model
// {
//     protected $fillable = [
//         'name', 'role', 'bio', 'photo', 'photo_url',
//         'linkedin_url', 'twitter_url', 'email',
//         'sort_order', 'is_active',
//     ];
//     protected $casts = ['is_active' => 'boolean'];
//
//     public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }
//     public function scopeOrdered(Builder $q): Builder { return $q->orderBy('sort_order'); }
//     public function getPhotoSrcAttribute(): ?string
//     {
//         if ($this->photo) return Storage::url($this->photo);
//         return $this->photo_url;
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/FaqItem.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class FaqItem extends Model
// {
//     protected $fillable = ['question', 'answer', 'category', 'sort_order', 'is_active'];
//     protected $casts = ['is_active' => 'boolean'];
//
//     public function scopeActive(Builder $q): Builder { return $q->where('is_active', true); }
//     public function scopeOrdered(Builder $q): Builder { return $q->orderBy('sort_order'); }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/BlogPost.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// use Illuminate\Database\Eloquent\Casts\Attribute;
// class BlogPost extends Model
// {
//     protected $fillable = [
//         'title', 'slug', 'excerpt', 'content', 'cover_image', 'cover_image_url',
//         'author', 'category', 'tags', 'published_at',
//         'is_published', 'is_featured', 'read_time', 'views',
//         'meta_title', 'meta_description',
//     ];
//     protected $casts = [
//         'is_published' => 'boolean',
//         'is_featured'  => 'boolean',
//         'tags'         => 'array',
//         'published_at' => 'datetime',
//     ];
//
//     public function scopePublished(Builder $q): Builder
//     {
//         return $q->where('is_published', true)
//                  ->where('published_at', '<=', now());
//     }
//     public function scopeFeatured(Builder $q): Builder { return $q->where('is_featured', true); }
//     public function incrementViews(): void { $this->increment('views'); }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/Contact.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class Contact extends Model
// {
//     protected $fillable = [
//         'name', 'email', 'phone', 'subject', 'message', 'company',
//         'ip_address', 'is_read', 'read_at',
//     ];
//     protected $casts = ['is_read' => 'boolean', 'read_at' => 'datetime'];
//
//     public function scopeUnread(Builder $q): Builder { return $q->where('is_read', false); }
//     public function markAsRead(): void
//     {
//         $this->update(['is_read' => true, 'read_at' => now()]);
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Models/SiteSetting.php
// ══════════════════════════════════════════════════════════════
// namespace App\Models;
// class SiteSetting extends Model
// {
//     protected $fillable = ['key', 'value', 'type', 'group', 'label'];
//
//     public static function get(string $key, mixed $default = null): mixed
//     {
//         $setting = static::where('key', $key)->first();
//         if (!$setting) return $default;
//         return match($setting->type) {
//             'boolean' => (bool) $setting->value,
//             'json'    => json_decode($setting->value, true),
//             default   => $setting->value,
//         };
//     }
//
//     public static function set(string $key, mixed $value): void
//     {
//         static::updateOrCreate(['key' => $key], ['value' => is_array($value) ? json_encode($value) : $value]);
//     }
// }
