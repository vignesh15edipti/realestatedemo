import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchInquiries, changeInquiryStatus, removeInquiry } from '../redux/inquiriesSlice';
import { HiTrash, HiCheckCircle, HiEnvelope, HiPhone } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const AdminInquiries = () => {
  const dispatch = useDispatch();
  const { inquiries, loading, actionLoading } = useSelector((state) => state.inquiries);

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  const handleStatusChange = async (id, currentStatus, newStatus) => {
    if (currentStatus === newStatus) return;
    try {
      const result = await dispatch(changeInquiryStatus({ id, status: newStatus }));
      if (changeInquiryStatus.fulfilled.match(result)) {
        toast.success(`Leads marked as ${newStatus}.`);
      } else {
        toast.error(result.payload || 'Failed to update status.');
      }
    } catch (err) {
      toast.error('Network connection error.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you absolute certain you wish to delete this inquiry record?')) {
      try {
        const result = await dispatch(removeInquiry(id));
        if (removeInquiry.fulfilled.match(result)) {
          toast.success('Inquiry record deleted successfully.');
        } else {
          toast.error(result.payload || 'Failed to delete inquiry.');
        }
      } catch (err) {
        toast.error('Network connection error.');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Client Inquiries & Leads | SVS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-wide uppercase">Client Leads</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">Review wealth advisor consult requests and update follow-up statuses.</p>
        </div>

        {/* Table list */}
        <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
          {loading && inquiries.length === 0 ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-16 text-slate-450">
              <span className="text-4xl block mb-2">💬</span>
              <p className="text-xs font-semibold">No client lead records in database.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4">Lead Contact</th>
                    <th className="px-6 py-4">Linked Property</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4 text-center">Status Action</th>
                    <th className="px-6 py-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <span className="font-bold text-slate-900 block">{inq.name}</span>
                        <div className="flex items-center space-x-1.5 text-slate-400 text-[10px]">
                          <HiEnvelope className="h-3.5 w-3.5" />
                          <span>{inq.email}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-slate-400 text-[10px]">
                          <HiPhone className="h-3.5 w-3.5" />
                          <span>{inq.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[200px]">
                        {inq.propertyId ? (
                          <div className="space-y-0.5">
                            <Link
                              to={`/properties/${inq.propertyId.slug}`}
                              className="font-bold text-slate-800 hover:text-amber-600 transition block truncate"
                            >
                              {inq.propertyId.title}
                            </Link>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase">
                              ₹{(inq.propertyId.price / 10000000).toFixed(2)} Cr ({inq.propertyId.location})
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">General Contact Advisory</span>
                        )}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-550 leading-relaxed truncate hover:whitespace-normal hover:overflow-visible hover:break-words transition duration-200">
                          {inq.message}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <select
                          value={inq.status}
                          disabled={actionLoading}
                          onChange={(e) => handleStatusChange(inq._id, inq.status, e.target.value)}
                          className={`text-[9px] font-black uppercase tracking-wider rounded border px-2 py-1 outline-none appearance-none cursor-pointer text-center ${
                            inq.status === 'New'
                              ? 'bg-amber-50 border-amber-200 text-amber-600'
                              : inq.status === 'Contacted'
                              ? 'bg-indigo-55 border-indigo-200 text-indigo-600'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-2 rounded bg-red-50 hover:bg-red-100 border border-red-150 text-red-600 transition shadow-sm"
                          title="Delete Lead"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminInquiries;
