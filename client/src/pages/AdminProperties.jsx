import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProperties, removeProperty, togglePropertyFeaturedStatus } from '../redux/propertiesSlice';
import { HiPlus, HiPencil, HiTrash, HiStar, HiEye, HiEyeSlash } from 'react-icons/hi2';
import Pagination from '../components/Pagination';
import { formatPrice } from '../components/PropertyCard';
import { toast } from 'react-toastify';

const AdminProperties = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, pages, currentPage } = useSelector((state) => state.properties);

  useEffect(() => {
    const params = {};
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
    // Set default values for admin overview
    params.active = 'all'; // Admin sees active and inactive listings
    if (!params.page) params.page = '1';
    if (!params.limit) params.limit = '10'; // 10 per page on table view

    dispatch(fetchProperties(params));
  }, [dispatch, searchParams]);

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you absolute certain you wish to delete this property listing? This operation is permanent.')) {
      try {
        const result = await dispatch(removeProperty(id));
        if (removeProperty.fulfilled.match(result)) {
          toast.success('Listing deleted successfully.');
        } else {
          toast.error(result.payload || 'Failed to remove listing.');
        }
      } catch (err) {
        toast.error('Server communication error.');
      }
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const result = await dispatch(togglePropertyFeaturedStatus(id));
      if (togglePropertyFeaturedStatus.fulfilled.match(result)) {
        const isFeat = result.payload.featured;
        toast.success(`Property marked as ${isFeat ? 'Featured' : 'Standard'}.`);
      } else {
        toast.error('Failed to change featured status.');
      }
    } catch (err) {
      toast.error('Server communication error.');
    }
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=150&q=80';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${url}`;
  };

  return (
    <>
      <Helmet>
        <title>Manage Property Listings | SVS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-wide uppercase">Property Database</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Create, edit, toggle active status, or delete real estate offerings.</p>
          </div>
          <div>
            <Link
              to="/admin/properties/create"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase tracking-wider text-xs px-5 py-3 rounded-lg flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <HiPlus className="h-4.5 w-4.5" />
              <span>Add Listing</span>
            </Link>
          </div>
        </div>

        {/* Table list */}
        <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
          {loading && properties.length === 0 ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="text-4xl block mb-2">🏠</span>
              <p className="text-xs font-semibold">No property listings found. Click Add Listing to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Thumbnail</th>
                    <th className="px-6 py-4">Listing Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Valuation</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-center">Featured</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {properties.map((prop) => (
                    <tr key={prop._id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-3.5">
                        <img
                          src={getImageUrl(prop.images?.[0])}
                          alt={prop.title}
                          className="h-10 w-16 object-cover rounded border border-slate-200"
                        />
                      </td>
                      <td className="px-6 py-3.5 font-bold text-slate-800">
                        <Link to={`/properties/${prop.slug}`} className="hover:text-amber-600 transition">
                          {prop.title}
                        </Link>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase font-semibold text-[9px]">
                          {prop.propertyType}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-bold text-slate-900">
                        {formatPrice(prop.price)}
                        {prop.status === 'Rent' && <span className="text-[10px] font-normal text-slate-400"> / mo</span>}
                      </td>
                      <td className="px-6 py-3.5 text-slate-500">
                        {prop.location}, {prop.city}
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <button
                          onClick={() => handleToggleFeatured(prop._id)}
                          className={`p-1.5 rounded transition ${
                            prop.featured ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-slate-400'
                          }`}
                        >
                          <HiStar className="h-5 w-5" />
                        </button>
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          prop.active ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {prop.active ? (
                            <>
                              <HiEye className="h-3.5 w-3.5" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <HiEyeSlash className="h-3.5 w-3.5" />
                              <span>Inactive</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-2">
                        <Link
                          to={`/admin/properties/edit/${prop._id}`}
                          className="inline-flex items-center justify-center p-2 rounded bg-slate-100 hover:bg-amber-100 hover:text-slate-900 text-slate-500 transition shadow-sm"
                          title="Edit"
                        >
                          <HiPencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(prop._id)}
                          className="inline-flex items-center justify-center p-2 rounded bg-red-50 hover:bg-red-100 text-red-600 transition border border-red-150 shadow-sm"
                          title="Delete"
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

        {/* Pagination deck */}
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AdminProperties;
