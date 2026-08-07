import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchPropertyDetails, clearSelectedProperty, fetchProperties } from '../redux/propertiesSlice';
import InquiryForm from '../components/InquiryForm';
import PropertyCard, { formatPrice } from '../components/PropertyCard';
import {
  HiMapPin,
  HiStar,
  HiCheckCircle,
  HiArrowLeft,
  HiPhone,
  HiEnvelope,
} from 'react-icons/hi2';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import PlotDroneView from '../components/PlotDroneView';

const PropertyDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selectedProperty, detailLoading, properties } = useSelector((state) => state.properties);

  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    dispatch(fetchPropertyDetails(slug));
    return () => {
      dispatch(clearSelectedProperty());
    };
  }, [dispatch, slug]);

  useEffect(() => {
    if (selectedProperty) {
      if (selectedProperty.images && selectedProperty.images.length > 0) {
        setActiveImage(selectedProperty.images[0]);
      } else {
        setActiveImage('');
      }

      // Fetch similar properties of same type
      dispatch(
        fetchProperties({
          propertyType: selectedProperty.propertyType,
          limit: 4,
          active: 'true',
        })
      );
    }
  }, [selectedProperty, dispatch]);

  const getImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${url}`;
  };

  if (detailLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[500px]">
        <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-amber-500"></div>
        <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-widest">Retrieving Listing Portfolio...</p>
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Listing Portfolio Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          The property profile you are attempting to review may have been leased, sold, or deactivated by the managing broker.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center space-x-2 text-sm font-bold text-amber-600 hover:text-amber-700"
        >
          <HiArrowLeft />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const {
    _id,
    title,
    description,
    propertyType,
    status,
    price,
    location,
    address,
    city,
    state,
    pincode,
    bedrooms,
    bathrooms,
    areaSqft,
    amenities,
    images,
    featured,
  } = selectedProperty;

  // Filter out the current property from recommendations
  const similarListings = properties.filter((p) => p._id !== _id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{`${title} | SVS Real Estate`}</title>
        <meta name="description" content={description.substring(0, 155)} />
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            to="/properties"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-amber-600 uppercase tracking-wider transition duration-200"
          >
            <HiArrowLeft className="h-4 w-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>

        {/* Drone Layout Plan for Plot Properties */}
        {propertyType === 'Plot' && (
          <div className="w-full">
            <PlotDroneView propertyName={title} backgroundImage={images?.[0]} />
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visual Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-[300px] md:h-[500px] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <img
                src={getImageUrl(activeImage)}
                alt={title}
                className="w-full h-full object-cover"
              />
              {featured && (
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
                  <HiStar className="h-4.5 w-4.5" />
                  <span>Featured Estate</span>
                </div>
              )}
            </div>

            {/* Thumbnail Carousel Strip */}
            {images && images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(url)}
                    className={`h-20 w-28 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === url ? 'border-amber-500 scale-95 shadow-md' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={getImageUrl(url)}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Facts Summary Side-deck */}
          <div className="space-y-6 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
              {/* Type Badge & Status */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded">
                  {propertyType}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded ${
                  status === 'Sale' ? 'bg-slate-900 text-amber-500' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  For {status}
                </span>
              </div>

              {/* Title & Location */}
              <div className="space-y-2">
                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight">
                  {title}
                </h1>
                <div className="flex items-center text-slate-500 text-sm font-medium">
                  <HiMapPin className="h-5 w-5 text-amber-500 mr-1.5 shrink-0" />
                  <span>{location}, {city}</span>
                </div>
              </div>

              {/* Formatted Price */}
              <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
                <span className="text-xs uppercase font-bold text-slate-400">Valuation</span>
                <span className="text-2xl font-black text-slate-900">
                  {formatPrice(price)}
                  {status === 'Rent' && <span className="text-xs font-normal text-slate-500"> / month</span>}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 text-center text-slate-700 font-semibold border-t border-b border-slate-100 py-5">
                {bedrooms > 0 && (
                  <div className="space-y-1">
                    <FaBed className="mx-auto text-lg text-slate-400" />
                    <span className="block text-xs text-slate-800 font-bold">{bedrooms} BHK</span>
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Bedrooms</span>
                  </div>
                )}
                {bathrooms > 0 && (
                  <div className="space-y-1">
                    <FaBath className="mx-auto text-lg text-slate-400" />
                    <span className="block text-xs text-slate-800 font-bold">{bathrooms} Baths</span>
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Bathrooms</span>
                  </div>
                )}
                <div className="space-y-1">
                  <FaRulerCombined className="mx-auto text-lg text-slate-400" />
                  <span className="block text-xs text-slate-800 font-bold">{areaSqft} sqft</span>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Area</span>
                </div>
              </div>

              {/* Agent card */}
              <div className="flex items-center space-x-4 pt-2">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                    alt="Senior advisor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Devika Sen</h4>
                  <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider">Lead Advisory Associate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body Details + Inquiry Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Description details */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 space-y-8">
            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Property Narrative
              </h3>
              <p className="text-slate-550 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Address specifications */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Detailed Address
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Street Address</span>
                  <span className="text-slate-800 font-medium">{address}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Locality / Zone</span>
                  <span className="text-slate-800 font-medium">{location}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">City & State</span>
                  <span className="text-slate-800 font-medium">{city}, {state}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Pincode</span>
                  <span className="text-slate-800 font-medium">{pincode}</span>
                </div>
              </div>
            </div>

            {/* Amenities Checklist */}
            {amenities && amenities.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                  Premium Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <HiCheckCircle className="text-emerald-500 h-5 w-5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map Placeholder */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
                Geographic Location
              </h3>
              <div className="bg-slate-100 border border-slate-200 rounded-xl h-64 w-full flex flex-col items-center justify-center text-center p-4">
                <HiMapPin className="text-amber-500 h-10 w-10 animate-bounce mb-2" />
                <span className="text-sm font-bold text-slate-800 block">Jubilee Hills, Hyderabad - India</span>
                <span className="text-slate-400 text-xs mt-1 block max-w-sm">
                  Google Maps API integration placeholder. Accurate coordinates and custom routing will be provided upon reservation.
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Inquiry Form Desk */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <InquiryForm propertyId={_id} propertyTitle={title} />
            </div>
          </aside>
        </div>

        {/* Similar Listings Recommendations */}
        {similarListings.length > 0 && (
          <section className="pt-12 border-t border-slate-200">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">Recommended Collections</span>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-wide mt-1">Similar Listings</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarListings.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PropertyDetails;
