import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { MapPin, Calendar, Activity, Zap, ArrowLeft } from 'lucide-react';

export default function Show({ project, settings = {} }) {
    if (!project) return null;

    return (
        <PublicLayout title={project.title} settings={settings}>
            {/* Hero Image / Header */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[50vh] flex items-end bg-navy-900">
                {project.image_url && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent"></div>
                    </div>
                )}

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors mb-8 font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Projects
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {project.status && (
                                <span className={`text-xs font-body font-bold tracking-widest uppercase px-3 py-1 rounded-sm bg-white/10 text-white border border-white/20 backdrop-blur-sm`}>
                                    {project.status}
                                </span>
                            )}
                            {project.location && (
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <MapPin className="w-4 h-4" /> {project.location}
                                </div>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </div>
                </div>
            </div>

            <section className="py-24 bg-white relative">
                {/* Decorative orange accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-navy-900 mb-8 border-b border-slate-100 pb-4">Project Overview</h2>

                            <div className="prose prose-lg prose-slate max-w-none mb-16 space-y-6 text-slate-600 leading-relaxed">
                                {project.full_description ? (
                                    <div dangerouslySetInnerHTML={{ __html: project.full_description.replace(/\n/g, '<br/>') }} />
                                ) : (
                                    <p>{project.description}</p>
                                )}
                            </div>

                            {/* Image Gallery */}
                            {project.gallery_urls && project.gallery_urls.length > 0 && (
                                <div className="mt-16">
                                    <h3 className="text-2xl font-bold text-navy-900 mb-8">Project Gallery</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {project.gallery_urls.map((url, i) => (
                                            <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-100 shadow-sm cursor-zoom-in group">
                                                <img
                                                    src={url}
                                                    alt={`Gallery image ${i + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-navy-900 mb-6">Key Specifications</h3>

                                <div className="space-y-6">
                                    {project.capacity && (
                                        <div className="flex items-start gap-4 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-500 shrink-0">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wide">Capacity</div>
                                                <div className="text-lg font-bold text-navy-900">{project.capacity}</div>
                                            </div>
                                        </div>
                                    )}

                                    {project.status && (
                                        <div className="flex items-start gap-4 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wide">Status</div>
                                                <div className="text-lg font-bold text-navy-900">{project.status}</div>
                                            </div>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div className="flex items-start gap-4 pb-6 border-b border-slate-200 last:border-0 last:pb-0">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 shrink-0">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wide">Launch Year</div>
                                                <div className="text-lg font-bold text-navy-900">{project.year}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-navy-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-display font-bold mb-4">Interested in our expertise?</h3>
                                    <p className="text-slate-400 mb-6 text-sm">Contact our engineering team to discuss customized renewable energy solutions for your coastline.</p>
                                    <Link href="/contact" className="btn-primary w-full">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
