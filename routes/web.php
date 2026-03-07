<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PartnersController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\PageSettingsController;
use App\Http\Controllers\Admin\TestimonialController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/offer', [OfferController::class, 'index'])->name('offer.index');
Route::get('/offer/{slug}', [OfferController::class, 'show'])->name('offer.show');
Route::get('/partners', [PartnersController::class, 'index'])->name('partners');
Route::get('/projects', [ProjectsController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [ProjectsController::class, 'show'])->name('projects.show');
Route::get('/team', [TeamController::class, 'index'])->name('team');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Admin Routes
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('hero-slides', HeroSlideController::class)->except(['show']);
    Route::post('hero-slides/reorder', [HeroSlideController::class, 'reorder'])->name('hero-slides.reorder');
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::resource('partners', PartnerController::class)->except(['show']);
    Route::resource('projects', ProjectController::class)->except(['show']);
    Route::resource('team-members', TeamMemberController::class)->except(['show']);
    Route::resource('blog', BlogPostController::class)->except(['show']);
    Route::resource('testimonials', TestimonialController::class)->except(['show']);
    Route::get('contacts', [ContactMessageController::class, 'index'])->name('contacts.index');
    Route::resource('contacts', ContactMessageController::class)->except(['create', 'store', 'index']);
    Route::get('pages', [PageSettingsController::class, 'index'])->name('pages.index');
    Route::post('pages', [PageSettingsController::class, 'update'])->name('pages.update');
    Route::get('settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingsController::class, 'update'])->name('settings.update');
});

