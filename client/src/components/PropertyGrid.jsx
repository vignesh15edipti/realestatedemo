import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ properties, loading, isAdmin = false, onDelete = null, onToggleFeatured = null }) => {
  // Skeleton Loader for Properties Grid
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 animate-pulse h-[400px] flex flex-col">
            <div className="bg-slate-200 h-56 w-full"></div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-slate-200 h-4 w-16 rounded"></div>
                  <div className="bg-slate-200 h-4 w-28 rounded"></div>
                </div>
                <div className="bg-slate-200 h-5 w-3/4 rounded mb-3"></div>
                <div className="bg-slate-200 h-6 w-1/3 rounded"></div>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between">
                <div className="bg-slate-200 h-4 w-12 rounded"></div>
                <div className="bg-slate-200 h-4 w-12 rounded"></div>
                <div className="bg-slate-200 h-4 w-16 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100 px-6 max-w-lg mx-auto">
        <span className="text-5xl">🔍</span>
        <h3 className="text-lg font-bold text-slate-800 mt-4 mb-2">No Properties Found</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          We couldn't find any listings matching your search filters. Try broadening your criteria or resetting the active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
