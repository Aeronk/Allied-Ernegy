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
                'description' => $s->description, 'icon_url' => $s->icon ?? ($s->image_url ?? ''), 'image_url' => $s->image,
            ]),
        ]);
    }
}
