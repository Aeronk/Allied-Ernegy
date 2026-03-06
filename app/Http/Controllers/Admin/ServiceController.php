<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Services/Index', [
            'items' => Service::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Services/Form', ['item' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('services', 'public');
        }
        Service::create($data);
        return redirect()->route('admin.services.index')->with('success', 'Service created.');
    }

    public function edit(Service $model): Response
    {
        return Inertia::render('Admin/Services/Form', [
            'item' => array_merge($model->toArray(), ['image' => $model->image]),
        ]);
    }

    public function update(Request $request, Service $model): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            if ($model->image_path) Storage::disk('public')->delete($model->image_path);
            $data['image_path'] = $request->file('image')->store('services', 'public');
        }
        $model->update($data);
        return redirect()->route('admin.services.index')->with('success', 'Service updated.');
    }

    public function destroy(Service $model): RedirectResponse
    {
        if ($model->image_path) Storage::disk('public')->delete($model->image_path);
        $model->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service deleted.');
    }
}
