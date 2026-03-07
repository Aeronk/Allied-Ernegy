<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => collect(\App\Models\SiteSetting::pluck('value', 'key'))->map(function($value, $key) {
                if (in_array($key, ['site_logo', 'favicon', 'site_footer_logo']) && $value && !str_starts_with($value, 'http')) {
                    return \Illuminate\Support\Facades\Storage::disk('public')->url($value);
                }
                return $value;
            })->toArray(),
            'services' => \App\Models\Service::active()->orderBy('order')->get(['id', 'title', 'slug'])->toArray(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
