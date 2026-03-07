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
            'homeTestimonials' => \App\Models\Testimonial::where('is_active', true)->orderBy('order')->get()->map(fn($t) => [
                'quote' => $t->quote,
                'author' => $t->name,
                'role' => $t->role,
                'image' => $t->image_url,
            ]),
            'homeFaqs' => json_decode(ContentSetting::get('home_faqs', '[]'), true),
            'homeGlobal' => json_decode(ContentSetting::get('home_global', '[]'), true),
            // New dynamic sections
            'pioneeringTitle' => ContentSetting::get('home_pioneering_title', 'Pioneering the Future of Clean Power'),
            'pioneeringText1' => ContentSetting::get('home_pioneering_text1', 'Allied Energies Ltd is dedicated to unlocking the immense power of ocean waves to produce clean, sustainable electricity for homes, industries, and hydrogen production.'),
            'pioneeringText2' => ContentSetting::get('home_pioneering_text2', 'By harnessing cutting-edge marine energy technologies, we are building a more resilient and sustainable energy landscape, ensuring a greener future for generations to come.'),
            'pioneeringImage' => ContentSetting::get('home_pioneering_image') 
                ? asset('storage/' . ContentSetting::get('home_pioneering_image')) 
                : 'https://images.unsplash.com/photo-1466611653911-954ff21b6748?auto=format&fit=crop&q=80&w=1000',
            'impactTitle' => ContentSetting::get('home_impact_title', 'Our Environmental Impact'),
            'impactDesc' => ContentSetting::get('home_impact_desc', "We don't just generate power; we protect our planet. Our wave energy solutions are designed to be completely eco-friendly, ensuring that we preserve marine ecosystems while providing the energy the world needs."),
            'impactBullets' => json_decode(ContentSetting::get('home_impact_bullets', '["Zero noise pollution for marine life", "No visual impact on coastal horizons", "Scalable solutions for remote coastal communities", "Reinforcing energy security through diversification"]'), true),
        ]);
    }
}
