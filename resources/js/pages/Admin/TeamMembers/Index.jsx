import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, Toggle, ImageUpload, FormCard, PageActions } from '@/components/Admin/FormFields';

export function TeamIndex({ items = [] }) {
    const rows = items.map(m => ({
        id: m.id,
        cells: [
            m.image_url
                ? <img src={m.image_url} alt={m.name} className="w-10 h-10 object-cover rounded-full" />
                : <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center text-teal-400 font-display">{m.name[0]}</div>,
            <span className="font-medium text-navy-900">{m.name}</span>,
            <span className="text-slate-600">{m.role}</span>,
            m.order,
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${m.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{m.is_active ? 'Active' : 'Hidden'}</span>,
        ],
        editHref: `/admin/team-members/${m.id}/edit`,
        deleteUrl: `/admin/team-members/${m.id}`,
    }));
    return (
        <AdminLayout title="Team Members">
            <ResourceTable headers={['Photo', 'Name', 'Role', 'Order', 'Status']} rows={rows} createHref="/admin/team-members/create" createLabel="Add Member" />
        </AdminLayout>
    );
}

export function TeamForm({ item = null }) {
    const isEdit = !!item;
    const { data, setData, post, processing, errors } = useForm({
        name: item?.name ?? '',
        role: item?.role ?? '',
        bio: item?.bio ?? '',
        linkedin_url: item?.linkedin_url ?? '',
        order: item?.order ?? 0,
        is_active: item?.is_active ?? true,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? `/admin/team-members/${item.id}?_method=PUT` : '/admin/team-members', { forceFormData: true });
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Team Member' : 'New Team Member'}>
            <form onSubmit={submit}>
                <PageActions backHref="/admin/team-members" saving={processing} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <FormCard title="Member Details">
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <Field label="Full Name" error={errors.name} required>
                                        <Input value={data.name} onChange={e => setData('name', e.target.value)} error={errors.name} />
                                    </Field>
                                    <Field label="Role / Title" error={errors.role} required>
                                        <Input value={data.role} onChange={e => setData('role', e.target.value)} error={errors.role} placeholder="Chief Executive Officer" />
                                    </Field>
                                </div>
                                <Field label="Biography">
                                    <Textarea value={data.bio} onChange={e => setData('bio', e.target.value)} rows={5} placeholder="Short bio visible on hover..." />
                                </Field>
                                <Field label="LinkedIn URL">
                                    <Input value={data.linkedin_url} onChange={e => setData('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/..." />
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
                        <FormCard title="Profile Photo">
                            <ImageUpload current={item?.image_url} onChange={e => setData('image', e.target.files[0])} />
                        </FormCard>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

export default TeamIndex;
