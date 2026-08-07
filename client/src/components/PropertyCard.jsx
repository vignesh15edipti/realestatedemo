import React from 'react';
import { Link } from 'react-router-dom';
import { HiMapPin, HiTrash, HiHeart, HiStar } from 'react-icons/hi2';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Currency Formatting Helper (Indian Rupee Lakhs / Crores)
export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

const PropertyCard = ({ property, isAdmin = false, onDelete = null, onToggleFeatured = null }) => {
  const {
    _id,
    title,
    slug,
    propertyType,
    status,
    price,
    location,
    city,
    bedrooms,
    bathrooms,
    areaSqft,
    images,
    featured,
  } = property;

  // Resolve image URL (checks if relative or absolute)
  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${imgUrl}`;
  };

  const mainImage = images && images.length > 0 ? getImageUrl(images[0]) : getImageUrl(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative"
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-amber-500 text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md flex items-center space-x-1">
          <HiStar className="h-3 w-3" />
          <span>Featured</span>
        </div>
      )}

      {/* Rent / Sale Badge */}
      <div className={`absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md ${
        status === 'Sale' ? 'bg-slate-900 text-amber-500' : 'bg-emerald-600 text-white'
      }`}>
        For {status}
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden h-56 shrink-0 bg-slate-100">
        <img
          src={mainImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Type & Location */}
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
            {propertyType}
          </span>
          <div className="flex items-center text-slate-500 text-xs font-medium">
            <HiMapPin className="h-4 w-4 text-slate-400 mr-1 shrink-0" />
            <span className="truncate max-w-[150px]">{location}, {city}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/properties/${slug}`} className="hover:text-amber-600 transition duration-200">
          <h3 className="text-base font-semibold text-slate-800 line-clamp-1 mb-2">
            {title}
          </h3>
        </Link>

        {/* Price Tag */}
        <div className="text-lg font-bold text-slate-900 mb-4">
          {formatPrice(price)}
          {status === 'Rent' && <span className="text-xs font-normal text-slate-500"> / month</span>}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-3"></div>

        {/* Specs Grid */}
        <div className="flex items-center justify-between text-slate-600 text-xs font-medium mt-auto">
          {bedrooms > 0 && (
            <div className="flex items-center space-x-1.5">
              <FaBed className="text-slate-400 text-sm" />
              <span>{bedrooms} BHK</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center space-x-1.5">
              <FaBath className="text-slate-400 text-sm" />
              <span>{bathrooms} Bath</span>
            </div>
          )}
          <div className="flex items-center space-x-1.5">
            <FaRulerCombined className="text-slate-400 text-sm" />
            <span>{areaSqft} sqft</span>
          </div>
        </div>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center gap-2">
          <Link
            to={`/admin/properties/edit/${_id}`}
            className="flex-1 text-center bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold py-2 rounded transition duration-200 shadow-sm"
          >
            Edit Listing
          </Link>
          {onToggleFeatured && (
            <button
              onClick={() => onToggleFeatured(_id)}
              title="Toggle Featured"
              className={`p-2 rounded border transition duration-200 shadow-sm ${
                featured
                  ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'
                  : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
              }`}
            >
              <HiStar className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(_id)}
              title="Delete Property"
              className="p-2 rounded bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 transition duration-200 shadow-sm"
            >
              <HiTrash className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PropertyCard;
