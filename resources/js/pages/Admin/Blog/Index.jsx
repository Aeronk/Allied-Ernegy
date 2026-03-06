import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';

export default function BlogIndex({ posts = [] }) {
    const rows = posts.map(p => ({
        id: p.id,
        cells: [
            <span className="font-medium text-navy-900 line-clamp-1 max-w-xs">{p.title}</span>,
            p.category ?? '—',
            p.author ?? '—',
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {p.is_published ? 'Published' : 'Draft'}
            </span>,
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.is_featured ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                {p.is_featured ? 'Featured' : 'Standard'}
            </span>,
            p.published_at ? new Date(p.published_at).toLocaleDateString() : '—',
        ],
        editHref: `/admin/blog/${p.id}/edit`,
        deleteUrl: `/admin/blog/${p.id}`,
    }));

    return (
        <AdminLayout title="Blog Posts">
            <ResourceTable
                headers={['Title', 'Category', 'Author', 'Status', 'Featured', 'Published']}
                rows={rows}
                createHref="/admin/blog/create"
                createLabel="New Post"
            />
        </AdminLayout>
    );
}
