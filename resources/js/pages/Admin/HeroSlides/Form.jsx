import AdminLayout from '@/layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { Field, Input, Textarea, Toggle, ImageUpload, FormCard, PageActions } from '@/components/Admin/FormFields';

export default function HeroSlideForm({ slide = null }) {
    const isEdit = !!slide;
    const { data, setData, post, put, processing, errors } = useForm({
        title: slide?.title ?? '',
        subtitle: slide?.subtitle ?? '',
        description: slide?.description ?? '',
        cta_primary_text: slide?.cta_primary_text ?? '',
        cta_primary_url: slide?.cta_primary_url ?? '',
        cta_secondary_text: slide?.cta_secondary_text ?? '',
        cta_secondary_url: slide?.cta_secondary_url ?? '',
        order: slide?.order ?? 0,
        is_active: slide?.is_active ?? true,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true };
        if (isEdit) {
            post(`/admin/hero-slides/${slide.id}?_method=PUT`, options);
        } else {
            post('/admin/hero-slides', options);
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Hero Slide' : 'New Hero Slide'}>
            <form onSubmit={submit}>
                <PageActions backHref="/admin/hero-slides" saving={processing} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <FormCard title="Slide Content">
                            <div className="space-y-5">
                                <Field label="Title" error={errors.title} required>
                                    <Input value={data.title} onChange={e => setData('title', e.target.value)} error={errors.title} placeholder="Main headline" />
                                </Field>
                                <Field label="Subtitle / Label" error={errors.subtitle}>
                                    <Input value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} placeholder="Small label above title" />
                                </Field>
                                <Field label="Description" error={errors.description}>
                                    <Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} placeholder="Supporting paragraph text" />
                                </Field>
                            </div>
                        </FormCard>

                        <FormCard title="Call-to-Action Buttons">
                            <div className="grid grid-cols-2 gap-5">
                                <Field label="Primary Button Text">
                                    <Input value={data.cta_primary_text} onChange={e => setData('cta_primary_text', e.target.value)} placeholder="Explore Technologies" />
                                </Field>
                                <Field label="Primary Button URL">
                                    <Input value={data.cta_primary_url} onChange={e => setData('cta_primary_url', e.target.value)} placeholder="/offer" />
                                </Field>
                                <Field label="Secondary Button Text">
                                    <Input value={data.cta_secondary_text} onChange={e => setData('cta_secondary_text', e.target.value)} placeholder="Learn More" />
                                </Field>
                                <Field label="Secondary Button URL">
                                    <Input value={data.cta_secondary_url} onChange={e => setData('cta_secondary_url', e.target.value)} placeholder="/about" />
                                </Field>
                            </div>
                        </FormCard>
                    </div>

                    <div className="space-y-6">
                        <FormCard title="Settings">
                            <div className="space-y-5">
                                <Toggle
                                    label="Active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    description="Show this slide on the homepage"
                                />
                                <Field label="Display Order" error={errors.order}>
                                    <Input type="number" value={data.order} onChange={e => setData('order', parseInt(e.target.value))} min="0" />
                                </Field>
                            </div>
                        </FormCard>

                        <FormCard title="Background Image">
                            <ImageUpload
                                current={slide?.image_url}
                                onChange={e => setData('image', e.target.files[0])}
                            />
                        </FormCard>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
