import { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import PageHeader from '@/components/PageHeader';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function Contact({ settings = {}, flash = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        organisation: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                toast.success('Message sent! We\'ll be in touch shortly.');
            },
            onError: () => {
                toast.error('Please check the form and try again.');
            },
        });
    };

    return (
        <PublicLayout title="Contact Us" settings={settings}>
            <PageHeader
                label="Get In Touch"
                title="Let's Start a Conversation"
                subtitle="Whether you have a project idea, partnership opportunity, or simply want to learn more, we'd love to hear from you."
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Contact info */}
                    <div className="lg:col-span-2">
                        <p className="section-label mb-4">Contact Details</p>
                        <h2 className="font-display text-3xl text-navy-900 mb-8">Allied Energies Ltd</h2>

                        <div className="space-y-8">
                            {settings.contact_email && (
                                <div>
                                    <p className="text-xs font-body font-semibold tracking-widest uppercase text-slate-400 mb-2">Email</p>
                                    <a href={`mailto:${settings.contact_email}`} className="text-teal-600 hover:text-teal-700 font-medium">
                                        {settings.contact_email}
                                    </a>
                                </div>
                            )}
                            {settings.contact_phone && (
                                <div>
                                    <p className="text-xs font-body font-semibold tracking-widest uppercase text-slate-400 mb-2">Phone</p>
                                    <a href={`tel:${settings.contact_phone}`} className="text-navy-900 hover:text-teal-600 font-medium transition-colors">
                                        {settings.contact_phone}
                                    </a>
                                </div>
                            )}
                            {settings.contact_address && (
                                <div>
                                    <p className="text-xs font-body font-semibold tracking-widest uppercase text-slate-400 mb-2">Address</p>
                                    <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{settings.contact_address}</p>
                                </div>
                            )}
                        </div>

                        {/* Social links */}
                        <div className="mt-10 pt-10 border-t border-slate-100">
                            <p className="text-xs font-body font-semibold tracking-widest uppercase text-slate-400 mb-4">Follow Us</p>
                            <div className="flex gap-4">
                                {settings.linkedin_url && (
                                    <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 bg-navy-900 text-white flex items-center justify-center text-sm hover:bg-teal-500 transition-colors rounded-sm">
                                        in
                                    </a>
                                )}
                                {settings.twitter_url && (
                                    <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 bg-navy-900 text-white flex items-center justify-center text-sm hover:bg-teal-500 transition-colors rounded-sm">
                                        X
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="mt-10 bg-slate-100 rounded-sm aspect-square flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-slate-400 text-sm">Aberdeen, Scotland</p>
                                <p className="font-display text-3xl text-navy-900 mt-2">🌊</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-50 rounded-sm p-8 lg:p-10">
                            <h3 className="font-display text-2xl text-navy-900 mb-6">Send a Message</h3>

                            {flash.success && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-sm text-sm">
                                    {flash.success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`w-full px-4 py-3 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${errors.name ? 'border-red-300' : 'border-slate-200'}`}
                                            placeholder="Your name"
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className={`w-full px-4 py-3 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
                                            placeholder="you@company.com"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                                            Organisation
                                        </label>
                                        <input
                                            type="text"
                                            value={data.organisation}
                                            onChange={e => setData('organisation', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                                            placeholder="Your company"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                                            placeholder="+44..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                                        Subject *
                                    </label>
                                    <select
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className={`w-full px-4 py-3 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${errors.subject ? 'border-red-300' : 'border-slate-200'}`}
                                    >
                                        <option value="">Select a subject...</option>
                                        <option>Project Enquiry</option>
                                        <option>Partnership Opportunity</option>
                                        <option>Investment</option>
                                        <option>Technology Information</option>
                                        <option>Media / Press</option>
                                        <option>General Enquiry</option>
                                    </select>
                                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                                        Message *
                                    </label>
                                    <textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        rows={5}
                                        className={`w-full px-4 py-3 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none ${errors.message ? 'border-red-300' : 'border-slate-200'}`}
                                        placeholder="Tell us about your project or enquiry..."
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Sending...' : 'Send Message →'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
