<?php
namespace App\Http\Controllers;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects', [
            'projects' => Project::active()->get()->map(fn($p) => [
                'id' => $p->id, 'title' => $p->title, 'location' => $p->location,
                'description' => $p->description, 'image_url' => $p->image, 'status' => $p->status,
                'capacity' => $p->capacity ?? '',
            ]),
        ]);
    }
}
