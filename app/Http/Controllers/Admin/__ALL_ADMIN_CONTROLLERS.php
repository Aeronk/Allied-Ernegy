<?php
// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Admin/DashboardController.php
// ══════════════════════════════════════════════════════════════
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'blogPosts'      => BlogPost::count(),
                'publishedPosts' => BlogPost::published()->count(),
                'projects'       => Project::count(),
                'services'       => Service::count(),
                'contacts'       => Contact::count(),
                'unreadContacts' => Contact::unread()->count(),
            ],
            'recentContacts' => Contact::latest()->take(5)->get([
                'id', 'name', 'email', 'subject', 'is_read', 'created_at',
            ]),
            'recentPosts' => BlogPost::latest()->take(5)->get([
                'id', 'title', 'slug', 'is_published', 'views', 'created_at',
            ]),
        ]);
    }
}

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Admin/HeroSlideController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Admin;
// use App\Models\HeroSlide;
// use Inertia\Inertia;
// class HeroSlideController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Admin/HeroSlides/Index', [
//             'slides' => HeroSlide::ordered()->get(),
//         ]);
//     }
//     public function create()  { return Inertia::render('Admin/HeroSlides/Form'); }
//     public function store(StoreHeroSlideRequest $request)
//     {
//         $data = $request->validated();
//         if ($request->hasFile('image')) {
//             $data['image'] = $request->file('image')->store('hero-slides', 'public');
//         }
//         HeroSlide::create($data);
//         return redirect()->route('admin.hero-slides.index')->with('success', 'Slide created.');
//     }
//     public function edit(HeroSlide $heroSlide)
//     {
//         return Inertia::render('Admin/HeroSlides/Form', ['slide' => $heroSlide]);
//     }
//     public function update(StoreHeroSlideRequest $request, HeroSlide $heroSlide)
//     {
//         $data = $request->validated();
//         if ($request->hasFile('image')) {
//             Storage::disk('public')->delete($heroSlide->image);
//             $data['image'] = $request->file('image')->store('hero-slides', 'public');
//         }
//         $heroSlide->update($data);
//         return redirect()->route('admin.hero-slides.index')->with('success', 'Slide updated.');
//     }
//     public function destroy(HeroSlide $heroSlide)
//     {
//         if ($heroSlide->image) Storage::disk('public')->delete($heroSlide->image);
//         $heroSlide->delete();
//         return back()->with('success', 'Slide deleted.');
//     }
//     public function toggle(HeroSlide $heroSlide)
//     {
//         $heroSlide->update(['is_active' => !$heroSlide->is_active]);
//         return back();
//     }
//     public function updateOrder(Request $request, HeroSlide $heroSlide)
//     {
//         $heroSlide->update(['sort_order' => $request->order]);
//         return response()->json(['ok' => true]);
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Admin/BlogPostController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Admin;
// use App\Models\BlogPost;
// use Inertia\Inertia;
// class BlogPostController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Admin/BlogPosts/Index', [
//             'posts' => BlogPost::latest()->paginate(20),
//         ]);
//     }
//     public function create()  { return Inertia::render('Admin/BlogPosts/Form'); }
//     public function store(StoreBlogPostRequest $request)
//     {
//         $data = $request->validated();
//         $data['slug'] = Str::slug($data['title']);
//         if ($request->hasFile('cover_image')) {
//             $data['cover_image'] = $request->file('cover_image')->store('blog', 'public');
//         }
//         BlogPost::create($data);
//         return redirect()->route('admin.blog.index')->with('success', 'Post created.');
//     }
//     public function edit(BlogPost $blogPost)
//     {
//         return Inertia::render('Admin/BlogPosts/Form', ['post' => $blogPost]);
//     }
//     public function update(StoreBlogPostRequest $request, BlogPost $blogPost)
//     {
//         $data = $request->validated();
//         if ($request->hasFile('cover_image')) {
//             Storage::disk('public')->delete($blogPost->cover_image);
//             $data['cover_image'] = $request->file('cover_image')->store('blog', 'public');
//         }
//         $blogPost->update($data);
//         return redirect()->route('admin.blog.index')->with('success', 'Post updated.');
//     }
//     public function destroy(BlogPost $blogPost)
//     {
//         if ($blogPost->cover_image) Storage::disk('public')->delete($blogPost->cover_image);
//         $blogPost->delete();
//         return back()->with('success', 'Post deleted.');
//     }
//     public function toggle(BlogPost $blogPost)
//     {
//         $blogPost->update([
//             'is_published' => !$blogPost->is_published,
//             'published_at' => $blogPost->is_published ? null : now(),
//         ]);
//         return back();
//     }
//     public function toggleFeatured(BlogPost $blogPost)
//     {
//         $blogPost->update(['is_featured' => !$blogPost->is_featured]);
//         return back();
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Admin/ContactController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Admin;
// use App\Models\Contact;
// use Inertia\Inertia;
// class ContactController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Admin/Contacts/Index', [
//             'contacts' => Contact::latest()->paginate(20),
//             'unreadCount' => Contact::unread()->count(),
//         ]);
//     }
//     public function show(Contact $contact)
//     {
//         $contact->markAsRead();
//         return Inertia::render('Admin/Contacts/Show', ['contact' => $contact]);
//     }
//     public function destroy(Contact $contact)
//     {
//         $contact->delete();
//         return back()->with('success', 'Enquiry deleted.');
//     }
//     public function markRead(Contact $contact)
//     {
//         $contact->markAsRead();
//         return back();
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Admin/SiteSettingController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Admin;
// use App\Models\SiteSetting;
// use Inertia\Inertia;
// class SiteSettingController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Admin/Settings/General', [
//             'settings' => SiteSetting::where('group', 'general')->get()->keyBy('key'),
//         ]);
//     }
//     public function update(Request $request)
//     {
//         foreach ($request->settings as $key => $value) {
//             SiteSetting::set($key, $value);
//         }
//         return back()->with('success', 'Settings saved.');
//     }
//     public function homepage()
//     {
//         return Inertia::render('Admin/Settings/Homepage', [
//             'settings' => SiteSetting::where('group', 'homepage')->get()->keyBy('key'),
//         ]);
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Admin/MediaController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Admin;
// use App\Models\Media;
// use Inertia\Inertia;
// class MediaController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Admin/Media/Index', [
//             'media' => Media::latest()->paginate(40),
//         ]);
//     }
//     public function store(Request $request)
//     {
//         $request->validate(['file' => 'required|file|max:10240']);
//         $file = $request->file('file');
//         $path = $file->store('media', 'public');
//         $media = Media::create([
//             'filename'      => basename($path),
//             'original_name' => $file->getClientOriginalName(),
//             'path'          => $path,
//             'mime_type'     => $file->getMimeType(),
//             'size'          => $file->getSize(),
//         ]);
//         return response()->json(['url' => Storage::url($path), 'id' => $media->id]);
//     }
//     public function destroy(Media $media)
//     {
//         Storage::disk('public')->delete($media->path);
//         $media->delete();
//         return back()->with('success', 'File deleted.');
//     }
// }
