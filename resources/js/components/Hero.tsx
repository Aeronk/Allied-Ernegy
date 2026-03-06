import React from 'react';
import { Link } from '@inertiajs/react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Built for Survival, Designed for Adventure.",
  subtitle = "With a commitment to quality and functionality, we design products that withstand harsh conditions and support users in demanding environments.",
  image = "/hero.png"
}) => {
  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Outdoor Gear"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-white">
          <div className="inline-block px-3 py-1 mb-6 border border-green-500 rounded-full bg-green-500/10 text-green-400 font-semibold text-xs uppercase tracking-widest animate-pulse">
            Premium Tactical & Outdoor Gear
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: title.replace('Survival', '<span class="text-green-500">Survival</span>').replace('Adventure', '<span class="text-green-500">Adventure</span>') }}>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
            >
              Explore Our Gear
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-[#1b4332] font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
