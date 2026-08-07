import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass, HiMapPin, HiHome, HiCurrencyRupee } from 'react-icons/hi2';

const HeroSearch = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Sale'); // Default 'Sale'
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    params.append('status', status);
    
    if (location) params.append('location', location);
    if (propertyType) params.append('propertyType', propertyType);
    
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.append('minPrice', min);
      if (max) params.append('maxPrice', max);
    }
    
    navigate(`/properties?${params.toString()}`);
  };

  const priceOptions = status === 'Sale' ? [
    { label: 'Under ₹50 Lakhs', value: '0-5000000' },
    { label: '₹50 Lakhs - ₹1.5 Crore', value: '5000000-15000000' },
    { label: '₹1.5 Crore - ₹3 Crore', value: '15000000-30000000' },
    { label: '₹3 Crore - ₹5 Crore', value: '30000000-50000000' },
    { label: '₹5 Crore +', value: '50000000-' },
  ] : [
    { label: 'Under ₹30,000 /mo', value: '0-30000' },
    { label: '₹30,000 - ₹75,000 /mo', value: '30000-75000' },
    { label: '₹75,000 - ₹1.5 Lakh /mo', value: '75000-150000' },
    { label: '₹1.5 Lakh - ₹3 Lakh /mo', value: '150000-300000' },
    { label: '₹3 Lakh + /mo', value: '300000-' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-200/50">
      {/* Rent / Sale Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => { setStatus('Sale'); setPriceRange(''); }}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
            status === 'Sale'
              ? 'bg-slate-900 text-amber-500 shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => { setStatus('Rent'); setPriceRange(''); }}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
            status === 'Rent'
              ? 'bg-slate-900 text-amber-500 shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Rent Properties
        </button>
      </div>

      {/* Filter Inputs Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Locality Input */}
        <div className="relative">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Location</label>
          <div className="relative">
            <HiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Jubilee Hills, Worli"
              className="w-full bg-slate-50 focus:bg-white text-slate-900 font-medium pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Type Select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Property Type</label>
          <div className="relative">
            <HiHome className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white text-slate-900 font-medium pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm appearance-none transition-all duration-200"
            >
              <option value="">All Categories</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* Budget Select */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Budget Range</label>
          <div className="relative">
            <HiCurrencyRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-slate-50 focus:bg-white text-slate-900 font-medium pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm appearance-none transition-all duration-200"
            >
              <option value="">Any Price Range</option>
              {priceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-3 flex justify-end mt-2">
          <button
            type="submit"
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <HiMagnifyingGlass className="h-5 w-5" />
            <span>Search Listings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearch;
