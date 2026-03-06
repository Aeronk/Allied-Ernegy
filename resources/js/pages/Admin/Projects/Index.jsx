import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, Select, Toggle, ImageUpload, FormCard, PageActions } from '@/components/Admin/FormFields';

export function ProjectsIndex({ projects = [] }) {
    const statusColors = {
        planning: 'bg-amber-100 text-amber-700',
        development: 'bg-blue-100 text-blue-700',
        construction: 'bg-orange-100 text-orange-700',
        operational: 'bg-green-100 text-green-700',
        completed: 'bg-slate-100 text-slate-600',
    };
    const rows = projects.map(p => ({
        id: p.id,
        cells: [
            p.image_url ? <img src={p.image_url} alt={p.title} className="w-16 h-10 object-cover rounded-sm" /> : '—',
            <span className="font-medium text-navy-900">{p.title}</span>,
            p.location ?? '—',
            p.capacity ?? '—',
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[p.status] ?? 'bg-slate-100 text-slate-500'}`}>{p.status ?? 'N/A'}</span>,
        ],
        editHref: `/admin/projects/${p.id}/edit`,
        deleteUrl: `/admin/projects/${p.id}`,
    }));
    return (
        <AdminLayout title="Projects">
            <ResourceTable headers={['Image', 'Title', 'Location', 'Capacity', 'Status']} rows={rows} createHref="/admin/projects/create" createLabel="Add Project" />
        </AdminLayout>
    );
}

export function ProjectForm({ project = null }) {
    const isEdit = !!project;
    const { data, setData, post, processing, errors } = useForm({
        title: project?.title ?? '',
        description: project?.description ?? '',
        location: project?.location ?? '',
        capacity: project?.capacity ?? '',
        status: project?.status ?? 'planning',
        year: project?.year ?? '',
        order: project?.order ?? 0,
        is_active: project?.is_active ?? true,
        is_featured: project?.is_featured ?? false,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(isEdit ? `/admin/projects/${project.id}?_method=PUT` : '/admin/projects', { forceFormData: true });
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Project' : 'New Project'}>
            <form onSubmit={submit}>
                <PageActions backHref="/admin/projects" saving={processing} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <FormCard title="Project Details">
                            <div className="space-y-5">
                                <Field label="Project Title" error={errors.title} required>
                                    <Input value={data.title} onChange={e => setData('title', e.target.value)} error={errors.title} />
                                </Field>
                                <Field label="Description">
                                    <Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={5} />
                                </Field>
                                <div className="grid grid-cols-2 gap-5">
                                    <Field label="Location">
                                        <Input value={data.location} onChange={e => setData('location', e.target.value)} placeholder="Ngqura Port, South Africa" />
                                    </Field>
                                    <Field label="Capacity">
                                        <Input value={data.capacity} onChange={e => setData('capacity', e.target.value)} placeholder="8.3MW" />
                                    </Field>
                                    <Field label="Status">
                                        <Select value={data.status} onChange={e => setData('status', e.target.value)}>
                                            <option value="planning">Planning</option>
                                            <option value="development">Development</option>
                                            <option value="construction">Construction</option>
                                            <option value="operational">Operational</option>
                                            <option value="completed">Completed</option>
                                        </Select>
                                    </Field>
                                    <Field label="Year">
                                        <Input value={data.year} onChange={e => setData('year', e.target.value)} placeholder="2025" />
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
                        <FormCard title="Project Image">
                            <ImageUpload current={project?.image_url} onChange={e => setData('image', e.target.files[0])} />
                        </FormCard>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

export default ProjectsIndex;
