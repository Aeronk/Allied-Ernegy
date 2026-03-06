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
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('projects', 'public');
        }
        Project::create($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $model): Response
    {
        return Inertia::render('Admin/Projects/Form', [
            'item' => array_merge($model->toArray(), ['image' => $model->image]),
        ]);
    }

    public function update(Request $request, Project $model): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            if ($model->image_path) Storage::disk('public')->delete($model->image_path);
            $data['image_path'] = $request->file('image')->store('projects', 'public');
        }
        $model->update($data);
        return redirect()->route('admin.projects.index')->with('success', 'Project updated.');
    }

    public function destroy(Project $model): RedirectResponse
    {
        if ($model->image_path) Storage::disk('public')->delete($model->image_path);
        $model->delete();
        return redirect()->route('admin.projects.index')->with('success', 'Project deleted.');
    }
}
