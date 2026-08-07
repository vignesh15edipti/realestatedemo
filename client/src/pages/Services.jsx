import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  HiSparkles,
  HiShieldCheck,
  HiBriefcase,
  HiGlobeAlt,
} from 'react-icons/hi2';

const Services = () => {
  const list = [
    {
      title: 'Residential Acquisition Advisory',
      desc: 'We assist HNIs, executives, and NRI clients in acquiring high-end apartments, duplexes, beachside Goan estates, and custom heritage villas.',
      icon: <HiSparkles className="h-6 w-6 text-amber-600" />,
    },
    {
      title: 'Commercial Leasing & Portfolios',
      desc: 'Grade-A workspaces, corporate retail outlets, IT park office layouts, and high-street banks. Verified structural engineering and high rental yields.',
      icon: <HiBriefcase className="h-6 w-6 text-amber-600" />,
    },
    {
      title: 'Gated Villa Plots & Land Acquisitions',
      desc: 'Strategic plot locations in rapidly developing suburban corridors (like Bangalore Airport region). Transparent boundaries, road access, and clear paperwork.',
      icon: <HiGlobeAlt className="h-6 w-6 text-amber-600" />,
    },
    {
      title: 'Legal Audits & Structural Assessment',
      desc: 'Our independent structural audits inspect foundation strength, design compliance, and materials quality, alongside a 30-year clean title guarantee.',
      icon: <HiShieldCheck className="h-6 w-6 text-amber-600" />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Professional Services Portfolio | SVS Real Estate</title>
        <meta name="description" content="Explore real estate acquisition advisory, grade-A commercial leasing, developer assessment, and legal title verification services." />
      </Helmet>

      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-amber-500 uppercase tracking-widest text-[10px] font-bold">Services Portfolio</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">Our Professional Capabilities</h1>
          <p className="text-xs text-slate-450 font-medium max-w-xl leading-relaxed">
            Delivering detailed research and institutional-level risk management.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((srv, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-slate-100 flex items-start space-x-4 shadow-sm hover:shadow transition">
              <div className="p-3 bg-amber-50 rounded-lg shrink-0">
                {srv.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800">{srv.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-8 text-center max-w-2xl mx-auto mt-16 space-y-4">
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Require a Bespoke Portfolio Proposal?</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Our directors provide customized briefs for family offices and institutional acquisition managers. Reach out for a consultation.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-lg transition"
            >
              Consult Directors
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
