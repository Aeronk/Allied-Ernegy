import AdminLayout from '@/layouts/AdminLayout';
import ResourceTable from '@/components/Admin/ResourceTable';

export default function HeroSlidesIndex({ items = [] }) {
    const rows = items.map(slide => ({
        id: slide.id,
        cells: [
            slide.image
                ? <img src={slide.image} alt={slide.title} className="w-16 h-10 object-cover rounded-sm" />
                : <div className="w-16 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-slate-400 text-xs">No img</div>,
            <span className="font-medium text-navy-900">{slide.title}</span>,
            <span className="text-slate-500">{slide.subtitle}</span>,
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold ${slide.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {slide.is_active ? 'Active' : 'Hidden'}
            </span>,
            slide.order,
        ],
        editHref: `/admin/hero-slides/${slide.id}/edit`,
        deleteUrl: `/admin/hero-slides/${slide.id}`,
    }));

    return (
        <AdminLayout title="Hero Slides">
            <ResourceTable
                headers={['Image', 'Title', 'Subtitle', 'Status', 'Order']}
                rows={rows}
                createHref="/admin/hero-slides/create"
                createLabel="Add Slide"
            />
        </AdminLayout>
    );
}
