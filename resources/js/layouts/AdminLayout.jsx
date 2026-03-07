import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '⬡' },
    { href: '/admin/hero-slides', label: 'Hero Slides', icon: '◈' },
    { href: '/admin/services', label: 'Services', icon: '⬟' },
    { href: '/admin/partners', label: 'Partners', icon: '◇' },
    { href: '/admin/projects', label: 'Projects', icon: '⬠' },
    { href: '/admin/team-members', label: 'Team', icon: '○' },
    { href: '/admin/blog', label: 'Blog Posts', icon: '▭' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: '❝' },
    { href: '/admin/contacts', label: 'Messages', icon: '△' },
    { href: '/admin/pages', label: 'Site Content', icon: '▤' },
    { href: '/admin/settings', label: 'Settings', icon: '◎' },
];

export default function AdminLayout({ children, title }) {
    const { url, props } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            <Head title={`${title} — Admin`} />
            <div className="min-h-screen bg-slate-50 flex">
                {/* Sidebar */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 flex flex-col transform transition-transform duration-200
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0
                `}>
                    {/* Logo */}
                    <div className="px-6 py-4 border-b border-navy-700 min-h-[5rem] flex items-center">
                        <Link href="/" className="flex items-center gap-3">
                            {props.settings?.site_logo ? (
                                <img src={props.settings.site_logo} alt="Site Logo" className="max-h-12 w-auto object-contain" />
                            ) : (
                                <>
                                    <div className="w-7 h-7">
                                        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                                            <path d="M4 20 C8 12, 14 8, 16 16 C18 24, 24 20, 28 12"
                                                stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                            <path d="M4 24 C8 16, 14 12, 16 20 C18 28, 24 24, 28 16"
                                                stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="font-display text-white text-base">Allied Energies</span>
                                        <span className="block text-teal-400 text-[9px] tracking-widest uppercase font-body">CMS Admin</span>
                                    </div>
                                </>
                            )}
                        </Link>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4 overflow-y-auto">
                        {navItems.map(({ href, label, icon }) => {
                            const active = url === href || url.startsWith(href + '/');
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-body font-medium mb-0.5 transition-colors ${active
                                        ? 'bg-teal-500/20 text-teal-400'
                                        : 'text-slate-400 hover:text-white hover:bg-navy-700'
                                        }`}
                                >
                                    <span className="text-base w-5 text-center">{icon}</span>
                                    {label}
                                    {href === '/admin/contacts' && props.auth?.unread_count > 0 && (
                                        <span className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {props.auth.unread_count}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="px-4 py-4 border-t border-navy-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {props.auth?.user?.name?.[0] ?? 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{props.auth?.user?.name}</p>
                                <p className="text-slate-500 text-xs truncate">{props.auth?.user?.email}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full text-left text-xs text-slate-500 hover:text-red-400 transition-colors px-1">
                            Sign out →
                        </button>
                    </div>
                </aside>

                {/* Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Topbar */}
                    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900"
                        >
                            ☰
                        </button>
                        <h1 className="font-body font-semibold text-slate-800 text-lg flex-1">{title}</h1>
                        <Link href="/" target="_blank" className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                            View site ↗
                        </Link>
                    </header>

                    {/* Content */}
                    <main className="flex-1 p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
