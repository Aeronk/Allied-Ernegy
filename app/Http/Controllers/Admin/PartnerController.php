<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Partners/Index', [
            'items' => Partner::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Partners/Form', ['item' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('partners', 'public');
        }
        Partner::create($data);
        return redirect()->route('admin.partners.index')->with('success', 'Partner created.');
    }

    public function edit(Partner $partner): Response
    {
        return Inertia::render('Admin/Partners/Form', [
            'item' => array_merge($partner->toArray(), ['image' => $partner->image]),
        ]);
    }

    public function update(Request $request, Partner $partner): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            if ($partner->image_path) Storage::disk('public')->delete($partner->image_path);
            $data['image_path'] = $request->file('image')->store('partners', 'public');
        }
        $partner->update($data);
        return redirect()->route('admin.partners.index')->with('success', 'Partner updated.');
    }

    public function destroy(Partner $partner): RedirectResponse
    {
        if ($partner->image_path) Storage::disk('public')->delete($partner->image_path);
        $partner->delete();
        return redirect()->route('admin.partners.index')->with('success', 'Partner deleted.');
    }
}
