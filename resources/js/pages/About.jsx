import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';

export default function About({ settings = {} }) {
    return (
        <PublicLayout title="About Us" settings={settings}>
            <PageHeader
                label="Our Story"
                title="Pioneering Wave Energy for a Sustainable Future"
                subtitle="Allied Energies Ltd is a Scottish wave energy developer committed to unlocking the extraordinary power of ocean waves."
            />

            {/* Mission */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="section-label mb-4">Who We Are</p>
                        <h2 className="section-heading mb-6">Turning Tides Into Terawatts</h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                Allied Energies Ltd was established with a singular vision: to make ocean wave energy a mainstream renewable power source. Founded in Scotland — home to some of the world's most energetic wave resources — we are building the technology and partnerships to make this vision a reality.
                            </p>
                            <p>
                                Our approach combines proven wave energy converter technologies with innovative project development, bringing together world-class partners in energy, port infrastructure, and coastal development.
                            </p>
                            <p>
                                From the 8.3MW Ngqura Port project in South Africa to developments at Fraserburgh Harbour in Scotland, we are delivering projects that demonstrate the commercial viability of wave power at scale.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <Link href="/offer" className="btn-dark">Our Technologies</Link>
                            <Link href="/team" className="btn-primary">Meet the Team</Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-ocean-950 rounded-sm overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg viewBox="0 0 200 200" className="w-3/4 opacity-20">
                                    {[0,1,2,3,4].map(i => (
                                        <path key={i}
                                            d={`M20,${80 + i*10} C60,${60 + i*5} 100,${100 + i*5} 140,${80 + i*10} C165,${70 + i*5} 180,${85 + i*5} 180,${80 + i*10}`}
                                            stroke="#2dd4bf" strokeWidth="2" fill="none"
                                        />
                                    ))}
                                </svg>
                            </div>
                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-2">Established</p>
                                <p className="font-display text-6xl text-white">2020</p>
                                <p className="text-slate-400 text-sm mt-2">Aberdeen, Scotland</p>
                            </div>
                        </div>
                        {/* Floating stat */}
                        <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white p-6 shadow-xl">
                            <p className="font-display text-3xl">8.3MW</p>
                            <p className="text-teal-100 text-xs mt-1 font-body">First project target</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="section-label mb-3">What Drives Us</p>
                        <h2 className="section-heading">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Innovation',
                                text: 'We partner with the world\'s leading wave energy technology developers to bring cutting-edge solutions to market.',
                                color: 'bg-ocean-100 text-ocean-700',
                            },
                            {
                                title: 'Sustainability',
                                text: 'Every project we develop is designed for zero carbon emissions, contributing to a clean energy future for coastal communities.',
                                color: 'bg-teal-50 text-teal-700',
                            },
                            {
                                title: 'Partnership',
                                text: 'We believe in building lasting relationships — with technology partners, port authorities, investors, and the communities we serve.',
                                color: 'bg-navy-900 text-teal-400',
                            },
                        ].map(({ title, text, color }) => (
                            <div key={title} className={`p-10 rounded-sm ${color.includes('navy') ? 'bg-navy-900' : 'bg-white border border-slate-100'}`}>
                                <div className={`w-2 h-2 rounded-full ${color.includes('navy') ? 'bg-teal-400' : color.includes('ocean') ? 'bg-ocean-600' : 'bg-teal-600'} mb-6`} />
                                <h3 className={`font-display text-2xl mb-4 ${color.includes('navy') ? 'text-white' : 'text-navy-900'}`}>{title}</h3>
                                <p className={`text-sm leading-relaxed ${color.includes('navy') ? 'text-slate-400' : 'text-slate-600'}`}>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why wave energy */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <p className="section-label mb-4">The Opportunity</p>
                            <h2 className="section-heading mb-8">Why Wave Energy?</h2>
                            <div className="space-y-6">
                                {[
                                    { stat: '71%', label: 'of Earth\'s surface is ocean', text: 'The vast majority of our planet is covered by water — an almost inexhaustible source of energy.' },
                                    { stat: '5–7 days', label: 'wave forecast accuracy', text: 'Unlike solar and wind, wave energy can be predicted well in advance, enabling reliable grid scheduling.' },
                                    { stat: '2–3×', label: 'denser than wind energy', text: 'Waves carry far more energy per square metre than wind, enabling compact, high-output installations.' },
                                ].map(({ stat, label, text }) => (
                                    <div key={stat} className="flex gap-6">
                                        <div className="flex-shrink-0 w-24 text-right">
                                            <p className="font-display text-2xl text-teal-600">{stat}</p>
                                            <p className="text-xs text-slate-400 leading-tight">{label}</p>
                                        </div>
                                        <div className="flex-1 border-l border-slate-200 pl-6 pt-1">
                                            <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-navy-900 p-10 rounded-sm">
                            <p className="section-label mb-6">Our Mission Statement</p>
                            <blockquote className="font-display text-2xl text-white leading-relaxed italic mb-8">
                                "To be the leading developer of commercial wave energy projects, delivering clean, affordable, and predictable power to coastal communities worldwide."
                            </blockquote>
                            <Link href="/contact" className="btn-primary">Work With Us →</Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
