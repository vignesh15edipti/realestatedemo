import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Our Corporate Heritage | SVS Real Estate</title>
        <meta name="description" content="Learn about SVS Real Estate, a premium real estate brokerage specializing in luxury villas, grade-A corporate offices, and gated estate plots across India." />
      </Helmet>

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-amber-500 uppercase tracking-widest text-[10px] font-bold">Who We Are</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">Our Corporate Heritage</h1>
          <p className="text-xs text-slate-450 font-medium max-w-xl leading-relaxed">
            Pioneering transparency and curating physical masterpieces for discerning investors.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              Bridging Rigorous Finance with Bespoke Luxury
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Established in 2018, SVS Real Estate was formed by former corporate finance advisors and veteran construction engineers. We recognized that high-net-worth individuals faced substantial risk due to title ambiguity, unverified properties, and subpar structural materials.
            </p>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Our firm was engineered to solve this. We act as independent acquisition advisors. Every property in our portfolio is subject to intensive inspection before receiving listing approval.
            </p>
          </div>
          <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
              alt="Luxury residence patio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values grid */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <h3 className="text-center text-lg font-bold text-slate-800 uppercase tracking-wider">Our Core Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-3">
              <span className="text-2xl">⚖️</span>
              <h4 className="text-sm font-bold text-slate-800 uppercase">Absolute Legal Guard</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                We perform comprehensive 30-year title checks and confirm clear status before listings enter our databases.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-3">
              <span className="text-2xl">🔍</span>
              <h4 className="text-sm font-bold text-slate-800 uppercase">Design Integrity</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                We select projects constructed by tier-1 developers with verified construction quality records.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-3">
              <span className="text-2xl">🤝</span>
              <h4 className="text-sm font-bold text-slate-800 uppercase">Fiduciary Fiduciary</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Our advisors act in your financial interests, negotiating strictly on facts and transparent valuations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
