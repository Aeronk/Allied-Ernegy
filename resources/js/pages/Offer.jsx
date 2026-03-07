import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';

export default function Offer({ services = [], settings = {} }) {
    const renderIcon = (iconName) => {
        if (!iconName || !Icons[iconName]) return null;
        const IconComponent = Icons[iconName];
        return <IconComponent className="w-10 h-10 text-teal-500 mb-5" strokeWidth={1.5} />;
    };

    return (
        <PublicLayout title="Our Offer" settings={settings}>
            <PageHeader
                label="Technologies"
                title="Our Energy Solutions"
                subtitle="A comprehensive portfolio of clean energy technologies, from wave power to green hydrogen."
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="space-y-16">
                        {services.map((service, i) => (
                            <div
                                key={service.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                            >
                                {/* Image */}
                                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                    <div className="aspect-video bg-navy-900 rounded-sm overflow-hidden relative shadow-lg">
                                        {service.image_url ? (
                                            <img src={service.image_url} alt={service.name} className="w-full h-full object-cover opacity-90 transition-opacity hover:opacity-100" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg viewBox="0 0 100 60" className="w-1/2 opacity-20">
                                                    {[0, 1, 2].map(j => (
                                                        <path key={j}
                                                            d={`M0,${20 + j * 10} C25,${10 + j * 5} 50,${30 + j * 5} 75,${20 + j * 10} C87,${15 + j * 5} 94,${22 + j * 5} 100,${20 + j * 10}`}
                                                            stroke="#2dd4bf" strokeWidth="1.5" fill="none" />
                                                    ))}
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur-sm text-navy-900 text-xs font-body font-semibold tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-sm">
                                                {`Technology ${String(i + 1).padStart(2, '0')}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                    {renderIcon(service.icon)}
                                    <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-4">{service.name}</h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">{service.description}</p>
                                </div>
                            </div>
                        ))}

                        {services.length === 0 && (
                            <p className="text-center text-slate-500 py-16 text-lg">Technologies coming soon.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-navy-900">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="font-display text-4xl text-white mb-5">Interested in a Partnership?</h2>
                    <p className="text-slate-400 mb-8 text-lg">Discuss how our technology portfolio could work for your project or facility.</p>
                    <Link href="/contact" className="btn-primary">Contact Our Team →</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
