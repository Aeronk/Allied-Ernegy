import { Link } from '@inertiajs/react';

export default function Footer({ settings = {} }) {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-navy-900 text-slate-400">
            {/* Wave top */}
            <div className="overflow-hidden leading-none">
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-12 fill-white">
                    <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,0 L0,0 Z"/>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8">
                                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                                    <path d="M4 20 C8 12, 14 8, 16 16 C18 24, 24 20, 28 12"
                                        stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                                    <path d="M4 24 C8 16, 14 12, 16 20 C18 28, 24 24, 28 16"
                                        stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
                                </svg>
                            </div>
                            <span className="font-display text-white text-xl">Allied Energies Ltd</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 max-w-sm">
                            Harnessing the boundless power of ocean waves to deliver clean, predictable, and sustainable energy solutions for coastal communities and industries worldwide.
                        </p>
                        <div className="text-sm space-y-1">
                            {settings.contact_email && (
                                <p><a href={`mailto:${settings.contact_email}`} className="text-teal-400 hover:text-teal-300 transition-colors">{settings.contact_email}</a></p>
                            )}
                            {settings.contact_phone && (
                                <p><a href={`tel:${settings.contact_phone}`} className="hover:text-white transition-colors">{settings.contact_phone}</a></p>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-body font-semibold text-sm tracking-widest uppercase mb-5">Navigation</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { href: '/about', label: 'About Us' },
                                { href: '/offer', label: 'Our Technologies' },
                                { href: '/partners', label: 'Partners' },
                                { href: '/projects', label: 'Projects' },
                                { href: '/team', label: 'Our Team' },
                                { href: '/blog', label: 'Insights' },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Focus areas */}
                    <div>
                        <h4 className="text-white font-body font-semibold text-sm tracking-widest uppercase mb-5">Focus Areas</h4>
                        <ul className="space-y-3 text-sm">
                            {['Wave Energy', 'Green Hydrogen', 'Wind Power', 'Oxygen Production', 'Coastal Development', 'Port Decarbonisation'].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-teal-500 flex-shrink-0"/>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {year} Allied Energies Ltd. All rights reserved.</p>
                    <p>Pioneering wave energy for a sustainable future.</p>
                </div>
            </div>
        </footer>
    );
}
