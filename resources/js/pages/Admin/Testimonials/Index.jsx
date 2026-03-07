import React from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, Table, StatusBadge, ActionButtons } from '@/components/Admin/UI';

export default function Index({ items = [] }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(`/admin/testimonials/${id}`);
        }
    };

    return (
        <AdminLayout title="Testimonials">
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Testimonials</h2>
                    <ActionButtons onAdd={() => router.get('/admin/testimonials/create')} />
                </div>

                <Table
                    headers={['Author', 'Role', 'Status', 'Actions']}
                    data={items.map(t => [
                        <div className="flex items-center gap-3" key={t.id}>
                            {t.image_url ? (
                                <img src={t.image_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <span className="text-xs">No img</span>
                                </div>
                            )}
                            <span className="font-semibold">{t.name}</span>
                        </div>,
                        t.role || '-',
                        <StatusBadge key={`status-${t.id}`} active={t.is_active} />,
                        <ActionButtons
                            key={`actions-${t.id}`}
                            onEdit={() => router.get(`/admin/testimonials/${t.id}/edit`)}
                            onDelete={() => handleDelete(t.id)}
                        />
                    ])}
                />
            </Card>
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
            <Card>
                <form onSubmit={submit} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Author Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className="w-full border-slate-200 rounded-lg"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Role / Title</label>
                            <input
                                type="text"
                                className="w-full border-slate-200 rounded-lg"
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                            />
                            {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Quote <span className="text-red-500">*</span></label>
                        <textarea
                            className="w-full border-slate-200 rounded-lg h-32"
                            value={data.quote}
                            onChange={e => setData('quote', e.target.value)}
                        />
                        {errors.quote && <div className="text-red-500 text-sm mt-1">{errors.quote}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Author Image</label>
                        {isEdit && item.image_url && (
                            <img src={item.image_url} alt="Current" className="w-20 h-20 rounded-full object-cover mb-3" />
                        )}
                        <input
                            type="file"
                            className="w-full"
                            onChange={e => setData('image', e.target.files[0])}
                            accept="image/*"
                        />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Display Order</label>
                            <input
                                type="number"
                                className="w-full border-slate-200 rounded-lg"
                                value={data.order}
                                onChange={e => setData('order', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="flex items-center mt-7">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5"
                                />
                                <span className="text-sm font-medium">Publish Active</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => router.get('/admin/testimonials')}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-primary transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Testimonial'}
                        </button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
}
