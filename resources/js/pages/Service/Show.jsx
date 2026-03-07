import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Zap, Droplets, Waves, Wind, Shield, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function Show({ service, other_services = [], settings = {} }) {
    if (!service) return null;

    const renderIcon = (iconName, props) => {
        if (!iconName || !Icons[iconName]) return <Zap {...props} />;
        const IconComponent = Icons[iconName];
        return <IconComponent {...props} />;
    };

    return (
        <PublicLayout title={service.name} settings={settings}>
            {/* Hero Image / Header */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[50vh] flex items-end bg-navy-900 overflow-hidden">
                {service.image_url && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"></div>
                    </div>
                )}

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
                    <Link href="/offer" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors mb-8 font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Technologies
                    </Link>

                    <div className="w-20 h-20 bg-teal-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-teal-400 mb-8 border border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                        {renderIcon(service.icon, { className: "w-10 h-10", strokeWidth: 1.5 })}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-4xl">
                        {service.name}
                    </h1>
                </div>
            </div>

            <section className="py-24 bg-white relative">
                {/* Decorative orange accent to match Homepage Restyling plan */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>

                <div className="max-w-4xl mx-auto px-6">
                    <div className="prose prose-lg prose-slate max-w-none mb-16 space-y-6 text-slate-600 leading-relaxed text-center">
                        <p className="text-2xl leading-relaxed text-navy-900 font-medium mb-12">{service.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-500 shrink-0">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">Sustainable & Safe</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Designed with zero emissions and minimal environmental impact, prioritizing the safety of marine ecosystems.</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">High Efficiency</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">Engineered to maximize energy capture and grid integration, ensuring consistent and reliable power generation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Technologies */}
            {other_services && other_services.length > 0 && (
                <section className="py-24 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-navy-900 mb-4">Explore More Technologies</h2>
                            <p className="text-slate-600">Discover our other renewable energy solutions.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            {other_services.map(other => (
                                <Link
                                    key={other.slug}
                                    href={`/offer/${other.slug}`}
                                    className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all group"
                                >
                                    <div className="text-slate-400 group-hover:text-teal-500 transition-colors">
                                        {renderIcon(other.icon, { className: "w-6 h-6" })}
                                    </div>
                                    <span className="font-bold text-navy-900">{other.name}</span>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 transition-colors ml-2" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-20 bg-navy-900">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="font-display text-4xl text-white mb-5">Interested in {service.name}?</h2>
                    <p className="text-slate-400 mb-8">Discuss how this technology could work for your project or facility.</p>
                    <Link href="/contact" className="btn-primary">Contact Our Team →</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
