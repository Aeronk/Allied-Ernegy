import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, Toggle, ImageUpload, FormCard, PageActions } from '@/components/Admin/FormFields';

export default function PartnerForm({ partner = null }) {
    const isEdit = !!partner;
    const { data, setData, post, processing, errors } = useForm({
        name: partner?.name ?? '',
        description: partner?.description ?? '',
        country: partner?.country ?? '',
        website_url: partner?.website_url ?? '',
        order: partner?.order ?? 0,
        is_active: partner?.is_active ?? true,
        is_featured: partner?.is_featured ?? false,
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? `/admin/partners/${partner.id}?_method=PUT` : '/admin/partners', { forceFormData: true });
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Partner' : 'New Partner'}>
            <form onSubmit={submit}>
                <PageActions backHref="/admin/partners" saving={processing} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <FormCard title="Partner Details">
                            <div className="space-y-5">
                                <Field label="Partner Name" error={errors.name} required>
                                    <Input value={data.name} onChange={e => setData('name', e.target.value)} error={errors.name} />
                                </Field>
                                <Field label="Description">
                                    <Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} />
                                </Field>
                                <div className="grid grid-cols-2 gap-5">
                                    <Field label="Country">
                                        <Input value={data.country} onChange={e => setData('country', e.target.value)} placeholder="Scotland, UK" />
                                    </Field>
                                    <Field label="Website URL">
                                        <Input value={data.website_url} onChange={e => setData('website_url', e.target.value)} placeholder="https://..." />
                                    </Field>
                                </div>
                            </div>
                        </FormCard>
                    </div>
                    <div className="space-y-6">
                        <FormCard title="Settings">
                            <div className="space-y-5">
                                <Toggle label="Active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                <Toggle label="Featured" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} description="Show on homepage" />
                                <Field label="Display Order">
                                    <Input type="number" value={data.order} onChange={e => setData('order', parseInt(e.target.value))} min="0" />
                                </Field>
                            </div>
                        </FormCard>
                        <FormCard title="Logo">
                            <ImageUpload current={partner?.logo_url} onChange={e => setData('logo', e.target.files[0])} label="Partner Logo" />
                        </FormCard>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
