<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'items' => Project::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Form', ['item' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->except(['image', 'gallery_images']);
        
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('projects', 'public');
        }

        $gallery = [];
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $file) {
                $gallery[] = $file->store('projects/gallery', 'public');
            }
        }
        $data['gallery'] = $gallery;

        Project::create($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'item' => array_merge($project->toArray(), [
                'image' => $project->image,
                'gallery_urls' => collect($project->gallery ?? [])->map(fn($path) => asset('storage/' . $path))->toArray(),
            ]),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $data = $request->except(['image', 'gallery_images', 'deleted_gallery_images']);
        
        if ($request->hasFile('image')) {
            if ($project->image_path) Storage::disk('public')->delete($project->image_path);
            $data['image_path'] = $request->file('image')->store('projects', 'public');
        }

        $currentGallery = $project->gallery ?? [];
        
        // Handle deletions (by path)
        if ($request->has('deleted_gallery_images')) {
            $deleted = $request->deleted_gallery_images;
            if (is_string($deleted)) {
                $deleted = json_decode($deleted, true) ?? [];
            }
            if (is_array($deleted)) {
                foreach ($deleted as $path) {
                    if (($key = array_search($path, $currentGallery)) !== false) {
                        Storage::disk('public')->delete($path);
                        unset($currentGallery[$key]);
                    }
                }
                $currentGallery = array_values($currentGallery); // Re-index
            }
        }

        // Handle additions
        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $file) {
                $currentGallery[] = $file->store('projects/gallery', 'public');
            }
        }
        
        $data['gallery'] = $currentGallery;

        $project->update($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->image_path) Storage::disk('public')->delete($project->image_path);
        
        if (is_array($project->gallery)) {
            foreach ($project->gallery as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $project->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }
}
