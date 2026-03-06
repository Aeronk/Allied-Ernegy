<?php
namespace App\Http\Controllers;
use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Team', [
            'team' => TeamMember::active()->get()->map(fn($t) => [
                'id' => $t->id, 'name' => $t->name, 'role' => $t->role,
                'bio' => $t->bio, 'image_url' => $t->image, 'linkedin_url' => $t->linkedin_url,
            ]),
        ]);
    }
}
