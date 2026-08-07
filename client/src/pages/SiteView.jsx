import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMapPin, HiMagnifyingGlass, HiAdjustmentsHorizontal } from 'react-icons/hi2';
import propertyService from '../services/propertyService';
import PlotDroneView from '../components/PlotDroneView';

const SiteView = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  // Active properties loaded initially
  const loadProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const queryParams = { active: 'true', ...filters };
      const res = await propertyService.getProperties(queryParams);
      if (res.success) {
        setProperties(res.properties);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {};
    if (search.trim()) filters.search = search.trim();
    if (propertyType) filters.propertyType = propertyType;
    if (status) filters.status = status;
    if (location.trim()) filters.location = location.trim();
    loadProperties(filters);
  };

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${imgUrl}`;
  };

  return (
    <>
      <Helmet>
        <title>Interactive Site View | SVS Real Estate</title>
        <meta name="description" content="View premium SVS Real Estate locations and properties through our immersive, high-resolution interactive card layout." />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-slate-950 text-white pt-28 pb-12 border-b border-slate-900 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10 text-center md:text-left">
          <span className="text-amber-500 uppercase tracking-widest text-[10px] font-bold">Immersive View</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">Site View Explorer</h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl font-medium">
            Discover bespoke architectural spaces and locations across our elite catalog with our visually optimized site explorer.
          </p>
        </div>
      </section>

      {/* Advanced Search & Filtering Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <form 
          onSubmit={handleSearch}
          className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Query */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Keyword</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Villa, Penthouse, Pool..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-xs bg-slate-800 border border-slate-700/60 rounded-lg pl-9 pr-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
                <HiMagnifyingGlass className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Location</label>
              <input
                type="text"
                placeholder="e.g. Jubilee Hills, Goa..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs bg-slate-800 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Property Class</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full text-xs bg-slate-800 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-100 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Status</label>
              <div className="flex gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex-grow text-xs bg-slate-800 border border-slate-700/60 rounded-lg px-4 py-3 text-slate-100 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                >
                  <option value="">Any Status</option>
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                </select>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold uppercase tracking-wider text-[11px] px-6 py-3 rounded-lg shadow-md hover:shadow-amber-500/20 transition-all duration-200 flex items-center justify-center space-x-1.5 shrink-0"
                >
                  <HiMagnifyingGlass className="h-4 w-4 stroke-[3]" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Interactive Map Layout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <PlotDroneView propertyName="SVS Premium Plots" />
      </section>

      {/* Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500 font-medium">Fetching exclusive locations...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
            <p className="text-sm text-slate-500 font-semibold mb-2">No matching locations found</p>
            <p className="text-xs text-slate-400">Try broadening your search keywords or categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((prop, idx) => (
              <motion.div
                key={prop._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  to={`/properties/${prop.slug}`}
                  className="group relative block aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-slate-950"
                >
                  {/* Property Image */}
                  <img
                    src={getImageUrl(prop.images?.[0])}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  />

                  {/* Top Badges (Status and Property Class) */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    <span className="bg-slate-950/80 backdrop-blur-xs text-amber-500 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {prop.propertyType}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white backdrop-blur-xs ${
                      prop.status === 'Sale' ? 'bg-slate-900/80 border border-amber-500/20' : 'bg-emerald-600/80'
                    }`}>
                      For {prop.status}
                    </span>
                  </div>

                  {/* Gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2 flex flex-col justify-end">
                    {/* Location Badge */}
                    <div className="flex items-center text-amber-500 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/20 self-start">
                      <HiMapPin className="h-3 w-3 mr-1 shrink-0" />
                      <span>{prop.location}, {prop.city}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-extrabold text-sm md:text-base leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors duration-200">
                      {prop.title}
                    </h3>

                    {/* Area & Price details for premium feel */}
                    <div className="flex items-center justify-between text-slate-350 text-[11px] pt-1.5 border-t border-slate-800/40">
                      <span>{prop.areaSqft.toLocaleString()} Sqft</span>
                      <span className="font-bold text-white text-xs">
                        {prop.price >= 10000000 
                          ? `₹${(prop.price / 10000000).toFixed(2)} Cr` 
                          : prop.price >= 100000 
                          ? `₹${(prop.price / 100000).toFixed(2)} L` 
                          : `₹${prop.price.toLocaleString('en-IN')}`
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SiteView;
