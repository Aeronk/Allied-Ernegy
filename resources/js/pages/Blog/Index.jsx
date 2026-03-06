import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { Link } from '@inertiajs/react';

export default function BlogIndex({ posts = {}, settings = {} }) {
    const { data = [], links = [], current_page, last_page } = posts;

    return (
        <PublicLayout title="Insights" settings={settings}>
            <PageHeader
                label="Knowledge Hub"
                title="Insights & News"
                subtitle="The latest thinking on wave energy, clean technology, and coastal development."
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {data.length > 0 ? (
                        <>
                            {/* Featured post */}
                            {data[0] && (
                                <Link href={`/blog/${data[0].slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-slate-100 shadow-sm hover:shadow-lg transition-shadow mb-12">
                                    <div className="bg-navy-900 aspect-video lg:aspect-auto overflow-hidden relative">
                                        {data[0].image_url ? (
                                            <img src={data[0].image_url} alt={data[0].title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 to-navy-900 flex items-center justify-center">
                                                <svg viewBox="0 0 100 60" className="w-1/2 opacity-20">
                                                    {[0,1,2].map(i => (
                                                        <path key={i} d={`M0,${20+i*10} C25,${10+i*5} 50,${30+i*5} 75,${20+i*10} C88,${15+i*5} 94,${22+i*5} 100,${20+i*10}`} stroke="#2dd4bf" strokeWidth="1.5" fill="none"/>
                                                    ))}
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-body font-semibold tracking-widest uppercase px-3 py-1">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col justify-center">
                                        {data[0].category && (
                                            <p className="section-label mb-3">{data[0].category}</p>
                                        )}
                                        <h2 className="font-display text-3xl text-navy-900 mb-4 group-hover:text-teal-600 transition-colors">
                                            {data[0].title}
                                        </h2>
                                        {data[0].excerpt && (
                                            <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">{data[0].excerpt}</p>
                                        )}
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            {data[0].author && <span>{data[0].author}</span>}
                                            <span>{data[0].formatted_date ?? data[0].published_at}</span>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Rest of posts */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {data.slice(1).map(post => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="group card block overflow-hidden">
                                        {post.image_url && (
                                            <div className="aspect-video overflow-hidden">
                                                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            {post.category && (
                                                <p className="section-label mb-3">{post.category}</p>
                                            )}
                                            <h3 className="font-display text-xl text-navy-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                                            )}
                                            <p className="text-xs text-slate-400">{post.formatted_date ?? post.published_at}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {last_page > 1 && (
                                <div className="flex justify-center gap-2 mt-12">
                                    {links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`px-4 py-2 text-sm font-body rounded-sm transition-colors ${
                                                    link.active
                                                        ? 'bg-navy-900 text-white'
                                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-teal-300'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span key={i} className="px-4 py-2 text-sm text-slate-400"
                                                dangerouslySetInnerHTML={{ __html: link.label }} />
                                        )
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-slate-500 py-16">No articles published yet.</p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
