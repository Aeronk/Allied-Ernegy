<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentSetting;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Artisan;

class PageSettingsController extends Controller
{
    public function index(): Response
    {
        $settings = ContentSetting::all()->pluck('value', 'key')->map(function ($value) {
            $decoded = json_decode($value, true);
            return json_last_error() === JSON_ERROR_NONE ? $decoded : $value;
        })->toArray();

        return Inertia::render('Admin/Pages', [
            'contentSettings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        foreach ($request->all() as $key => $value) {
            if ($key === '_token' || $key === '_method') continue;
            
            // Handle file uploads
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                ContentSetting::set($key, $path, 'text');
                continue;
            }

            // If the incoming data is a JSON array string from the FormData
            // Make sure to convert it back to an array to store cleanly or keep as string depending on usage
            if (is_string($value) && str_starts_with(trim($value), '[')) {
                $decoded = json_decode($value, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                     $value = $decoded;
                }
            }

            $type = is_array($value) ? 'json' : 'text';
            $storeValue = is_array($value) ? json_encode($value) : $value;
            
            ContentSetting::set($key, $storeValue, $type);
        }

        // Clear cache so the frontend picks up changes immediately
        Artisan::call('cache:clear');

        return redirect()->back()->with('success', 'Page content updated successfully.');
    }
}
