import AdminLayout from '@/layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

const statusColors = {
    new: 'bg-red-100 text-red-700',
    read: 'bg-blue-100 text-blue-700',
    replied: 'bg-green-100 text-green-700',
    archived: 'bg-slate-100 text-slate-500',
};

export function ContactsIndex({ messages = {} }) {
    const { data = [], links = [] } = messages;

    return (
        <AdminLayout title="Contact Messages">
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {['Status', 'Name', 'Email', 'Subject', 'Date'].map(h => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap">{h}</th>
                                ))}
                                <th className="text-right px-5 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {data.map(msg => (
                                <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[msg.status] ?? statusColors.new}`}>
                                            {msg.status ?? 'new'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 font-medium text-slate-800">{msg.name}</td>
                                    <td className="px-5 py-4 text-slate-500">{msg.email}</td>
                                    <td className="px-5 py-4 text-slate-600 max-w-xs truncate">{msg.subject ?? '—'}</td>
                                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString()}</td>
                                    <td className="px-5 py-4 text-right">
                                        <Link href={`/admin/contacts/${msg.id}`} className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                                            View →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {data.length === 0 && <p className="text-center text-slate-400 text-sm py-12">No messages yet.</p>}
                </div>
            </div>

            {links.length > 3 && (
                <div className="flex justify-center gap-2 mt-6">
                    {links.map((link, i) => (
                        link.url ? (
                            <Link key={i} href={link.url} className={`px-4 py-2 text-sm rounded-sm transition-colors ${link.active ? 'bg-navy-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ) : (
                            <span key={i} className="px-4 py-2 text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                        )
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

export function ContactShow({ message }) {
    const updateStatus = (status) => {
        router.patch(`/admin/contacts/${message.id}`, { status });
    };
    const deleteMessage = () => {
        if (confirm('Delete this message?')) router.delete(`/admin/contacts/${message.id}`);
    };

    return (
        <AdminLayout title="View Message">
            <div className="mb-6 flex items-center justify-between">
                <Link href="/admin/contacts" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">← Back to Messages</Link>
                <div className="flex items-center gap-3">
                    <select
                        value={message.status ?? 'new'}
                        onChange={e => updateStatus(e.target.value)}
                        className="text-sm border border-slate-200 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                    </select>
                    <button onClick={deleteMessage} className="text-sm text-red-500 hover:text-red-700 px-3 py-2 border border-red-200 rounded-sm">Delete</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="card p-8">
                        <h2 className="font-display text-2xl text-navy-900 mb-6">{message.subject ?? 'No Subject'}</h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="whitespace-pre-line text-slate-700 leading-relaxed">{message.message}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="card p-6">
                        <h3 className="font-body font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Sender</h3>
                        <div className="space-y-3 text-sm">
                            <div><p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Name</p><p className="font-medium text-slate-800">{message.name}</p></div>
                            <div><p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Email</p><a href={`mailto:${message.email}`} className="text-teal-600 hover:text-teal-700">{message.email}</a></div>
                            {message.phone && <div><p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Phone</p><p className="text-slate-700">{message.phone}</p></div>}
                            {message.organisation && <div><p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Organisation</p><p className="text-slate-700">{message.organisation}</p></div>}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="font-body font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wider">Details</h3>
                        <div className="space-y-3 text-sm">
                            <div><p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Received</p><p className="text-slate-700">{new Date(message.created_at).toLocaleString()}</p></div>
                            <div><p className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">IP Address</p><p className="text-slate-500 font-mono text-xs">{message.ip_address ?? 'N/A'}</p></div>
                        </div>
                    </div>

                    <a href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject ?? 'Your enquiry')}`}
                        className="btn-primary w-full justify-center text-sm">
                        Reply via Email →
                    </a>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ContactsIndex;
