<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/TeamMembers/Index', [
            'items' => TeamMember::orderBy('order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/TeamMembers/Form', ['item' => null]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('team-members', 'public');
        }
        TeamMember::create($data);
        return redirect()->route('admin.team-members.index')->with('success', 'TeamMember created.');
    }

    public function edit(TeamMember $model): Response
    {
        return Inertia::render('Admin/TeamMembers/Form', [
            'item' => array_merge($model->toArray(), ['image' => $model->image]),
        ]);
    }

    public function update(Request $request, TeamMember $model): RedirectResponse
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            if ($model->image_path) Storage::disk('public')->delete($model->image_path);
            $data['image_path'] = $request->file('image')->store('team-members', 'public');
        }
        $model->update($data);
        return redirect()->route('admin.team-members.index')->with('success', 'TeamMember updated.');
    }

    public function destroy(TeamMember $model): RedirectResponse
    {
        if ($model->image_path) Storage::disk('public')->delete($model->image_path);
        $model->delete();
        return redirect()->route('admin.team-members.index')->with('success', 'TeamMember deleted.');
    }
}
