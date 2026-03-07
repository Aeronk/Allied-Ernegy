// Services Index
import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';

export function ServicesIndex({ items = [] }) {
    const rows = items.map(s => ({
        id: s.id,
        cells: [
            s.icon_url ? <img src={s.icon_url} alt={s.name} className="w-8 h-8 object-contain" /> : '—',
            <span className="font-medium text-navy-900">{s.name}</span>,
            <span className="text-slate-500 line-clamp-1 max-w-xs">{s.description}</span>,
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{s.is_active ? 'Active' : 'Hidden'}</span>,
            s.order,
        ],
        editHref: `/admin/services/${s.id}/edit`,
        deleteUrl: `/admin/services/${s.id}`,
    }));
    return (
        <AdminLayout title="Services">
            <ResourceTable headers={['Icon', 'Name', 'Description', 'Status', 'Order']} rows={rows} createHref="/admin/services/create" createLabel="Add Service" />
        </AdminLayout>
    );
}

export default ServicesIndex;
