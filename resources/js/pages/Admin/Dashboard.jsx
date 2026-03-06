import AdminLayout from '@/layouts/AdminLayout';
import { Link } from '@inertiajs/react';

function StatCard({ label, value, href, color = 'teal' }) {
    return (
        <Link href={href} className="card p-6 block hover:border-teal-200 group transition-all duration-200">
            <p className="text-xs font-body font-semibold tracking-widest uppercase text-slate-400 mb-3">{label}</p>
            <p className={`font-display text-4xl text-${color}-600`}>{value}</p>
            <p className="mt-3 text-xs text-slate-400 group-hover:text-teal-600 transition-colors">Manage →</p>
        </Link>
    );
}

export default function Dashboard({ stats = {}, recentMessages = [], recentPosts = [] }) {
    return (
        <AdminLayout title="Dashboard">
            <div className="mb-8">
                <h2 className="text-slate-600 text-sm">Welcome back. Here's what's happening on your site.</h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                <StatCard label="Hero Slides" value={stats.hero_slides ?? 0} href="/admin/hero-slides" />
                <StatCard label="Services" value={stats.services ?? 0} href="/admin/services" />
                <StatCard label="Partners" value={stats.partners ?? 0} href="/admin/partners" color="ocean" />
                <StatCard label="Projects" value={stats.projects ?? 0} href="/admin/projects" color="ocean" />
                <StatCard label="Team Members" value={stats.team_members ?? 0} href="/admin/team-members" />
                <StatCard label="Blog Posts" value={stats.blog_posts ?? 0} href="/admin/blog" />
                <StatCard label="New Messages" value={stats.unread_messages ?? 0} href="/admin/contacts" color="red" />
                <StatCard label="Total Messages" value={stats.total_messages ?? 0} href="/admin/contacts" color="slate" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent messages */}
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-body font-semibold text-slate-800">Recent Messages</h3>
                        <Link href="/admin/contacts" className="text-xs text-teal-600 hover:text-teal-700">View all →</Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentMessages.length > 0 ? recentMessages.map(msg => (
                            <Link key={msg.id} href={`/admin/contacts/${msg.id}`}
                                className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${msg.status === 'new' ? 'bg-red-400' : 'bg-slate-300'}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{msg.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{msg.subject ?? msg.email}</p>
                                </div>
                                <p className="text-xs text-slate-400 flex-shrink-0">{new Date(msg.created_at).toLocaleDateString()}</p>
                            </Link>
                        )) : (
                            <p className="px-6 py-8 text-sm text-slate-400 text-center">No messages yet.</p>
                        )}
                    </div>
                </div>

                {/* Recent posts */}
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-body font-semibold text-slate-800">Recent Blog Posts</h3>
                        <Link href="/admin/blog" className="text-xs text-teal-600 hover:text-teal-700">View all →</Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {recentPosts.length > 0 ? recentPosts.map(post => (
                            <Link key={post.id} href={`/admin/blog/${post.id}/edit`}
                                className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${post.is_published ? 'bg-green-400' : 'bg-amber-400'}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{post.title}</p>
                                    <p className="text-xs text-slate-500">{post.is_published ? 'Published' : 'Draft'}</p>
                                </div>
                                <p className="text-xs text-slate-400 flex-shrink-0">{new Date(post.created_at).toLocaleDateString()}</p>
                            </Link>
                        )) : (
                            <p className="px-6 py-8 text-sm text-slate-400 text-center">No posts yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick links */}
            <div className="mt-8 card p-6">
                <h3 className="font-body font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/blog/create" className="btn-primary text-xs py-2 px-4">+ New Post</Link>
                    <Link href="/admin/hero-slides/create" className="btn-dark text-xs py-2 px-4">+ New Slide</Link>
                    <Link href="/admin/projects/create" className="btn-dark text-xs py-2 px-4">+ New Project</Link>
                    <Link href="/admin/settings" className="text-xs px-4 py-2 border border-slate-200 text-slate-600 hover:border-slate-400 rounded-sm transition-colors">Site Settings</Link>
                </div>
            </div>
        </AdminLayout>
    );
}
