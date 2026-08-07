import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiXMark } from 'react-icons/hi2';

const PropertyFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to get search param values
  const getParam = (key, defaultValue = '') => searchParams.get(key) || defaultValue;

  // Update query parameters in URL
  const handleUpdateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Always reset to page 1 on filter changes
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams({ page: '1' });
  };

  const status = getParam('status');
  const propertyType = getParam('propertyType');
  const bedrooms = getParam('bedrooms');
  const minPrice = getParam('minPrice');
  const maxPrice = getParam('maxPrice');
  const location = getParam('location');
  const sort = getParam('sort', 'newest');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <h3 className="text-base font-bold text-slate-800">Filter Properties</h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
        >
          Reset All
        </button>
      </div>

      {/* Status (Buy / Rent) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Listing Status</label>
        <div className="grid grid-cols-3 gap-2">
          {['', 'Sale', 'Rent'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleUpdateParam('status', val)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                status === val
                  ? 'bg-slate-900 border-slate-900 text-amber-500 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {val === '' ? 'All' : val === 'Sale' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location/Locality</label>
        <input
          type="text"
          value={location}
          onChange={(e) => handleUpdateParam('location', e.target.value)}
          placeholder="e.g. Jubilee Hills"
          className="w-full text-xs bg-slate-50 border border-slate-200 focus:bg-white rounded-lg px-3.5 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-850 font-medium"
        />
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Property Type</label>
        <select
          value={propertyType}
          onChange={(e) => handleUpdateParam('propertyType', e.target.value)}
          className="w-full text-xs bg-slate-50 border border-slate-200 focus:bg-white rounded-lg px-3.5 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-850 font-medium"
        >
          <option value="">All Categories</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">Bedrooms (BHK)</label>
        <div className="grid grid-cols-5 gap-1.5">
          {['', '1', '2', '3', '4+'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleUpdateParam('bedrooms', val)}
              className={`py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                bedrooms === val
                  ? 'bg-slate-900 border-slate-900 text-amber-500 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {val === '' ? 'All' : val}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Price Budget (₹)</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => handleUpdateParam('minPrice', e.target.value)}
            placeholder="Min"
            className="w-full text-xs bg-slate-50 border border-slate-200 focus:bg-white rounded-lg px-3 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-850 font-medium"
          />
          <span className="text-slate-400 text-xs">to</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => handleUpdateParam('maxPrice', e.target.value)}
            placeholder="Max"
            className="w-full text-xs bg-slate-50 border border-slate-200 focus:bg-white rounded-lg px-3 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-850 font-medium"
          />
        </div>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sort Results By</label>
        <select
          value={sort}
          onChange={(e) => handleUpdateParam('sort', e.target.value)}
          className="w-full text-xs bg-slate-50 border border-slate-200 focus:bg-white rounded-lg px-3.5 py-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-850 font-medium"
        >
          <option value="newest">Newest Listings</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default PropertyFilters;
