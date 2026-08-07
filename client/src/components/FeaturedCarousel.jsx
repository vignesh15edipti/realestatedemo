import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight, HiMapPin, HiStar } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from './PropertyCard';

const FeaturedCarousel = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (properties.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [properties, currentIndex]);

  if (!properties || properties.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
  };

  const current = properties[currentIndex];

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${imgUrl}`;
  };

  return (
    <div className="relative w-full h-[550px] bg-slate-950 overflow-hidden rounded-2xl shadow-2xl group border border-slate-900">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={getImageUrl(current.images?.[0])}
            alt={current.title}
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Text Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 md:max-w-3xl space-y-4 md:space-y-6">
        <div className="inline-flex items-center space-x-2 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
          <HiStar className="h-3.5 w-3.5" />
          <span>Featured Masterpiece</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-wide drop-shadow-md">
            {current.title}
          </h2>
          <div className="flex items-center text-slate-300 text-sm">
            <HiMapPin className="h-4.5 w-4.5 text-amber-500 mr-1.5 shrink-0" />
            <span>{current.address}, {current.location}, {current.city}</span>
          </div>
        </div>

        <p className="text-slate-400 text-xs md:text-sm leading-relaxed line-clamp-2">
          {current.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0 pt-2">
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Guaranteed Value</span>
            <span className="text-xl md:text-2xl font-black text-amber-500">
              {formatPrice(current.price)}
              {current.status === 'Rent' && <span className="text-xs font-normal text-slate-400"> / mo</span>}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Property Spec</span>
            <span className="text-xs md:text-sm font-semibold text-white">
              {current.bedrooms > 0 ? `${current.bedrooms} BHK | ` : ''}
              {current.bathrooms > 0 ? `${current.bathrooms} Bath | ` : ''}
              {current.areaSqft} sqft
            </span>
          </div>
          <div className="pt-1">
            <Link
              to={`/properties/${current.slug}`}
              className="inline-block bg-white hover:bg-amber-500 hover:text-slate-900 text-slate-900 font-bold uppercase tracking-wider text-[10px] px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Examine Details
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows (only if > 1 slide) */}
      {properties.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-900 text-white transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md border border-white/5"
          >
            <HiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-900 text-white transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-md border border-white/5"
          >
            <HiChevronRight className="h-6 w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 right-6 md:right-12 flex space-x-2">
            {properties.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-amber-500 shadow-md' : 'w-2 bg-white/40'
                }`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedCarousel;
