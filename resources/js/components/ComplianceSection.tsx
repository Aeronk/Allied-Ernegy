
import React from 'react';

const ComplianceSection: React.FC = () => {
  return (
    <div className="py-20 bg-[#1b4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Fully Compliant & Certified</h2>
            <p className="text-green-100/80 mb-8 text-lg">
              Kreamwood Trading Limited is a legally registered entity in Zambia, ensuring transparency and accountability in all our operations. We maintain up-to-date compliance with national authorities to guarantee reliability for our local and international partners.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'PACRA Registered', id: '120251034755' },
                { name: 'ZRA Tax Compliant', id: 'TPIN: 2004101945' },
                { name: 'NAPSA Compliant', id: 'Certificate Valid' },
                { name: 'International Shipping', id: 'Africa-wide Support' }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-widest text-green-400 font-bold mb-1">{item.name}</p>
                  <p className="text-sm font-medium">{item.id}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center gap-4 relative">
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 transform -rotate-6 hidden md:block">
                <img src="https://picsum.photos/id/1/200/280" alt="Certificate Placeholder" className="rounded opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer" />
             </div>
             <div className="bg-white/10 p-4 rounded-xl border border-white/20 transform rotate-3 relative z-10 shadow-2xl">
                <img src="https://picsum.photos/id/10/240/320" alt="Compliance Certificate" className="rounded shadow-inner" />
                <div className="absolute inset-0 bg-green-900/10 rounded-xl pointer-events-none"></div>
             </div>
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 transform -rotate-3 hidden md:block">
                <img src="https://picsum.photos/id/2/200/280" alt="Tax Doc Placeholder" className="rounded opacity-60 grayscale" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceSection;
