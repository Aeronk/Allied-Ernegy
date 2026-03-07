import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { url, props } = usePage();
    const settings = props.settings || {};
    const services = props.services || [];

    // Build dynamic navLinks based on available services
    const navLinks = [
        { href: '/', label: 'Home' },
        {
            href: '/about',
            label: 'About Us',
            children: [
                { href: '/about', label: 'Company Overview' },
                { href: '/team', label: 'Our Team' },
                { href: '/partners', label: 'Our Partners' },
            ]
        },
        {
            href: '/offer',
            label: 'Our Offer',
            children: [
                { href: '/offer', label: 'All Technologies' },
                ...(services.length > 0 ? services.map(s => ({
                    href: `/offer/${s.slug}`,
                    label: s.title || s.name
                })) : [])
            ]
        },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Insights' },
        { href: '/contact', label: 'Contact' },
    ];

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // State to handle mobile accordion dropdowns
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (label) => {
        setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || menuOpen
                ? 'bg-navy-900/98 backdrop-blur-sm shadow-xl py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group z-10">
                    {settings.site_logo ? (
                        <div className="h-20 relative flex items-center justify-center">
                            <img src={settings.site_logo} alt={settings.site_name} className="h-full w-auto object-contain" />
                        </div>
                    ) : (
                        <>
                            <div className="w-10 h-10 relative flex items-center justify-center bg-white rounded-full p-1 shadow-sm">
                                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-teal-500">
                                    <path d="M4 20 C8 12, 14 8, 16 16 C18 24, 24 20, 28 12"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                    <path d="M4 24 C8 16, 14 12, 16 20 C18 28, 24 24, 28 16"
                                        stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-display text-white text-xl leading-none block font-bold tracking-wide">{settings.site_name || 'Allied Energies'}</span>
                                <span className="text-teal-400 text-[10px] tracking-[0.2em] uppercase font-body">Wave Power Ltd</span>
                            </div>
                        </>
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <div key={link.label} className="relative group py-4">
                            <Link
                                href={link.href}
                                className={`px-4 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-150 rounded-sm flex items-center gap-1 ${url.startsWith(link.href) && link.href !== '/' || url === link.href
                                    ? 'text-teal-400'
                                    : 'text-slate-300 group-hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform group-hover:rotate-180" />}
                            </Link>

                            {/* Dropdown Menu */}
                            {link.children && (
                                <div className="absolute top-full left-0 w-56 bg-white border border-slate-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                                    <div className="py-2">
                                        {link.children.map(child => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className={`block px-5 py-2.5 text-sm font-body transition-colors ${url === child.href ? 'text-teal-600 bg-teal-50/50 font-semibold' : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'}`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Link href="/contact" className="ml-4 btn-primary text-xs py-2.5 px-5">
                        Get in Touch
                    </Link>
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="xl:hidden p-2 text-white z-10 relative focus:outline-none"
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
                <div className="xl:hidden bg-navy-900 border-t border-navy-700 px-6 py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                    {navLinks.map((link) => (
                        <div key={link.label} className="border-b border-navy-700/50 last:border-0">
                            <div className="flex items-center justify-between py-3">
                                <Link
                                    href={link.href}
                                    onClick={() => !link.children && setMenuOpen(false)}
                                    className={`text-sm font-body font-medium flex-1 ${url.startsWith(link.href) && link.href !== '/' || url === link.href ? 'text-teal-400' : 'text-slate-300'}`}
                                >
                                    {link.label}
                                </Link>

                                {link.children && (
                                    <button
                                        onClick={() => toggleDropdown(link.label)}
                                        className="p-2 text-slate-400 hover:text-white focus:outline-none"
                                    >
                                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdowns[link.label] ? 'rotate-180' : ''}`} />
                                    </button>
                                )}
                            </div>

                            {/* Mobile Submenu Dropdown */}
                            {link.children && openDropdowns[link.label] && (
                                <div className="pl-4 pb-3 space-y-3">
                                    {link.children.map(child => (
                                        <Link
                                            key={child.label}
                                            href={child.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block text-sm font-body ${url === child.href ? 'text-teal-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="btn-primary block text-center mt-6 py-3"
                    >
                        Get in Touch
                    </Link>
                </div>
            )}
        </header>
    );
}
