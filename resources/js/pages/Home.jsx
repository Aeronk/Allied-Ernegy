import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ArrowRight, Zap, Waves, Droplets, Wind, MapPin, ExternalLink,
    Calendar, User, CheckCircle, TrendingUp, Shield, Quote, Plus, Minus, Globe, Factory
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';

const IconMap = {
    Zap, Waves, Droplets, Wind, MapPin, ExternalLink, Calendar, User,
    CheckCircle, TrendingUp, Shield, Quote, Plus, Minus, Globe, Factory
};

// Fallback if icon is missing
const renderIcon = (iconName, props) => {
    const Icon = IconMap[iconName] || Zap;
    return <Icon {...props} />;
};

const Hero = ({ slides = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (!slides || slides.length === 0) return null;
    const slide = slides[currentSlide];

    return (
        <section className="relative h-screen w-full overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <img
                        src={slide.image_url}
                        alt={slide.title}
                        className="w-full h-full object-cover scale-110 animate-pulse-slow"
                        referrerPolicy="no-referrer"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start mt-16 mb-16 pt-32 pb-16">
                <motion.div
                    key={`content-${currentSlide}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl"
                >
                    <span className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary rounded-full text-sm font-bold mb-6 uppercase tracking-widest">
                        {slide.subtitle || 'Renewable Energy IPP'}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                        {slide.title}
                    </h1>
                    <p className="text-xl text-white/80 mb-10 leading-relaxed">
                        {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-32">
                        <Link href={slide.cta_primary_url || '/offer'} className="btn-primary flex items-center gap-2">
                            {slide.cta_primary_text || 'Learn More'} <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href={slide.cta_secondary_url || '/projects'} className="btn-outline border-white text-white hover:bg-white hover:text-slate-900">
                            {slide.cta_secondary_text || 'Explore Our Projects'}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20  flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-12 h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-primary w-16' : 'bg-white/30'}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

const Stats = ({ stats = [] }) => {
    if (!stats || stats.length === 0) return null;
    return (
        <section className="py-12 bg-slate-900 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                                {renderIcon(stat.icon || 'Waves', { className: 'w-6 h-6' })}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Process = ({ steps = [] }) => {
    if (!steps || steps.length === 0) return null;
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">How It Works</h2>
                    <p className="text-lg text-slate-600">Our patented technology transforms the natural power of ocean waves into reliable, grid-ready electricity through a simple, efficient process.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 border-4 border-slate-50">
                                {renderIcon(step.icon, { className: 'w-8 h-8' })}
                            </div>
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                                0{idx + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Impact = ({ stats = [], title, desc, bullets = [] }) => {
    if ((!stats || stats.length === 0) && (!bullets || bullets.length === 0)) return null;
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">
                            {title || <>Our Environmental <span className="text-primary">Impact</span></>}
                        </h2>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                            {desc}
                        </p>
                        <div className="space-y-6">
                            {(bullets.length > 0 ? bullets : [
                                "Zero noise pollution for marine life",
                                "No visual impact on coastal horizons",
                                "Scalable solutions for remote coastal communities",
                                "Reinforcing energy security through diversification"
                            ]).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-slate-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className={`w-12 h-12 ${stat.color || 'bg-primary'} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                    {renderIcon(stat.icon, { className: 'w-6 h-6' })}
                                </div>
                                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Testimonials = ({ testimonials = [] }) => {
    if (!testimonials || testimonials.length === 0) return null;
    return (
        <section className="py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
            {/* Subtle wave pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />
            <div className="max-w-7xl mx-auto px-8 relative">
                <div className="text-center mb-20">
                    <Quote className="w-16 h-16 text-white/20 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-6">What Industry Leaders Say</h2>
                    <p className="text-orange-100 max-w-2xl mx-auto">Hear from the experts and partners who are working with us to turn the tide on climate change.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/15 backdrop-blur-sm border border-white/20 p-10 rounded-3xl relative hover:bg-white/20 transition-colors"
                        >
                            <p className="text-lg text-white/90 italic mb-8 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-white/50" referrerPolicy="no-referrer" />
                                <div>
                                    <div className="font-bold text-white">{t.author}</div>
                                    <div className="text-sm text-orange-200">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQPreview = ({ faqs = [] }) => {
    const [openIdx, setOpenIdx] = useState(0);

    if (!faqs || faqs.length === 0) return null;
    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
                    <p className="text-slate-600">Everything you need to know about wave energy and our operations.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                            <button
                                className="w-full p-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            >
                                <span className="font-bold text-slate-900">{faq.question}</span>
                                {openIdx === idx ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-slate-400" />}
                            </button>
                            <AnimatePresence>
                                {openIdx === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="/contact" className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                        Still have questions? Contact us <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const Home = ({
    heroSlides = [],
    services = [],
    partners = [],
    projects = [],
    blogPosts = [],
    settings = {},
    homeStats = [],
    homeProcess = [],
    homeImpact = [],
    homeTestimonials = [],
    homeFaqs = [],
    homeGlobal = [],
    pioneeringTitle,
    pioneeringText1,
    pioneeringText2,
    pioneeringImage,
    impactTitle,
    impactDesc,
    impactBullets,
}) => {
    return (
        <PublicLayout settings={settings}>
            <div className="overflow-x-hidden public-page">
                <Hero slides={heroSlides} />
                <Stats stats={homeStats} />

                {/* Quick About Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">
                                    {pioneeringTitle || <>Pioneering the Future of <span className="text-primary">Clean Power</span></>}
                                </h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    {pioneeringText1}
                                </p>
                                <p className="text-slate-600 mb-10 leading-relaxed">
                                    {pioneeringText2}
                                </p>
                                <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                                    Our Story <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src={pioneeringImage || "https://images.unsplash.com/photo-1466611653911-954ff21b6748?auto=format&fit=crop&q=80&w=1000"}
                                        alt="Marine Energy"
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl text-white shadow-xl hidden md:block">
                                    <div className="text-4xl font-bold mb-1">100%</div>
                                    <div className="text-sm uppercase tracking-widest opacity-80">Renewable Energy</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <Process steps={homeProcess} />
                <Impact
                    stats={homeImpact}
                    title={impactTitle}
                    desc={impactDesc}
                    bullets={impactBullets}
                />

                {/* Technology Preview */}
                <section className="py-24 bg-slate-50 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div className="max-w-2xl">
                                <div className="w-12 h-1 bg-orange-400 rounded-full mb-4"></div>
                                <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Core Technologies</h2>
                                <p className="text-lg text-slate-600">We leverage a diverse range of marine and renewable technologies to provide consistent, zero-emission power.</p>
                            </div>
                            <Link href="/offer" className="btn-outline border-primary text-primary hover:bg-primary hover:text-white">
                                View All Technologies
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {services.map((service, idx) => (
                                <motion.div
                                    key={service.slug || service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={service.image_url}
                                            alt={service.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                            {renderIcon(service.icon_url || 'Waves')}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">{service.name}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.description}</p>
                                        <Link href={`/offer/${service.slug}`} className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Testimonials testimonials={homeTestimonials} />

                {/* Partners Preview */}
                {partners && partners.length > 0 && (
                    <section className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-100 to-transparent pointer-events-none z-10"></div>
                        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-slate-100 to-transparent pointer-events-none z-10"></div>
                        <div className="max-w-7xl mx-auto px-8 relative z-20">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                                <div className="max-w-2xl">
                                    <div className="w-12 h-1 bg-orange-500 rounded-full mb-4"></div>
                                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Strategic Partners</h2>
                                    <p className="text-lg text-slate-600">Collaborating with world leaders to drive the clean energy transition.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                {partners.map((partner, idx) => (
                                    <motion.div
                                        key={partner.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex items-center justify-center aspect-[3/2] group"
                                    >
                                        <a href={partner.url || '#'} target="_blank" rel="noopener noreferrer" className="w-full h-full flex flex-col items-center justify-center gap-3">
                                            {partner.logo_url ? (
                                                <img
                                                    src={partner.logo_url}
                                                    alt={partner.name}
                                                    className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            ) : (
                                                <div className="text-center">
                                                    <span className="font-display font-bold text-lg text-slate-800 group-hover:text-primary transition-colors">{partner.name}</span>
                                                </div>
                                            )}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Projects */}
                <section className="py-24 bg-slate-900 text-white relative">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div className="max-w-2xl">
                                <div className="w-12 h-1 bg-orange-400 rounded-full mb-4"></div>
                                <h2 className="text-4xl font-bold mb-6">Featured Projects</h2>
                                <p className="text-slate-400 text-lg">Real-world applications of our marine energy solutions across the globe.</p>
                            </div>
                            <Link href="/projects" className="btn-primary">
                                View All Projects
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10">
                            {projects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative group rounded-3xl overflow-hidden aspect-[16/9]"
                                >
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <div className="flex items-center gap-2 text-orange-400 font-bold text-sm mb-2">
                                            <MapPin className="w-4 h-4" />
                                            {project.location}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                        <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-white font-bold hover:text-orange-400 transition-colors">
                                            Explore Project <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Latest News */}
                {blogPosts && blogPosts.length > 0 && (
                    <section className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-slate-900 mb-4">Latest News & Insights</h2>
                                <p className="text-slate-600">Stay updated with our latest milestones and industry developments.</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {blogPosts.map((post, idx) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group"
                                    >
                                        <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {post.formatted_date || post.published_at}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {post.author}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                            <Link href={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug || post.id}`} className="text-primary font-bold text-sm inline-flex items-center gap-2">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <FAQPreview faqs={homeFaqs} />

                {/* Global Presence */}
                <section className="py-24 bg-slate-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-bold text-slate-900 mb-6">Global Presence</h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    Headquartered in Aberdeen, Scotland, Allied Energies is expanding its footprint across the globe, bringing clean marine energy to coastal regions in Europe, Africa, and beyond.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-8">
                                    {homeGlobal.map((regionData, idx) => (
                                        <div key={idx}>
                                            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                                <MapPin className="w-5 h-5" /> {regionData.region}
                                            </h4>
                                            <ul className="space-y-2 text-slate-600 text-sm">
                                                {regionData.locations.map((loc, lIdx) => (
                                                    <li key={lIdx}>• {loc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="aspect-square bg-slate-200 rounded-full flex items-center justify-center p-12 relative">
                                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping" />
                                    <Globe className="w-full h-full text-primary/20" />
                                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50 animate-bounce" />
                                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-secondary rounded-full shadow-lg shadow-secondary/50 animate-bounce delay-150" />
                                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50 animate-bounce delay-300" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">Stay Informed</h2>
                                <p className="text-lg text-slate-400 mb-0">
                                    Subscribe to our newsletter to receive the latest updates on our projects, technology breakthroughs, and the future of marine energy.
                                </p>
                            </div>
                            <div>
                                <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                    <button type="submit" className="btn-primary px-8 py-4 whitespace-nowrap">
                                        Subscribe Now
                                    </button>
                                </form>
                                <p className="text-xs text-slate-500 mt-4">
                                    By subscribing, you agree to our Privacy Policy and consent to receive updates from Allied Energies.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <Waves className="absolute -top-20 -left-20 w-96 h-96 text-white rotate-12" />
                        <Waves className="absolute -bottom-20 -right-20 w-96 h-96 text-white -rotate-12" />
                    </div>
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Power a Sustainable Future?</h2>
                        <p className="text-xl text-white/80 mb-10 leading-relaxed">
                            Join us in our mission to harness the power of the ocean. Whether you're a potential partner, investor, or collaborator, we'd love to hear from you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl">
                                Get in Touch
                            </Link>
                            <Link href="/partners" className="px-8 py-4 bg-primary-dark border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                                Our Partners
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
};

export default Home;
