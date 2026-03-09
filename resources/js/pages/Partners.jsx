import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';

export default function Partners({ partners = [], settings = {} }) {
    return (
        <PublicLayout title="Partners" settings={settings}>
            <PageHeader
                label="Collaborators"
                title="Our Partner Network"
                subtitle="Working with world-class organisations to accelerate the deployment of clean energy solutions."
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {partners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {partners.map(partner => (
                                <div key={partner.id} className="card p-8 group hover:border-teal-200">
                                    <div className="h-16 flex items-center mb-6">
                                        {partner.logo_url ? (
                                            <img
                                                src={partner.logo_url}
                                                alt={partner.name}
                                                className="max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        ) : (
                                            <h3 className="font-display text-xl text-navy-900">{partner.name}</h3>
                                        )}
                                    </div>
                                    {partner.logo_url && (
                                        <h3 className="font-display text-lg text-navy-900 mb-3">{partner.name}</h3>
                                    )}
                                    {partner.description && (
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{partner.description}</p>
                                    )}
                                    {partner.country && (
                                        <span className="text-xs text-slate-400 font-body">{partner.country}</span>
                                    )}
                                    {partner.website_url && (
                                        <a
                                            href={partner.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 block text-xs text-teal-600 hover:text-teal-700 font-medium"
                                        >
                                            Visit website →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-slate-500 py-16">Partners coming soon.</p>
                    )}
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <p className="section-label mb-4">Join Us</p>
                    <h2 className="section-heading mb-5">Become a Partner</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        We are always looking for technology partners, investors, port operators, and energy developers to join our growing network.
                    </p>
                    <Link href="/contact" className="btn-dark">Get in Touch →</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
