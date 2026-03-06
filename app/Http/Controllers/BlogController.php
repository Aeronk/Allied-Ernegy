<?php
namespace App\Http\Controllers;
use App\Models\BlogPost;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'posts' => BlogPost::published()->paginate(9)->through(fn($b) => [
                'id' => $b->id, 'title' => $b->title, 'slug' => $b->slug,
                'excerpt' => $b->excerpt, 'image_url' => $b->image, 'category' => $b->category,
                'author' => $b->author, 'published_at' => $b->published_at ? $b->published_at->format('M j, Y') : null,
                'formatted_date' => $b->formatted_date ?? ($b->published_at ? $b->published_at->diffForHumans() : null),
            ]),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $post->id, 'title' => $post->title, 'excerpt' => $post->excerpt,
                'content' => $post->content, 'image_url' => $post->image, 'category' => $post->category,
                'author' => $post->author, 'published_at' => $post->published_at ? $post->published_at->format('M j, Y') : null,
                'formatted_date' => $post->formatted_date ?? ($post->published_at ? $post->published_at->diffForHumans() : null),
            ],
        ]);
    }
}
