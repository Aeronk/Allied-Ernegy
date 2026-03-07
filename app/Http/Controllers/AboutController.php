<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ContentSetting;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About', [
            'contentSettings' => ContentSetting::all()->pluck('value', 'key')->map(function ($value) {
                $decoded = json_decode($value, true);
                return json_last_error() === JSON_ERROR_NONE ? $decoded : $value;
            })->toArray()
        ]);
    }
}
