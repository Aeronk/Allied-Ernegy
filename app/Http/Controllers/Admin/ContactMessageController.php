<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contacts/Index', [
            'messages' => ContactMessage::latest()->paginate(20)->through(fn($m) => [
                'id' => $m->id, 'name' => $m->name, 'email' => $m->email,
                'subject' => $m->subject, 'status' => $m->status,
                'created_at' => $m->created_at->format('d M Y H:i'),
            ]),
            'unreadCount' => ContactMessage::where('status', 'unread')->count(),
        ]);
    }

    public function show(ContactMessage $contact): Response
    {
        if ($contact->status === 'unread') $contact->markAsRead();
        return Inertia::render('Admin/Contacts/Show', [
            'message' => $contact->toArray() + [
                'created_at' => $contact->created_at->format('d M Y H:i'),
            ],
        ]);
    }

    public function update(Request $request, ContactMessage $contact): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:unread,read,replied,archived',
            'admin_notes' => 'nullable|string',
        ]);
        $contact->update($data);
        return redirect()->back()->with('success', 'Message updated.');
    }

    public function destroy(ContactMessage $contact): RedirectResponse
    {
        $contact->delete();
        return redirect()->route('admin.contacts.index')->with('success', 'Message deleted.');
    }
}
