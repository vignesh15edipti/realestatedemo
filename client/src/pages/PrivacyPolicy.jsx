import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | SVS Real Estate</title>
        <meta name="description" content="Review the SVS Real Estate privacy policy regarding the collection and management of customer advisory and property inquiry records." />
      </Helmet>

      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">Privacy Policy</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Effective Date: July 31, 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-700 text-xs md:text-sm leading-relaxed space-y-6">
        <h2 className="text-base font-bold text-slate-850">1. Information Collection</h2>
        <p>
          We collect personal data you provide directly when requesting properties or consultation calls, including your full name, electronic mail, telephone contact details, and any property criteria parameters.
        </p>

        <h2 className="text-base font-bold text-slate-850">2. Data Usage</h2>
        <p>
          We utilize this data to schedule walkthrough appointments, process loan applications with bank partners (upon request), and communicate new listings that correspond with your profile. We do not sell your data to third-party telemarketers.
        </p>

        <h2 className="text-base font-bold text-slate-850">3. Security Audits</h2>
        <p>
          We implement secure encryption schemas (SSL/TLS) for data in transit and restrict database access to authorized administrative and brokerage relationship managers.
        </p>

        <h2 className="text-base font-bold text-slate-850">4. Contact Inquiries</h2>
        <p>
          For queries concerning user profile deletion, please send a written request to our compliance officer at <span className="font-semibold text-amber-600">privacy@svsrealestate.com</span>.
        </p>
      </section>
    </>
  );
};

export default PrivacyPolicy;
