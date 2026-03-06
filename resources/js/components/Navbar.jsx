import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/offer', label: 'Our Offer' },
    { href: '/partners', label: 'Partners' },
    { href: '/projects', label: 'Projects' },
    { href: '/team', label: 'Team' },
    { href: '/blog', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || menuOpen
                    ? 'bg-navy-900/98 backdrop-blur-sm shadow-xl py-3'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 relative">
                        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                            <path d="M4 20 C8 12, 14 8, 16 16 C18 24, 24 20, 28 12"
                                stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                            <path d="M4 24 C8 16, 14 12, 16 20 C18 28, 24 24, 28 16"
                                stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
                        </svg>
                    </div>
                    <div>
                        <span className="font-display text-white text-lg leading-none block">Allied Energies</span>
                        <span className="text-teal-400 text-[10px] tracking-[0.15em] uppercase font-body">Wave Power Ltd</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`px-3 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-150 rounded-sm ${
                                url === href
                                    ? 'text-teal-400'
                                    : 'text-slate-300 hover:text-white'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link href="/contact" className="ml-4 btn-primary text-xs py-2.5 px-5">
                        Get in Touch
                    </Link>
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden p-2 text-white"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 flex flex-col gap-1.5">
                        <span className={`h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="lg:hidden bg-navy-900 border-t border-navy-700 px-6 py-4">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className={`block py-3 text-sm font-body font-medium border-b border-navy-700/50 ${
                                url === href ? 'text-teal-400' : 'text-slate-300'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
