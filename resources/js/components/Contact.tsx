
import React from 'react';
import { usePage } from '@inertiajs/react';

const Contact: React.FC = () => {
  const { props } = usePage();
  const contact = (props as any).contact || {
    hq_address: "Plot No. 1208, Main street, Ibex, Lusaka\nLusaka Province\nZambia",
    zim_branch: "12 Sparns Rd, Ardbenie\nHarare\nZimbabwe",
    phone_1: "+260 760 238 059",
    phone_2: "+260 760 236 942",
    zim_phone_1: "0785702418",
    zim_phone_2: "0242751756",
    email: "sales@kreamwoodtrading.com"
  };

  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl font-extrabold text-[#1b4332] mb-8 leading-tight">We're Ready to Assist Your Mission</h2>

            <div className="space-y-8">
              {/* Headquarters */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1b4332]">Headquarters (Zambia)</h3>
                  <p className="text-gray-600 whitespace-pre-line">{contact.hq_address}</p>
                </div>
              </div>

              {/* Zimbabwe Branch */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1b4332]">Zimbabwe Branch</h3>
                  <p className="text-gray-600 whitespace-pre-line">{contact.zim_branch}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Phone: {contact.zim_phone_1}</p>
                    <p>Landline: {contact.zim_phone_2}</p>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1b4332]">Phone Numbers</h3>
                  <p className="text-gray-600">{contact.phone_1}</p>
                  <p className="text-gray-600">{contact.phone_2}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1b4332]">Email Address</h3>
                  <p className="text-gray-600">{contact.email}</p>
                </div>
              </div>
            </div>

const Contact: React.FC = () => {
  return (
            <div className="py-24 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
                    <h2 className="text-4xl font-extrabold text-[#1b4332] mb-8 leading-tight">We're Ready to Assist Your Mission</h2>

                    <div className="space-y-8">
                      {/* Headquarters */}
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#1b4332]">Headquarters (Zambia)</h3>
                          <p className="text-gray-600">Plot No. 1208, Main Street, Ibex<br />Lusaka, Lusaka Province<br />Zambia</p>
                        </div>
                      </div>

                      {/* Zimbabwe Branch */}
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#1b4332]">Zimbabwe Branch</h3>
                          <p className="text-gray-600">12 Sparns Road, Ardbenie<br />Harare<br />Zimbabwe</p>
                        </div>
                      </div>

                      {/* Phone Numbers */}
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#1b4332]">Phone Numbers</h3>
                          <p className="text-gray-600">+260 760 238 059</p>
                          <p className="text-gray-600">+260 760 236 942</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#1b4332]">Email Address</h3>
                          <p className="text-gray-600">sales@kreamwoodtrading.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-100">
                      <h4 className="font-bold text-lg text-[#1b4332] mb-2">Office Hours</h4>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Monday - Friday</span>
                        <span className="font-bold">08:00 - 17:00</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>Saturday</span>
                        <span className="font-bold">09:00 - 13:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-2xl font-bold text-[#1b4332] mb-6">Send a Message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name</label>
                          <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" placeholder="Your Name" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
                          <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" placeholder="Your Email" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Subject</label>
                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
                          <option>Request for Quote</option>
                          <option>Stock Availability</option>
                          <option>Custom Manufacturing</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                        <textarea rows={4} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" placeholder="Tell us about your requirements..."></textarea>
                      </div>
                      <button type="submit" className="w-full bg-[#1b4332] text-white font-bold py-4 rounded-lg hover:bg-[#2d6a4f] transition-colors duration-300 shadow-lg shadow-green-900/10">
                        Send Request
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            );
};

            export default Contact;
