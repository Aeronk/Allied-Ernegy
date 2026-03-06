<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use App\Models\Service;
use App\Models\Partner;
use App\Models\Project;
use App\Models\BlogPost;
use App\Models\SiteSetting;
use App\Models\ContentSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'heroSlides' => HeroSlide::active()->get()->map(fn($s) => [
                'id' => $s->id,
                'title' => $s->title,
                'subtitle' => $s->subtitle,
                'description' => $s->description ?? '',
                'image_url' => $s->image,
                'cta_primary_text' => $s->cta_primary_text,
                'cta_primary_url' => $s->cta_primary_url,
                'cta_secondary_text' => $s->cta_secondary_text,
                'cta_secondary_url' => $s->cta_secondary_url,
            ]),
            'services' => Service::active()->take(3)->get()->map(fn($s) => [
                'id' => $s->id, 'slug' => $s->slug, 'name' => $s->title,
                'description' => $s->description, 'icon_url' => $s->icon ?? ($s->image_url ?? ''), 'image_url' => $s->image,
            ]),
            'partners' => Partner::active()->get()->map(fn($p) => [
                'id' => $p->id, 'name' => $p->name, 'url' => $p->url, 'logo_url' => $p->logo_path ? asset('storage/' . $p->logo_path) : ($p->image_url ?? ''),
            ]),
            'projects' => Project::active()->where('is_featured', true)->take(2)->get()->map(fn($p) => [
                'id' => $p->id, 'title' => $p->title, 'location' => $p->location,
                'description' => $p->description, 'image_url' => $p->image, 'status' => $p->status,
                'capacity' => $p->capacity ?? '',
            ]),
            'blogPosts' => BlogPost::published()->take(3)->get()->map(fn($b) => [
                'id' => $b->id, 'title' => $b->title, 'slug' => $b->slug,
                'excerpt' => $b->excerpt, 'image_url' => $b->image, 'category' => $b->category,
                'author' => $b->author, 'published_at' => $b->published_at ? $b->published_at->format('M j, Y') : null,
                'formatted_date' => $b->formatted_date ?? ($b->published_at ? $b->published_at->diffForHumans() : null),
            ]),
            'homeStats' => json_decode(ContentSetting::get('home_stats', '[]'), true),
            'homeProcess' => json_decode(ContentSetting::get('home_process', '[]'), true),
            'homeImpact' => json_decode(ContentSetting::get('home_impact', '[]'), true),
            'homeTestimonials' => json_decode(ContentSetting::get('home_testimonials', '[]'), true),
            'homeFaqs' => json_decode(ContentSetting::get('home_faqs', '[]'), true),
            'homeGlobal' => json_decode(ContentSetting::get('home_global', '[]'), true),
        ]);
    }
}
