import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';

export default function Team({ teamMembers = [], settings = {} }) {
    return (
        <PublicLayout title="Our Team" settings={settings}>
            <PageHeader
                label="The People"
                title="Meet Our Team"
                subtitle="Experienced professionals from energy, engineering, and finance, united by a passion for clean ocean power."
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {teamMembers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map(member => (
                                <div key={member.id} className="group">
                                    <div className="aspect-square bg-slate-100 overflow-hidden rounded-sm mb-5 relative">
                                        {member.image_url ? (
                                            <img
                                                src={member.image_url}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-navy-900 flex items-center justify-center">
                                                <span className="font-display text-5xl text-teal-400">
                                                    {member.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                                            {member.bio && (
                                                <p className="text-white text-sm text-center leading-relaxed line-clamp-5">{member.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="font-display text-xl text-navy-900 mb-1">{member.name}</h3>
                                    <p className="text-teal-600 text-sm font-body font-medium mb-2">{member.role}</p>
                                    {member.linkedin_url && (
                                        <a
                                            href={member.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-slate-400 hover:text-navy-700 transition-colors"
                                        >
                                            LinkedIn →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-slate-500 py-16">Team profiles coming soon.</p>
                    )}
                </div>
            </section>

            {/* Join section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="section-label mb-4">Careers</p>
                        <h2 className="section-heading mb-5">Join Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            We are always looking for talented individuals who share our passion for clean energy. Whether you come from engineering, finance, policy, or project management, there may be a role for you at Allied Energies.
                        </p>
                        <Link href="/contact" className="btn-dark">Get in Touch →</Link>
                    </div>
                    <div className="bg-navy-900 p-10 rounded-sm">
                        <p className="section-label mb-6">Our Culture</p>
                        {[
                            'Mission-driven and purpose-focused',
                            'Collaborative and inclusive environment',
                            'At the frontier of clean energy innovation',
                            'International project exposure',
                        ].map(item => (
                            <div key={item} className="flex items-center gap-3 py-3 border-b border-navy-700 last:border-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
