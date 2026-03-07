import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';

const statusColors = {
    planning: 'bg-amber-100 text-amber-700',
    development: 'bg-blue-100 text-blue-700',
    construction: 'bg-orange-100 text-orange-700',
    operational: 'bg-green-100 text-green-700',
    completed: 'bg-slate-100 text-slate-600',
};

export default function Projects({ projects = [], settings = {} }) {
    return (
        <PublicLayout title="Projects" settings={settings}>
            <PageHeader
                label="Portfolio"
                title="Our Projects"
                subtitle="From early-stage development to operational installations, our projects span coastlines across the globe."
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {projects.length > 0 ? (
                        <div className="space-y-12">
                            {projects.map((project, i) => (
                                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    {/* Image */}
                                    <div className="lg:col-span-2 bg-navy-900 aspect-video lg:aspect-auto relative overflow-hidden">
                                        {project.image_url ? (
                                            <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-80" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                                <svg viewBox="0 0 120 80" className="w-full opacity-20">
                                                    {[0, 1, 2].map(j => (
                                                        <path key={j}
                                                            d={`M0,${30 + j * 10} C30,${15 + j * 5} 60,${45 + j * 5} 90,${30 + j * 10} C105,${22 + j * 5} 113,${32 + j * 5} 120,${30 + j * 10}`}
                                                            stroke="#2dd4bf" strokeWidth="2" fill="none" />
                                                    ))}
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="font-mono text-teal-400 text-xs">{String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col h-full">
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                            <h2 className="font-display text-2xl text-navy-900 group-hover:text-primary transition-colors">
                                                <Link href={`/projects/${project.id}`}>{project.title}</Link>
                                            </h2>
                                            {project.status && (
                                                <span className={`text-xs font-body font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${statusColors[project.status] ?? statusColors.planning}`}>
                                                    {project.status}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-6 mb-5 text-sm">
                                            {project.location && (
                                                <span className="text-slate-500">📍 {project.location}</span>
                                            )}
                                            {project.capacity && (
                                                <span className="text-teal-600 font-semibold">{project.capacity}</span>
                                            )}
                                            {project.year && (
                                                <span className="text-slate-500">{project.year}</span>
                                            )}
                                        </div>

                                        {project.description && (
                                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <Link href={`/projects/${project.id}`} className="text-primary font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                                                View Project Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-slate-500 py-16">Projects coming soon.</p>
                    )}
                </div>
            </section>

            <section className="py-20 bg-navy-900">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="font-display text-4xl text-white mb-5">Have a Project in Mind?</h2>
                    <p className="text-slate-400 mb-8">We partner with port authorities, energy developers, and coastal communities to develop wave energy projects from concept to operation.</p>
                    <Link href="/contact" className="btn-primary">Discuss Your Project →</Link>
                </div>
            </section>
        </PublicLayout>
    );
}
