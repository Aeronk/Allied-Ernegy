import PublicLayout from '@/layouts/PublicLayout';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';

export default function BlogShow({ post, relatedPosts = [], settings = {} }) {
    return (
        <PublicLayout title={post.title} description={post.excerpt} settings={settings}>
            {/* Hero */}
            <section className="relative pt-36 pb-20 bg-navy-900 overflow-hidden">
                {post.image_url ? (
                    <>
                        <div className="absolute inset-0">
                            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover opacity-25 scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/40"></div>
                        </div>
                    </>
                ) : (
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                )}

                <div className="max-w-4xl mx-auto px-8 relative">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-teal-400 text-sm mb-10 hover:text-white transition-colors font-semibold">
                        <ArrowLeft className="w-4 h-4" /> Back to Insights
                    </Link>
                    {post.category && (
                        <div className="mb-5">
                            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest bg-teal-400/10 border border-teal-400/30 px-4 py-1.5 rounded-full">
                                {post.category}
                            </span>
                        </div>
                    )}
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-slate-300 text-xl leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm pt-6 border-t border-white/10">
                        {post.author && (
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-500" />
                                <span className="text-white font-semibold">{post.author}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span>{post.formatted_date ?? post.published_at}</span>
                        </div>
                        {post.read_time && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span>{post.read_time} min read</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-10 fill-white">
                        <path d="M0,20 C300,40 600,0 900,20 C1050,30 1150,15 1200,20 L1200,40 L0,40 Z" />
                    </svg>
                </div>
            </section>

            {/* Article content */}
            <section className="py-20 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                <div className="max-w-3xl mx-auto px-8">
                    <div
                        className="prose prose-slate prose-lg max-w-none
                            prose-headings:font-display prose-headings:text-navy-900
                            prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-navy-900
                            prose-blockquote:border-l-4 prose-blockquote:border-orange-400
                            prose-blockquote:bg-orange-50 prose-blockquote:not-italic
                            prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-slate-100">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Tag className="w-4 h-4 text-slate-400" />
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-semibold hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-8">
                        <h2 className="font-display text-3xl text-navy-900 mb-10">More Insights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(related => (
                                <div key={related.id} className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                    <Link href={`/blog/${related.slug}`} className="block aspect-[16/10] overflow-hidden bg-slate-100">
                                        {related.image_url ? (
                                            <img src={related.image_url} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
                                        )}
                                    </Link>
                                    <div className="p-6 flex flex-col flex-1">
                                        {related.category && (
                                            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">{related.category}</span>
                                        )}
                                        <Link href={`/blog/${related.slug}`}>
                                            <h3 className="font-display text-lg text-navy-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                                                {related.title}
                                            </h3>
                                        </Link>
                                        <p className="text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100">{related.formatted_date ?? related.published_at}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
