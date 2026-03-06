import PublicLayout from '@/layouts/PublicLayout';
import { Link } from '@inertiajs/react';

export default function BlogShow({ post, relatedPosts = [], settings = {} }) {
    return (
        <PublicLayout title={post.title} description={post.excerpt} settings={settings}>
            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-navy-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
                {post.image_url && (
                    <div className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${post.image_url})` }} />
                )}
                <div className="max-w-4xl mx-auto px-6 relative">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-teal-400 text-sm mb-8 hover:text-teal-300 transition-colors">
                        ← Back to Insights
                    </Link>
                    {post.category && (
                        <p className="section-label mb-4">{post.category}</p>
                    )}
                    <h1 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-5 text-slate-400 text-sm">
                        {post.author && <span className="text-white font-medium">{post.author}</span>}
                        <span>{post.formatted_date ?? post.published_at}</span>
                        {post.read_time && <span>{post.read_time} min read</span>}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-10 fill-white">
                        <path d="M0,20 C300,40 600,0 900,20 C1050,30 1150,15 1200,20 L1200,40 L0,40 Z"/>
                    </svg>
                </div>
            </section>

            {/* Article content */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    {post.image_url && (
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full aspect-video object-cover rounded-sm shadow-lg mb-12"
                        />
                    )}
                    <div
                        className="prose prose-slate prose-lg max-w-none
                            prose-headings:font-display prose-headings:text-navy-900
                            prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-navy-900 prose-blockquote:border-teal-500
                            prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:px-6"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-body">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-sm font-body">
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
                <section className="py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="font-display text-2xl text-navy-900 mb-8">More Insights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(related => (
                                <Link key={related.id} href={`/blog/${related.slug}`} className="group card block overflow-hidden">
                                    {related.image_url && (
                                        <div className="aspect-video overflow-hidden">
                                            <img src={related.image_url} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="font-display text-lg text-navy-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                                            {related.title}
                                        </h3>
                                        <p className="text-xs text-slate-400">{related.formatted_date ?? related.published_at}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
