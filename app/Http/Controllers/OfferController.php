<?php
namespace App\Http\Controllers;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Offer', [
            'services' => Service::active()->get()->map(fn($s) => [
                'id' => $s->id, 'slug' => $s->slug, 'name' => $s->title,
                'description' => $s->description, 'icon' => $s->icon, 'image_url' => $s->image,
            ]),
        ]);
    }

    public function show($slug): Response
    {
        $service = Service::where('slug', $slug)->firstOrFail();
        
        return Inertia::render('Service/Show', [
            'service' => [
                'id' => $service->id,
                'slug' => $service->slug,
                'name' => $service->title,
                'description' => $service->description,
                'icon' => $service->icon,
                'image_url' => $service->image,
            ],
            // optionally pass other related services for a 'More Technologies' block
            'other_services' => Service::active()->where('id', '!=', $service->id)->get()->map(fn($s) => [
                'slug' => $s->slug, 'name' => $s->title, 'icon' => $s->icon
            ]),
        ]);
    }
}
