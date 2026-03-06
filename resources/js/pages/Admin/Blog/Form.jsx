import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, Toggle, ImageUpload, FormCard, PageActions } from '@/components/Admin/FormFields';

export default function BlogForm({ post = null }) {
    const isEdit = !!post;
    const { data, setData, post: submit, processing, errors } = useForm({
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        excerpt: post?.excerpt ?? '',
        content: post?.content ?? '',
        category: post?.category ?? '',
        author: post?.author ?? '',
        tags: post?.tags ?? '',
        meta_description: post?.meta_description ?? '',
        is_published: post?.is_published ?? false,
        is_featured: post?.is_featured ?? false,
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(isEdit ? `/admin/blog/${post.id}?_method=PUT` : '/admin/blog', { forceFormData: true });
    };

    const generateSlug = () => {
        setData('slug', data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Blog Post' : 'New Blog Post'}>
            <form onSubmit={handleSubmit}>
                <PageActions backHref="/admin/blog" saving={processing} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <FormCard title="Post Content">
                            <div className="space-y-5">
                                <Field label="Title" error={errors.title} required>
                                    <Input value={data.title} onChange={e => setData('title', e.target.value)} error={errors.title} />
                                </Field>
                                <Field label="URL Slug" error={errors.slug}>
                                    <div className="flex gap-2">
                                        <Input value={data.slug} onChange={e => setData('slug', e.target.value)} className="flex-1" />
                                        <button type="button" onClick={generateSlug} className="px-3 py-2 bg-slate-100 text-slate-600 text-xs rounded-sm hover:bg-slate-200 transition-colors whitespace-nowrap">
                                            Auto-generate
                                        </button>
                                    </div>
                                </Field>
                                <Field label="Excerpt" error={errors.excerpt}>
                                    <Textarea value={data.excerpt} onChange={e => setData('excerpt', e.target.value)} rows={3} placeholder="Brief summary shown in listings..." />
                                </Field>
                                <Field label="Content (HTML)" error={errors.content} required>
                                    <Textarea value={data.content} onChange={e => setData('content', e.target.value)} rows={16} className="font-mono text-xs" placeholder="<p>Article content...</p>" />
                                </Field>
                            </div>
                        </FormCard>

                        <FormCard title="SEO">
                            <Field label="Meta Description">
                                <Textarea value={data.meta_description} onChange={e => setData('meta_description', e.target.value)} rows={2} placeholder="Search engine description (max 160 chars)" />
                            </Field>
                        </FormCard>
                    </div>

                    <div className="space-y-6">
                        <FormCard title="Publishing">
                            <div className="space-y-5">
                                <Toggle label="Published" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} description="Make visible on the website" />
                                <Toggle label="Featured" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} description="Show on homepage" />
                            </div>
                        </FormCard>

                        <FormCard title="Metadata">
                            <div className="space-y-5">
                                <Field label="Category">
                                    <Input value={data.category} onChange={e => setData('category', e.target.value)} placeholder="Wave Energy" />
                                </Field>
                                <Field label="Author">
                                    <Input value={data.author} onChange={e => setData('author', e.target.value)} placeholder="Allied Energies Team" />
                                </Field>
                                <Field label="Tags (comma-separated)">
                                    <Input value={data.tags} onChange={e => setData('tags', e.target.value)} placeholder="wave energy, renewables" />
                                </Field>
                            </div>
                        </FormCard>

                        <FormCard title="Cover Image">
                            <ImageUpload current={post?.image_url} onChange={e => setData('image', e.target.files[0])} />
                        </FormCard>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
