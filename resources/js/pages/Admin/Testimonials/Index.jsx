import React from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';
import { FormCard, Field, Input, Textarea, Toggle } from '@/components/Admin/FormFields';

export default function Index({ items = [] }) {
    const rows = items.map(t => ({
        id: t.id,
        cells: [
            <div className="flex items-center gap-3">
                {t.image_url ? (
                    <img src={t.image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <span className="text-xs">No img</span>
                    </div>
                )}
                <span className="font-medium text-navy-900">{t.name}</span>
            </div>,
            t.role || '—',
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {t.is_active ? 'Active' : 'Hidden'}
            </span>,
        ],
        editHref: `/admin/testimonials/${t.id}/edit`,
        deleteUrl: `/admin/testimonials/${t.id}`,
    }));

    return (
        <AdminLayout title="Testimonials">
            <ResourceTable
                headers={['Author', 'Role', 'Status']}
                rows={rows}
                createHref="/admin/testimonials/create"
                createLabel="Add Testimonial"
            />
        </AdminLayout>
    );
}

export function TestimonialForm({ item = null }) {
    const isEdit = !!item;
    const { data, setData, post, processing, errors } = useForm({
        name: item?.name ?? '',
        role: item?.role ?? '',
        quote: item?.quote ?? '',
        order: item?.order ?? 0,
        is_active: item?.is_active ?? true,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        // Let's use Inertia post with _method=PUT for edits to support file uploads seamlessly
        if (isEdit) {
            post(`/admin/testimonials/${item.id}`, {
                data: {
                    _method: 'PUT',
                    ...data,
                },
                forceFormData: true,
            });
        } else {
            post('/admin/testimonials');
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Testimonial' : 'Create Testimonial'}>
            <FormCard title={isEdit ? 'Edit Testimonial' : 'New Testimonial'}>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Author Name" required error={errors.name}>
                            <Input
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                        </Field>

                        <Field label="Role / Title" error={errors.role}>
                            <Input
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                            />
                        </Field>
                    </div>

                    <Field label="Quote" required error={errors.quote}>
                        <Textarea
                            rows={4}
                            value={data.quote}
                            onChange={e => setData('quote', e.target.value)}
                        />
                    </Field>

                    <Field label="Author Image" error={errors.image}>
                        {isEdit && item.image_url && (
                            <img src={item.image_url} alt="Current" className="w-20 h-20 rounded-full object-cover mb-3" />
                        )}
                        <input
                            type="file"
                            className="w-full text-sm font-body text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                            onChange={e => setData('image', e.target.files[0])}
                            accept="image/*"
                        />
                    </Field>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <Field label="Display Order">
                            <Input
                                type="number"
                                value={data.order}
                                onChange={e => setData('order', parseInt(e.target.value))}
                            />
                        </Field>

                        <div className="pb-2">
                            <Toggle
                                label=""
                                description="Publish Active"
                                checked={data.is_active}
                                onChange={e => setData('is_active', e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100 gap-3">
                        <button
                            type="button"
                            onClick={() => router.get('/admin/testimonials')}
                            className="btn-outline px-6 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary px-8 py-2 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Testimonial'}
                        </button>
                    </div>
                </form>
            </FormCard>
        </AdminLayout>
    );
}
