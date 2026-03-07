<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settings' => SiteSetting::pluck('value', 'key')->toArray(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        foreach ($request->all() as $key => $value) {
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('settings', 'public');
                SiteSetting::set($key, $path);
            } else if ($value !== null && $key !== '_token' && $key !== '_method') {
                SiteSetting::set($key, $value);
            }
        }
        return redirect()->back()->with('success', 'Settings saved successfully.');
    }
}
