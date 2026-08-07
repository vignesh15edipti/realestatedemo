import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchProperties } from '../redux/propertiesSlice';
import PropertyFilters from '../components/PropertyFilters';
import PropertyGrid from '../components/PropertyGrid';
import Pagination from '../components/Pagination';

const PropertyListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { properties, loading, pages, currentPage, total } = useSelector(
    (state) => state.properties
  );

  // Sync URL search parameters with API request
  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    // Default page is 1
    if (!params.page) params.page = '1';
    // Default limit is 9 for the grid layout
    if (!params.limit) params.limit = '9';
    // Active filter defaults to true for public view
    if (!params.active) params.active = 'true';

    dispatch(fetchProperties(params));
  }, [dispatch, searchParams]);

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    // Scroll to listings top
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Browse Luxury Real Estate Listings | SVS Real Estate</title>
        <meta name="description" content="Search verified properties for sale and rent including premium apartments, high-end villas, ready villa plots, and commercial showrooms." />
      </Helmet>

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <span className="text-amber-500 uppercase tracking-widest text-[10px] font-bold">Premier Catalog</span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">Available Properties</h1>
          <p className="text-xs text-slate-400 font-medium">
            Showing {properties?.length || 0} of {total} verified holdings
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <PropertyFilters />
          </aside>

          {/* Listings Display Grid */}
          <div className="lg:col-span-3 space-y-6">
            <PropertyGrid properties={properties} loading={loading} />
            <Pagination
              currentPage={currentPage}
              totalPages={pages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyListing;
