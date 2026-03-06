import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';

export default function Offer({ services = [], settings = {} }) {
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
                                    <div className="aspect-video bg-navy-900 rounded-sm overflow-hidden relative">
                                        {service.image_url ? (
                                            <img src={service.image_url} alt={service.name} className="w-full h-full object-cover opacity-80" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg viewBox="0 0 100 60" className="w-1/2 opacity-20">
                                                    {[0,1,2].map(j => (
                                                        <path key={j}
                                                            d={`M0,${20 + j*10} C25,${10 + j*5} 50,${30 + j*5} 75,${20 + j*10} C87,${15 + j*5} 94,${22 + j*5} 100,${20 + j*10}`}
                                                            stroke="#2dd4bf" strokeWidth="1.5" fill="none"/>
                                                    ))}
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-teal-500/20 text-teal-400 text-xs font-body font-semibold tracking-widest uppercase px-3 py-1.5">
                                                {`Technology ${String(i + 1).padStart(2, '0')}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                    {service.icon_url && (
                                        <img src={service.icon_url} alt="" className="w-12 h-12 object-contain mb-5" />
                                    )}
                                    <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-4">{service.name}</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                                    {service.features && (
                                        <ul className="space-y-2">
                                            {(Array.isArray(service.features) ? service.features : [service.features]).map((f, fi) => (
                                                <li key={fi} className="flex items-start gap-3 text-sm text-slate-700">
                                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}

                        {services.length === 0 && (
                            <p className="text-center text-slate-500 py-16">Technologies coming soon.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-navy-900">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="font-display text-4xl text-white mb-5">Interested in a Partnership?</h2>
                    <p className="text-slate-400 mb-8">Discuss how our technology portfolio could work for your project or facility.</p>
                    <Link href="/contact" className="btn-primary">Contact Our Team →</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
