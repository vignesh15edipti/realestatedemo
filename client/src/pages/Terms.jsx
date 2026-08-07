import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | SVS Real Estate</title>
        <meta name="description" content="Review the SVS Real Estate terms and conditions of service for listing usage, property valuations, and broker advisory." />
      </Helmet>

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">Terms & Conditions</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Effective Date: July 31, 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-xs md:text-sm leading-relaxed space-y-6">
        <h2 className="text-base font-bold text-slate-850">1. Listing Accuracy</h2>
        <p>
          While we make every attempt to ensure property details, price, square footage, and images are accurate, SVS Real Estate relies on details submitted by developers and owner representatives. Prices and listings remain subject to modification without notice.
        </p>

        <h2 className="text-base font-bold text-slate-850">2. Advisory Disclaimer</h2>
        <p>
          Consultations provided by SVS advisors do not constitute official taxation or legal financial advice. Clients should consult certified chartered accountants or legal advisors before executing final purchase deeds.
        </p>

        <h2 className="text-base font-bold text-slate-850">3. Proprietary Design Assets</h2>
        <p>
          Branding, logos, photography galleries, copy, and layout schemas on this site remain the exclusive property of SVS Real Estate and may not be crawled, duplicated, or distributed without permission.
        </p>

        <h2 className="text-base font-bold text-slate-850">4. Jurisdiction</h2>
        <p>
          Any disputes arising from using our site or services are governed by the laws of India and fall under the exclusive jurisdiction of courts located in Hyderabad, Telangana.
        </p>
      </section>
    </>
  );
};

export default Terms;
