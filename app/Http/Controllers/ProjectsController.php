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

    public function show(Project $project): Response
    {
        return Inertia::render('Project/Show', [
            'project' => [
                'id' => $project->id, 
                'title' => $project->title, 
                'location' => $project->location,
                'description' => $project->description, 
                'full_description' => $project->full_description,
                'image_url' => $project->image, 
                'status' => $project->status,
                'capacity' => $project->capacity ?? '',
                'gallery_urls' => collect($project->gallery ?? [])->map(fn($path) => asset('storage/' . $path))->toArray(),
            ]
        ]);
    }
}
