import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, FormCard } from '@/components/Admin/FormFields';
import { toast } from 'react-toastify';
import { useState } from 'react';

// Helper to stringify JSON for editing
const stringify = (val) => {
    if (!val) return '[]';
    return typeof val === 'string' ? val : JSON.stringify(val, null, 4);
};

export default function Pages({ contentSettings = {} }) {
    const [activeTab, setActiveTab] = useState('home');

    const { data, setData, put, processing } = useForm({
        // Home Page
        home_stats: stringify(contentSettings.home_stats),
        home_process: stringify(contentSettings.home_process),
        home_impact: stringify(contentSettings.home_impact),
        home_testimonials: stringify(contentSettings.home_testimonials),
        home_faqs: stringify(contentSettings.home_faqs),
        home_global: stringify(contentSettings.home_global),

        // About Page
        about_mission_title: contentSettings.about_mission_title ?? 'Turning Tides Into Terawatts',
        about_mission_text: contentSettings.about_mission_text ?? "Allied Energies Ltd was established with a singular vision: to make ocean wave energy a mainstream renewable power source...\n\nOur approach combines proven wave energy converter technologies with innovative project development...\n\nFrom the 8.3MW Ngqura Port project in South Africa to developments at Fraserburgh Harbour in Scotland...",
        about_quote: contentSettings.about_quote ?? "To be the leading developer of commercial wave energy projects, delivering clean, affordable, and predictable power to coastal communities worldwide."
    });

    const submit = (e) => {
        e.preventDefault();

        // Validate JSON before submitting
        const jsonFields = ['home_stats', 'home_process', 'home_impact', 'home_testimonials', 'home_faqs', 'home_global'];

        // We need to parse back into arrays to submit as JSON to backend
        let payload = { ...data };
        try {
            jsonFields.forEach(field => {
                const parsed = JSON.parse(data[field]);
                if (!Array.isArray(parsed)) throw new Error(`${field} must be an array`);
                payload[field] = parsed;
            });
        } catch (err) {
            toast.error('Invalid JSON in one of the fields: ' + err.message);
            return;
        }

        import('@inertiajs/react').then(({ router }) => {
            router.put('/admin/pages', payload, {
                onSuccess: () => toast.success('Page content updated successfully!'),
                onError: () => toast.error('Failed to update page content.'),
            });
        });
    };

    return (
        <AdminLayout title="Site Content & Pages">
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('home')}
                    className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'home' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Home Page
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'about' ? 'border-teal-500 text-teal-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    About Page
                </button>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                // To submit with custom payload handling (parsing JSON), we do a manual put call via useForm which is tricky.
                // The easiest way to handle this with Inertia's useForm is to transform data just before submission
                // using the transform() method, but since we didn't declare it, we can just interceptsubmit and do a router.put
                // Actually `useForm` put takes options or URL. We can mutate `data` by using `transform`.
            }}>
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-slate-500">Edit the text and structured data used across the website pages.</p>
                    <button type="button" onClick={submit} disabled={processing} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
                        {processing ? 'Saving...' : 'Save All Pages'}
                    </button>
                </div>

                {activeTab === 'home' && (
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-4">
                            <strong>Note:</strong> These fields require strict JSON arrays (e.g. <code>{`[{"label": "...", "value": "..."}]`}</code>). Please ensure syntax is correct before saving.
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <FormCard title="Home Stats (Hero Bottom)">
                                <Field label="JSON Array of Objects (label, value, icon)">
                                    <Textarea value={data.home_stats} onChange={e => setData('home_stats', e.target.value)} rows={10} className="font-mono text-xs" />
                                </Field>
                            </FormCard>

                            <FormCard title="Process Steps">
                                <Field label="JSON Array of Objects (title, description, icon)">
                                    <Textarea value={data.home_process} onChange={e => setData('home_process', e.target.value)} rows={10} className="font-mono text-xs" />
                                </Field>
                            </FormCard>

                            <FormCard title="Impact Metrics">
                                <Field label="JSON Array (label, value, icon, color)">
                                    <Textarea value={data.home_impact} onChange={e => setData('home_impact', e.target.value)} rows={10} className="font-mono text-xs" />
                                </Field>
                            </FormCard>

                            <FormCard title="Testimonials">
                                <Field label="JSON Array (quote, author, role, image)">
                                    <Textarea value={data.home_testimonials} onChange={e => setData('home_testimonials', e.target.value)} rows={10} className="font-mono text-xs" />
                                </Field>
                            </FormCard>

                            <FormCard title="FAQs">
                                <Field label="JSON Array (question, answer)">
                                    <Textarea value={data.home_faqs} onChange={e => setData('home_faqs', e.target.value)} rows={10} className="font-mono text-xs" />
                                </Field>
                            </FormCard>

                            <FormCard title="Global Locations">
                                <Field label="JSON Array (region, locations[])">
                                    <Textarea value={data.home_global} onChange={e => setData('home_global', e.target.value)} rows={10} className="font-mono text-xs" />
                                </Field>
                            </FormCard>
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="space-y-6">
                        <FormCard title="Who We Are Section">
                            <div className="space-y-5">
                                <Field label="Section Title">
                                    <Input value={data.about_mission_title} onChange={e => setData('about_mission_title', e.target.value)} />
                                </Field>
                                <Field label="Mission Content (Paragraphs separated by blank lines)">
                                    <Textarea value={data.about_mission_text} onChange={e => setData('about_mission_text', e.target.value)} rows={12} />
                                </Field>
                            </div>
                        </FormCard>

                        <FormCard title="Our Mission Statement">
                            <Field label="Quote text">
                                <Textarea value={data.about_quote} onChange={e => setData('about_quote', e.target.value)} rows={4} />
                            </Field>
                        </FormCard>
                    </div>
                )}
            </form>
        </AdminLayout>
    );
}
