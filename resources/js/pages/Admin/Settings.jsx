import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Field, Input, Textarea, FormCard } from '@/components/Admin/FormFields';
import { toast } from 'react-toastify';

export default function Settings({ settings = {}, flash = {} }) {
    const { data, setData, post, processing } = useForm({
        site_name: settings.site_name ?? 'Allied Energies Ltd',
        site_tagline: settings.site_tagline ?? '',
        contact_email: settings.contact_email ?? '',
        contact_phone: settings.contact_phone ?? '',
        contact_address: settings.contact_address ?? '',
        linkedin_url: settings.linkedin_url ?? '',
        twitter_url: settings.twitter_url ?? '',
        meta_description: settings.meta_description ?? '',
        meta_keywords: settings.meta_keywords ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            onSuccess: () => toast.success('Settings saved successfully!'),
            onError: () => toast.error('Failed to save settings.'),
        });
    };

    return (
        <AdminLayout title="Site Settings">
            <form onSubmit={submit}>
                <div className="flex justify-end mb-6">
                    <button type="submit" disabled={processing} className="btn-primary text-sm py-2.5 disabled:opacity-60">
                        {processing ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormCard title="General">
                        <div className="space-y-5">
                            <Field label="Site Name">
                                <Input value={data.site_name} onChange={e => setData('site_name', e.target.value)} />
                            </Field>
                            <Field label="Tagline">
                                <Input value={data.site_tagline} onChange={e => setData('site_tagline', e.target.value)} placeholder="Harnessing the Power of Waves" />
                            </Field>
                        </div>
                    </FormCard>

                    <FormCard title="Contact Information">
                        <div className="space-y-5">
                            <Field label="Email Address">
                                <Input type="email" value={data.contact_email} onChange={e => setData('contact_email', e.target.value)} placeholder="info@allied-energies.com" />
                            </Field>
                            <Field label="Phone Number">
                                <Input value={data.contact_phone} onChange={e => setData('contact_phone', e.target.value)} placeholder="+44..." />
                            </Field>
                            <Field label="Address">
                                <Textarea value={data.contact_address} onChange={e => setData('contact_address', e.target.value)} rows={3} placeholder="Office address..." />
                            </Field>
                        </div>
                    </FormCard>

                    <FormCard title="Social Media">
                        <div className="space-y-5">
                            <Field label="LinkedIn URL">
                                <Input value={data.linkedin_url} onChange={e => setData('linkedin_url', e.target.value)} placeholder="https://linkedin.com/company/..." />
                            </Field>
                            <Field label="Twitter / X URL">
                                <Input value={data.twitter_url} onChange={e => setData('twitter_url', e.target.value)} placeholder="https://twitter.com/..." />
                            </Field>
                        </div>
                    </FormCard>

                    <FormCard title="SEO / Meta">
                        <div className="space-y-5">
                            <Field label="Meta Description">
                                <Textarea value={data.meta_description} onChange={e => setData('meta_description', e.target.value)} rows={3} placeholder="Default meta description for search engines..." />
                            </Field>
                            <Field label="Meta Keywords">
                                <Input value={data.meta_keywords} onChange={e => setData('meta_keywords', e.target.value)} placeholder="wave energy, clean energy, ocean power..." />
                            </Field>
                        </div>
                    </FormCard>
                </div>
            </form>
        </AdminLayout>
    );
}
