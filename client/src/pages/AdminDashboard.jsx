import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProperties } from '../redux/propertiesSlice';
import { fetchInquiries } from '../redux/inquiriesSlice';
import DashboardCard from '../components/DashboardCard';
import {
  HiHome,
  HiCurrencyRupee,
  HiChatBubbleLeftRight,
  HiStar,
  HiShoppingBag,
} from 'react-icons/hi2';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
  const { properties, loading: propLoading } = useSelector((state) => state.properties);
  const { inquiries, loading: inqLoading } = useSelector((state) => state.inquiries);

  useEffect(() => {
    // Fetch all properties (active & inactive)
    dispatch(fetchProperties({ active: 'all', limit: 100 }));
    // Fetch all inquiries
    dispatch(fetchInquiries());
  }, [dispatch]);

  // Compute Statistics
  const totalProperties = properties.length;
  const forSale = properties.filter((p) => p.status === 'Sale').length;
  const forRent = properties.filter((p) => p.status === 'Rent').length;
  const featured = properties.filter((p) => p.featured).length;
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;

  const loading = propLoading || inqLoading;

  if (loading && totalProperties === 0 && totalInquiries === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-amber-500"></div>
          <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest">Compiling statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard Summary | SVS Admin</title>
      </Helmet>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide uppercase">Operational Overview</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Real-time statistics across active listings and customer advisory leads.</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <DashboardCard
            title="Total Properties"
            value={totalProperties}
            icon={<HiHome className="h-6 w-6" />}
            color="slate"
          />
          <DashboardCard
            title="For Sale"
            value={forSale}
            icon={<HiShoppingBag className="h-6 w-6" />}
            color="amber"
          />
          <DashboardCard
            title="For Rent"
            value={forRent}
            icon={<HiCurrencyRupee className="h-6 w-6" />}
            color="emerald"
          />
          <DashboardCard
            title="Featured Estates"
            value={featured}
            icon={<HiStar className="h-6 w-6" />}
            color="indigo"
          />
          <DashboardCard
            title="Total Leads"
            value={totalInquiries}
            icon={<HiChatBubbleLeftRight className="h-6 w-6" />}
            color="slate"
          />
        </div>

        {/* Details Summary Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Inquiries List */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/50 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Leads ({newInquiries} Unattended)</h3>
              <Link to="/admin/inquiries" className="text-xs text-amber-600 hover:text-amber-700 font-bold">
                View All Leads
              </Link>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No inquiry logs submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.slice(0, 3).map((inq) => (
                  <div key={inq._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 block">{inq.name}</span>
                      <span className="text-slate-400 block">{inq.email} | {inq.phone}</span>
                      <span className="text-slate-500 block truncate max-w-sm md:max-w-md">
                        {inq.propertyId ? `Property: ${inq.propertyId.title}` : 'General Advisory Inquiry'}
                      </span>
                    </div>
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        inq.status === 'New'
                          ? 'bg-amber-100 text-amber-600'
                          : inq.status === 'Contacted'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
                Action Console
              </h3>
              <p className="text-xs text-slate-400 py-4 leading-relaxed font-medium">
                Add, modify, and publish property listings or mark client leads. Keep property credentials and layouts updated to secure maximum luxury advisor value.
              </p>
            </div>

            <div className="space-y-2">
              <Link
                to="/admin/properties/create"
                className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white text-center font-bold uppercase tracking-wider text-xs py-3 rounded-lg block transition duration-200 shadow-sm"
              >
                + Add Property Listing
              </Link>
              <Link
                to="/admin/properties"
                className="w-full bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-center font-bold uppercase tracking-wider text-xs py-3 rounded-lg block transition duration-200 shadow-sm"
              >
                Manage All Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
