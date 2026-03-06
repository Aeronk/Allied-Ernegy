<?php
// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Public/HomeController.php
// ══════════════════════════════════════════════════════════════
namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\FaqItem;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'heroSlides' => HeroSlide::active()->ordered()->get()->map(fn($s) => [
                'id'       => $s->id,
                'title'    => $s->title,
                'subtitle' => $s->subtitle,
                'image'    => $s->image_src,
                'ctaLabel' => $s->cta_label,
                'ctaUrl'   => $s->cta_url,
            ]),
            'services' => Service::active()->ordered()->take(3)->get()->map(fn($s) => [
                'id'          => $s->id,
                'slug'        => $s->slug,
                'title'       => $s->title,
                'description' => $s->description,
                'icon'        => $s->icon,
                'image'       => $s->image_src,
            ]),
            'projects' => Project::active()->featured()->take(2)->get()->map(fn($p) => [
                'id'          => $p->id,
                'title'       => $p->title,
                'location'    => $p->location,
                'description' => $p->description,
                'image'       => $p->image_src,
                'status'      => $p->status,
            ]),
            'partners' => Partner::active()->orderBy('sort_order')->get(['id', 'name', 'logo_url']),
            'posts'    => BlogPost::published()->featured()->latest('published_at')->take(3)->get()->map(fn($p) => [
                'id'          => $p->id,
                'title'       => $p->title,
                'slug'        => $p->slug,
                'excerpt'     => $p->excerpt,
                'coverImage'  => $p->cover_image_src,
                'author'      => $p->author,
                'category'    => $p->category,
                'publishedAt' => $p->published_at?->format('F j, Y'),
            ]),
            'faqs' => FaqItem::active()->ordered()->get(['id', 'question', 'answer']),
            'settings' => [
                'siteName'       => SiteSetting::get('site_name', 'Allied Energies Ltd'),
                'tagline'        => SiteSetting::get('site_tagline'),
                'statsEnergy'    => SiteSetting::get('stat_energy', '500MW+'),
                'statsProjects'  => SiteSetting::get('stat_projects', '12+'),
                'statsPartners'  => SiteSetting::get('stat_partners', '15+'),
            ],
        ]);
    }
}

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Public/AboutController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Public;
// use Inertia\Inertia;
// class AboutController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('About', [
//             'settings' => [
//                 'missionTitle'    => SiteSetting::get('about_mission_title'),
//                 'missionText'     => SiteSetting::get('about_mission_text'),
//                 'visionText'      => SiteSetting::get('about_vision_text'),
//                 'heroImage'       => SiteSetting::get('about_hero_image'),
//             ],
//         ]);
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Public/OfferController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Public;
// use App\Models\Service;
// use Inertia\Inertia;
// class OfferController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Offer', [
//             'services' => Service::active()->ordered()->get()->map(fn($s) => [
//                 'id' => $s->id, 'slug' => $s->slug, 'title' => $s->title,
//                 'description' => $s->description, 'icon' => $s->icon,
//                 'image' => $s->image_src,
//             ]),
//         ]);
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Public/BlogController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Public;
// use App\Models\BlogPost;
// use Inertia\Inertia;
// class BlogController extends Controller
// {
//     public function index(Request $request)
//     {
//         $posts = BlogPost::published()
//             ->when($request->category, fn($q, $c) => $q->where('category', $c))
//             ->when($request->search, fn($q, $s) => $q->where('title', 'like', "%{$s}%"))
//             ->latest('published_at')
//             ->paginate(9)
//             ->through(fn($p) => [
//                 'id'          => $p->id,
//                 'title'       => $p->title,
//                 'slug'        => $p->slug,
//                 'excerpt'     => $p->excerpt,
//                 'coverImage'  => $p->cover_image_src,
//                 'author'      => $p->author,
//                 'category'    => $p->category,
//                 'publishedAt' => $p->published_at?->format('F j, Y'),
//             ]);
//
//         $categories = BlogPost::published()->distinct()->pluck('category')->filter();
//
//         return Inertia::render('Blog/Index', compact('posts', 'categories'));
//     }
//
//     public function show(BlogPost $post)
//     {
//         abort_if(!$post->is_published, 404);
//         $post->incrementViews();
//         $related = BlogPost::published()
//             ->where('id', '!=', $post->id)
//             ->where('category', $post->category)
//             ->latest('published_at')->take(3)->get();
//
//         return Inertia::render('Blog/Show', [
//             'post'    => $post,
//             'related' => $related,
//         ]);
//     }
// }

// ══════════════════════════════════════════════════════════════
// app/Http/Controllers/Public/ContactController.php
// ══════════════════════════════════════════════════════════════
// namespace App\Http\Controllers\Public;
// use App\Http\Requests\StoreContactRequest;
// use App\Mail\ContactFormMail;
// use App\Models\Contact;
// use Illuminate\Support\Facades\Mail;
// use Inertia\Inertia;
// class ContactController extends Controller
// {
//     public function index()
//     {
//         return Inertia::render('Contact', [
//             'settings' => [
//                 'address' => SiteSetting::get('contact_address'),
//                 'email'   => SiteSetting::get('contact_email', 'admin@allied-energies.com'),
//                 'phone'   => SiteSetting::get('contact_phone'),
//             ],
//         ]);
//     }
//
//     public function store(StoreContactRequest $request)
//     {
//         $contact = Contact::create([
//             ...$request->validated(),
//             'ip_address' => $request->ip(),
//         ]);
//
//         Mail::to(config('mail.admin_address'))->send(new ContactFormMail($contact));
//
//         return back()->with('success', 'Your message has been sent successfully!');
//     }
// }
