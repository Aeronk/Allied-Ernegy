import { useForm, Head } from '@inertiajs/react';

export default function Login({ errors: pageErrors = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen bg-navy-900 flex items-center justify-center px-6">
                {/* Background grid */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="w-full max-w-md relative">
                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-10 h-10">
                                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                                    <path d="M4 20 C8 12, 14 8, 16 16 C18 24, 24 20, 28 12"
                                        stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                                    <path d="M4 24 C8 16, 14 12, 16 20 C18 28, 24 24, 28 16"
                                        stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
                                </svg>
                            </div>
                            <span className="font-display text-white text-2xl">Allied Energies</span>
                        </div>
                        <p className="text-slate-400 text-sm">CMS Administration Portal</p>
                    </div>

                    <div className="bg-white rounded-sm shadow-2xl p-8">
                        <h1 className="font-display text-2xl text-navy-900 mb-6">Sign In</h1>

                        {pageErrors.email && (
                            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                                {pageErrors.email}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    autoComplete="email"
                                    className={`w-full px-4 py-3 border rounded-sm text-sm font-body focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
                                    placeholder="admin@allied-energies.com"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    className={`w-full px-4 py-3 border rounded-sm text-sm font-body focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${errors.password ? 'border-red-300' : 'border-slate-200'}`}
                                />
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} className="rounded" />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full btn-primary justify-center py-3 disabled:opacity-60"
                            >
                                {processing ? 'Signing in...' : 'Sign In →'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
