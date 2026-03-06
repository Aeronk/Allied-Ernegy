// Shared admin form field components

export function Field({ label, error, required, children }) {
    return (
        <div>
            <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">
                {label}{required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

export function Input({ error, className = '', ...props }) {
    return (
        <input
            className={`w-full px-4 py-2.5 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${error ? 'border-red-300' : 'border-slate-200'} ${className}`}
            {...props}
        />
    );
}

export function Textarea({ error, className = '', ...props }) {
    return (
        <textarea
            className={`w-full px-4 py-2.5 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-y ${error ? 'border-red-300' : 'border-slate-200'} ${className}`}
            {...props}
        />
    );
}

export function Select({ error, children, className = '', ...props }) {
    return (
        <select
            className={`w-full px-4 py-2.5 bg-white border rounded-sm text-sm font-body text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition ${error ? 'border-red-300' : 'border-slate-200'} ${className}`}
            {...props}
        >
            {children}
        </select>
    );
}

export function Toggle({ label, checked, onChange, description }) {
    return (
        <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-0.5">
                <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
                <div className={`w-10 h-5 rounded-full transition-colors ${checked ? 'bg-teal-500' : 'bg-slate-300'}`} />
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
            </div>
            <div>
                <p className="text-sm font-body font-medium text-slate-700">{label}</p>
                {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
            </div>
        </label>
    );
}

export function ImageUpload({ current, onChange, label = 'Image' }) {
    return (
        <div>
            <label className="block text-xs font-body font-semibold tracking-wide text-slate-700 mb-1.5">{label}</label>
            <div className="flex items-start gap-4">
                {current && (
                    <img src={current} alt="Current" className="w-24 h-24 object-cover rounded-sm border border-slate-200" />
                )}
                <div className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onChange}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition"
                    />
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP. Max 2MB.</p>
                </div>
            </div>
        </div>
    );
}

export function FormCard({ title, children, className = '' }) {
    return (
        <div className={`bg-white border border-slate-100 rounded-sm shadow-sm p-6 lg:p-8 ${className}`}>
            {title && <h3 className="font-body font-semibold text-slate-800 mb-6 pb-4 border-b border-slate-100">{title}</h3>}
            {children}
        </div>
    );
}

export function PageActions({ backHref, saving, children }) {
    return (
        <div className="flex items-center justify-between mb-8">
            <a href={backHref} className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition-colors">
                ← Back
            </a>
            <div className="flex items-center gap-3">
                {children}
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary text-sm py-2.5 disabled:opacity-60"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
