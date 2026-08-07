import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import inquiryService from '../services/inquiryService';
import { toast } from 'react-toastify';

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Please enter your full name'),
  email: yup.string().email('Please enter a valid email address').required('Please enter your email'),
  phone: yup
    .string()
    .matches(/^[+]?[0-9]{10,14}$/, 'Please enter a valid phone number')
    .required('Please enter your contact number'),
  message: yup.string().required('Please specify your inquiry details'),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await inquiryService.createInquiry({
        ...data,
        propertyId: null, // General inquiry
      });
      if (response.success) {
        setSuccess(true);
        toast.success('Your advisory request has been logged successfully.');
        reset();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Our Advisory Team | SVS Real Estate</title>
        <meta name="description" content="Reach out to SVS Real Estate for residential reservations, portfolio management queries, and structural development audits." />
      </Helmet>

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-amber-500 uppercase tracking-widest text-[10px] font-bold">Get In Touch</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">Contact Our Offices</h1>
          <p className="text-xs text-slate-450 font-medium max-w-xl leading-relaxed">
            Schedule a virtual walkthrough or connect with a senior investment advisor.
          </p>
        </div>
      </section>

      {/* Form and info grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              Office Directory
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-3.5 text-xs">
                <HiMapPin className="text-amber-500 h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-0.5">Corporate HQ</h4>
                  <p className="text-slate-500 leading-relaxed">
                    104, Executive Hub, Road No. 2, Banjara Hills, Hyderabad, TS, 500034
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-xs">
                <HiPhone className="text-amber-500 h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-0.5">Voice Advisory</h4>
                  <p className="text-slate-500 leading-relaxed">
                    +91 40 4880 1200<br />
                    +91 99887 76655
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-xs">
                <HiEnvelope className="text-amber-500 h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-800 uppercase mb-0.5">Electronic Mail</h4>
                  <p className="text-slate-500 leading-relaxed">
                    info@svsrealestate.com<br />
                    advisory@svsrealestate.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-150 p-6 md:p-8">
            <h3 className="text-base font-bold text-slate-850 uppercase tracking-wider mb-6">Send A Message</h3>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 rounded-xl p-6 text-center text-xs">
                <span className="text-3xl block mb-2">✅</span>
                <h4 className="font-bold text-sm mb-1">Advisory Form Logged!</h4>
                <p className="text-slate-500">
                  Thank you for reaching out. A client relationship director has been assigned to your message.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-xs font-semibold text-amber-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      {...register('phone')}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. rahul@example.com"
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.email.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Message Details</label>
                  <textarea
                    rows={5}
                    {...register('message')}
                    placeholder="Tell us what kind of properties or investment portfolios you are interested in..."
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-4 py-3 outline-none focus:ring-1 resize-none transition-all ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-slate-900 font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  {loading ? 'Sending Request...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
