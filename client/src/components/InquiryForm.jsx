import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import inquiryService from '../services/inquiryService';
import { toast } from 'react-toastify';

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Please enter your full name'),
  email: yup.string().email('Please enter a valid email address').required('Please enter your email'),
  phone: yup
    .string()
    .matches(/^[+]?[0-9]{10,14}$/, 'Please enter a valid phone number (10-14 digits)')
    .required('Please enter your contact number'),
  message: yup.string().required('Please provide a message or inquiry details'),
});

const InquiryForm = ({ propertyId, propertyTitle }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      message: `I am interested in "${propertyTitle}". Please contact me with more information.`,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await inquiryService.createInquiry({
        ...data,
        propertyId,
      });
      if (response.success) {
        setSuccess(true);
        toast.success(response.message || 'Inquiry submitted successfully!');
        reset();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inquiryFormCard" className="bg-slate-900 text-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-800">
      <h3 className="text-lg font-bold mb-1 tracking-wide">Inquire About This Property</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        Fill out the form below and one of our dedicated wealth and property advisors will connect with you shortly.
      </p>

      {success ? (
        <div className="bg-emerald-950/55 border border-emerald-500/30 text-emerald-300 rounded-xl p-6 text-center text-sm">
          <span className="text-3xl block mb-2">✅</span>
          <h4 className="font-bold text-base mb-1">Advisory Request Logged!</h4>
          <p className="text-slate-300 text-xs">
            We have received your request. An SVS representative will dial or mail you within 2 business hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 text-xs font-semibold text-amber-500 hover:underline"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. Rahul Sharma"
              className={`w-full bg-slate-950/80 text-white text-xs border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.name && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
            <input
              type="email"
              {...register('email')}
              placeholder="e.g. rahul@example.com"
              className={`w-full bg-slate-950/80 text-white text-xs border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.email && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Phone Number</label>
            <input
              type="text"
              {...register('phone')}
              placeholder="e.g. +91 98765 43210"
              className={`w-full bg-slate-950/80 text-white text-xs border rounded-lg px-4 py-3 outline-none focus:ring-1 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.phone && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.phone.message}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Message Details</label>
            <textarea
              id="inquiryMessageInput"
              rows={4}
              {...register('message')}
              className={`w-full bg-slate-950/80 text-white text-xs border rounded-lg px-4 py-3 outline-none focus:ring-1 resize-none transition-all ${
                errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-amber-500 focus:ring-amber-500'
              }`}
            />
            {errors.message && <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.message.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 text-slate-900 font-bold uppercase tracking-wider text-xs py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loading ? 'Submitting Details...' : 'Request Advisory Call'}
          </button>
        </form>
      )}
    </div>
  );
};

export default InquiryForm;
