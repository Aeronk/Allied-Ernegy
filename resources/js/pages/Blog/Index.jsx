import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogIndex({ posts = {}, settings = {} }) {
    const { data = [], links = [], current_page, last_page } = posts;

    return (
        <PublicLayout title="Insights" settings={settings}>
            <PageHeader
                label="Knowledge Hub"
                title="Insights & News"
                subtitle="The latest thinking on wave energy, clean technology, and coastal development."
            />

            <section className="py-24 bg-slate-50 relative">
                {/* Decorative orange accent to match Homepage Restyling plan */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>

                <div className="max-w-7xl mx-auto px-6">
                    {data.length > 0 ? (
                        <>
                            {/* Featured post */}
                            {data[0] && (
                                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white mb-16 hover:shadow-lg transition-all duration-300">
                                    <Link href={`/blog/${data[0].slug}`} className="bg-navy-900 aspect-video lg:aspect-auto overflow-hidden relative block">
                                        {data[0].image_url ? (
                                            <img src={data[0].image_url} alt={data[0].title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 to-navy-900 flex items-center justify-center">
                                                <svg viewBox="0 0 100 60" className="w-1/2 opacity-20">
                                                    {[0, 1, 2].map(i => (
                                                        <path key={i} d={`M0,${20 + i * 10} C25,${10 + i * 5} 50,${30 + i * 5} 75,${20 + i * 10} C88,${15 + i * 5} 94,${22 + i * 5} 100,${20 + i * 10}`} stroke="#2dd4bf" strokeWidth="1.5" fill="none" />
                                                    ))}
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6 bg-teal-500 text-white text-xs font-body font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm">
                                            Featured Insight
                                        </div>
                                    </Link>

                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        {data[0].category && (
                                            <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-4">{data[0].category}</p>
                                        )}
                                        <Link href={`/blog/${data[0].slug}`} className="block">
                                            <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-6 group-hover:text-teal-600 transition-colors leading-tight">
                                                {data[0].title}
                                            </h2>
                                        </Link>
                                        {data[0].excerpt && (
                                            <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">{data[0].excerpt}</p>
                                        )}

                                        <div className="mt-auto pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-6 text-sm text-slate-500">
                                                {data[0].author && (
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-slate-400" />
                                                        <span className="font-medium text-slate-700">{data[0].author}</span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <span>{data[0].formatted_date ?? data[0].published_at}</span>
                                                </div>
                                            </div>
                                            <Link href={`/blog/${data[0].slug}`} className="text-teal-600 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                                                Read Article <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Rest of posts Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data.slice(1).map(post => (
                                    <div key={post.id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                        <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                                            {post.image_url ? (
                                                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <svg viewBox="0 0 100 60" className="w-1/3 opacity-10">
                                                        {[0, 1, 2].map(i => (
                                                            <path key={i} d={`M0,${20 + i * 10} C25,${10 + i * 5} 50,${30 + i * 5} 75,${20 + i * 10} C88,${15 + i * 5} 94,${22 + i * 5} 100,${20 + i * 10}`} stroke="#0f172a" strokeWidth="1.5" fill="none" />
                                                        ))}
                                                    </svg>
                                                </div>
                                            )}
                                        </Link>

                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                {post.category ? (
                                                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">{post.category}</span>
                                                ) : (
                                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Article</span>
                                                )}
                                                <span className="text-xs text-slate-400 font-medium">{post.formatted_date ?? post.published_at}</span>
                                            </div>

                                            <Link href={`/blog/${post.slug}`}>
                                                <h3 className="font-display text-xl leading-snug text-navy-900 mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </Link>

                                            {post.excerpt && (
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                                            )}

                                            <div className="mt-auto pt-6 border-t border-slate-100">
                                                <Link href={`/blog/${post.slug}`} className="text-teal-600 font-bold text-sm inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                                    Read More <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {last_page > 1 && (
                                <div className="flex justify-center flex-wrap gap-2 mt-16 pb-8">
                                    {links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`flex items-center justify-center min-w-[40px] h-10 px-4 text-sm font-semibold rounded-lg transition-colors ${link.active
                                                        ? 'bg-teal-500 text-white shadow-sm'
                                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="flex items-center justify-center min-w-[40px] h-10 px-4 text-sm font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
                            <h3 className="font-display text-2xl text-navy-900 mb-2">No Articles Yet</h3>
                            <p className="text-slate-500">Check back soon for the latest updates and insights.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
