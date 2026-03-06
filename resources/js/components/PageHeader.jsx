export default function PageHeader({ label, title, subtitle, dark = true }) {
    return (
        <section className={`relative pt-32 pb-20 ${dark ? 'bg-navy-900' : 'bg-ocean-950'} overflow-hidden`}>
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}>
            </div>

            {/* Decorative wave circles */}
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-teal-500/10" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-teal-500/10" />
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-teal-500/20" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {label && (
                    <p className="section-label mb-3">{label}</p>
                )}
                <h1 className="font-display text-5xl md:text-6xl text-white leading-tight max-w-3xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-5 text-lg text-slate-400 max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-10 fill-white">
                    <path d="M0,20 C300,40 600,0 900,20 C1050,30 1150,15 1200,20 L1200,40 L0,40 Z"/>
                </svg>
            </div>
        </section>
    );
}
