<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class HeroSlideController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/HeroSlides/Index', [
            'slides' => HeroSlide::orderBy('order')->get()->map(fn($s) => [
                'id' => $s->id, 'title' => $s->title, 'subtitle' => $s->subtitle,
                'image' => $s->image, 'order' => $s->order, 'is_active' => $s->is_active,
                'cta_primary_text' => $s->cta_primary_text, 'cta_primary_url' => $s->cta_primary_url,
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/HeroSlides/Form', ['slide' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'image_url' => 'nullable|url',
            'image' => 'nullable|image|max:5120',
            'cta_primary_text' => 'nullable|string|max:100',
            'cta_primary_url' => 'nullable|string|max:255',
            'cta_secondary_text' => 'nullable|string|max:100',
            'cta_secondary_url' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('hero-slides', 'public');
        }

        HeroSlide::create($data);
        return redirect()->route('admin.hero-slides.index')->with('success', 'Hero slide created.');
    }

    public function edit(HeroSlide $heroSlide): Response
    {
        return Inertia::render('Admin/HeroSlides/Form', [
            'slide' => array_merge($heroSlide->toArray(), ['image' => $heroSlide->image]),
        ]);
    }

    public function update(Request $request, HeroSlide $heroSlide): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string',
            'image_url' => 'nullable|url',
            'image' => 'nullable|image|max:5120',
            'cta_primary_text' => 'nullable|string|max:100',
            'cta_primary_url' => 'nullable|string|max:255',
            'cta_secondary_text' => 'nullable|string|max:100',
            'cta_secondary_url' => 'nullable|string|max:255',
            'order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($heroSlide->image_path) Storage::disk('public')->delete($heroSlide->image_path);
            $data['image_path'] = $request->file('image')->store('hero-slides', 'public');
        }

        $heroSlide->update($data);
        return redirect()->route('admin.hero-slides.index')->with('success', 'Hero slide updated.');
    }

    public function destroy(HeroSlide $heroSlide): RedirectResponse
    {
        if ($heroSlide->image_path) Storage::disk('public')->delete($heroSlide->image_path);
        $heroSlide->delete();
        return redirect()->route('admin.hero-slides.index')->with('success', 'Hero slide deleted.');
    }

    public function reorder(Request $request): void
    {
        foreach ($request->order as $item) {
            HeroSlide::where('id', $item['id'])->update(['order' => $item['order']]);
        }
    }
}
