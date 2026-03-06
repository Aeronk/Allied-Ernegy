<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'hero_slides'      => HeroSlide::count(),
                'services'         => Service::count(),
                'partners'         => Partner::count(),
                'projects'         => Project::count(),
                'team_members'     => TeamMember::count(),
                'blog_posts'       => BlogPost::count(),
                'published_posts'  => BlogPost::where('is_published', true)->count(),
                'unread_messages'  => ContactMessage::where('status', 'unread')->count(),
                'total_messages'   => ContactMessage::count(),
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get()->map(fn($m) => [
                'id' => $m->id, 'name' => $m->name, 'email' => $m->email,
                'subject' => $m->subject, 'status' => $m->status,
                'created_at' => $m->created_at->diffForHumans(),
            ]),
            'recentPosts' => BlogPost::latest()->take(5)->get()->map(fn($b) => [
                'id' => $b->id, 'title' => $b->title, 'is_published' => $b->is_published,
                'created_at' => $b->created_at->diffForHumans(),
            ]),
        ]);
    }
}
