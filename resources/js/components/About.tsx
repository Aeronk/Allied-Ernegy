
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="/images/about.png"
                alt="Outdoor Adventure"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-50 rounded-2xl -z-0 hidden md:block"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 border-8 border-green-600/10 rounded-full -z-0"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-[#1b4332] text-white p-8 rounded-xl shadow-2xl text-center hidden md:block min-w-[200px]">
              <div className="text-4xl font-bold mb-1">5+</div>
              <div className="text-sm uppercase tracking-widest opacity-80 font-medium">Years in Service</div>
            </div>
          </div>

          <div>
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl font-extrabold text-[#1b4332] mb-6 leading-tight">Serving the Local and International Market Since 2025</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Based in Lusaka, Zambia, Kreamwood Trading was established to serve the African market with premium material products. We are a trusted stockist and manufacturer of military-grade equipment, outdoor clothing, and survival gear.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With our primary operations in Zambia and strategic presence across the region, we are committed to providing reliable tactical solutions to our clients.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#1b4332]">Our Vision</h3>
                  <p className="text-gray-600">To be the leading provider of premium quality outdoor, tactical, and survival products in Africa, delivering exceptional service and trusted solutions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#1b4332]">Our Mission</h3>
                  <p className="text-gray-600">Committed to providing high-quality, reliable, and affordable gear to military, adventure, and survival professionals across Africa and beyond.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
