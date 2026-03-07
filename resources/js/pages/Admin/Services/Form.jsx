import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, Toggle, ImageUpload, FormCard, PageActions } from '@/components/Admin/FormFields';

export default function ServiceForm({ item = null }) {
    const isEdit = !!item;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        title: item?.title ?? '',
        description: item?.description ?? '',
        order: item?.order ?? 0,
        is_active: item?.is_active ?? true,
        image: null,
        icon: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? `/admin/services/${item.id}` : '/admin/services', { forceFormData: true });
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Service' : 'New Service'}>
            <form onSubmit={submit}>
                <PageActions backHref="/admin/services" saving={processing} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <FormCard title="Service Details">
                            <div className="space-y-5">
                                <Field label="Service Title" error={errors.title} required>
                                    <Input value={data.title} onChange={e => setData('title', e.target.value)} error={errors.title} placeholder="e.g. Ocean Wave Energy" />
                                </Field>
                                <Field label="Description" error={errors.description} required>
                                    <Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={5} placeholder="Describe this service or technology..." />
                                </Field>
                            </div>
                        </FormCard>
                    </div>
                    <div className="space-y-6">
                        <FormCard title="Settings">
                            <div className="space-y-5">
                                <Toggle label="Active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                <Field label="Display Order">
                                    <Input type="number" value={data.order} onChange={e => setData('order', parseInt(e.target.value))} min="0" />
                                </Field>
                            </div>
                        </FormCard>
                        <FormCard title="Service Image">
                            <ImageUpload current={item?.image} onChange={e => setData('image', e.target.files[0])} />
                        </FormCard>
                        <FormCard title="Icon">
                            <ImageUpload current={item?.icon_url} onChange={e => setData('icon', e.target.files[0])} label="Icon Image (SVG or PNG)" />
                        </FormCard>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
