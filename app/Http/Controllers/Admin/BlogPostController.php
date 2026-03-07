<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Blog/Index', [
            'items' => BlogPost::latest()->get()->map(fn($b) => [
                'id' => $b->id, 'title' => $b->title, 'slug' => $b->slug,
                'category' => $b->category, 'author' => $b->author,
                'is_published' => $b->is_published, 'is_featured' => $b->is_featured,
                'published_at' => $b->published_at?->format('Y-m-d'),
                'created_at' => $b->created_at->format('d M Y'),
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blog/Form', ['item' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:blog_posts',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'nullable|url',
            'image' => 'nullable|image|max:5120',
            'category' => 'required|string|max:100',
            'author' => 'required|string|max:255',
            'published_at' => 'nullable|date',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('blog', 'public');
        }

        BlogPost::create($data);
        return redirect()->route('admin.blog.index')->with('success', 'Blog post created.');
    }

    public function edit(BlogPost $blog): Response
    {
        return Inertia::render('Admin/Blog/Form', [
            'item' => array_merge($blog->toArray(), ['image' => $blog->image,
                'published_at' => $blog->published_at?->format('Y-m-d')]),
        ]);
    }

    public function update(Request $request, BlogPost $blog): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:blog_posts,slug,' . $blog->id,
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image_url' => 'nullable|url',
            'image' => 'nullable|image|max:5120',
            'category' => 'required|string|max:100',
            'author' => 'required|string|max:255',
            'published_at' => 'nullable|date',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($blog->image_path) Storage::disk('public')->delete($blog->image_path);
            $data['image_path'] = $request->file('image')->store('blog', 'public');
        }

        $blog->update($data);
        return redirect()->route('admin.blog.index')->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $blog): RedirectResponse
    {
        if ($blog->image_path) Storage::disk('public')->delete($blog->image_path);
        $blog->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted.');
    }
}
