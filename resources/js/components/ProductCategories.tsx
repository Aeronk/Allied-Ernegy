import React from 'react';

const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: "Tactical & Outdoor Gear",
      description: "Our company specializes in high-quality emergency kits, durable backpacks, and reliable outdoor cooking and dining equipment designed to support safety, preparedness, and adventure.",
      items: ["Backpacks", "Emergency Supplies", "Cooking Equipment", "Dining Equipment"],
      image: "/images/tactical.jpg",
      accent: "border-green-600"
    },
    {
      title: "Survival & Security",
      description: "Reliable survival gear, durable protective wear, high-performance hunting equipment, and heavy-duty steel trunks built for maximum security and longevity.",
      items: ["Survival Gear", "Hunting Equipment", "Protective Wear (PPE)", "Steel Trunks"],
      image: "/images/survival.jpg",
      accent: "border-amber-600"
    },
    {
      title: "Tactical Accessories",
      description: "Delivering high-quality socks, durable holsters and webbings, and a wide range of security accessories designed for professional performance and everyday reliability.",
      items: ["Socks", "Holsters & Webbings", "Security Accessories", "Security & Tactics"],
      image: "/images/tactical.jpg",
      accent: "border-red-600"
    },
    {
      title: "Field & Camping Essentials",
      description: "Durable bed mattresses, sturdy steel cupboards and secure safes, serving as a trusted supplier for army essentials and quality camping gear.",
      items: ["Beds & Mattresses", "Steel Cupboards & Safes", "Army Surplus", "Camping Gear"],
      image: "/images/feild.jpg",
      accent: "border-blue-600"
    },
    {
      title: "Ration & Nutrition",
      description: "Comprehensive 24-hour ration packs designed to provide balanced, high-energy nutrition for demanding environments and military personnel.",
      items: ["24hr Ration Packs", "High-Energy Meals", "Essential Snacks", "Emergency Nutrition"],
      image: "/images/24.jpg",
      accent: "border-orange-600"
    },
    {
      title: "Disaster Management & Combat",
      description: "Specialized equipment for critical missions, emergency response, and tactical combat situations. Built to withstand the harshest conditions.",
      items: ["Combat Gear", "Disaster Response Kits", "Tactical Protection", "Emergency Extraction Gear"],
      image: "/images/survival.jpg",
      accent: "border-slate-800"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Professional Services</span>
          <h2 className="text-4xl font-extrabold text-[#1b4332] mb-6">Comprehensive Gear for Every Mission</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            With a focus on reliability, convenience, and long-lasting performance, we provide individuals, families, and organizations with the essential gear they need to stay ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, idx) => (
            <div key={idx} className={`bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 ${cat.accent} flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group`}>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b4332]/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed italic">
                  "{cat.description}"
                </p>
                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-center text-sm font-medium text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
