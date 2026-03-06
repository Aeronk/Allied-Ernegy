import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';

export default function PartnersIndex({ partners = [] }) {
    const rows = partners.map(p => ({
        id: p.id,
        cells: [
            p.logo_url ? <img src={p.logo_url} alt={p.name} className="h-8 object-contain max-w-[80px]" /> : '—',
            <span className="font-medium text-navy-900">{p.name}</span>,
            p.country ?? '—',
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.is_featured ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{p.is_featured ? 'Featured' : 'Standard'}</span>,
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{p.is_active ? 'Active' : 'Hidden'}</span>,
        ],
        editHref: `/admin/partners/${p.id}/edit`,
        deleteUrl: `/admin/partners/${p.id}`,
    }));
    return (
        <AdminLayout title="Partners">
            <ResourceTable headers={['Logo', 'Name', 'Country', 'Featured', 'Status']} rows={rows} createHref="/admin/partners/create" createLabel="Add Partner" />
        </AdminLayout>
    );
}
