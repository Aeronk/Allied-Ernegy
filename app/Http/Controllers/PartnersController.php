<?php
namespace App\Http\Controllers;
use App\Models\Partner;
use Inertia\Inertia;
use Inertia\Response;

class PartnersController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Partners', [
            'partners' => Partner::active()->get()->map(fn($p) => [
                'id' => $p->id, 'name' => $p->name, 'description' => $p->description,
                'website_url' => $p->url, 'logo_url' => $p->logo_path ? asset('storage/' . $p->logo_path) : ($p->image_url ?? ''),
            ]),
        ]);
    }
}
