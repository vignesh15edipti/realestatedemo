import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | SVS Real Estate</title>
      </Helmet>

      <div className="max-w-md mx-auto text-center py-20 px-6 space-y-6">
        <span className="text-7xl block">🏛️</span>
        <h1 className="text-4xl font-extrabold text-slate-900">404 Error</h1>
        <h2 className="text-lg font-bold text-slate-800">Portfolio Section Not Found</h2>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
          The page or real estate collection you are attempting to access does not exist. Check the URL path or return to our property listing portal.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase tracking-wider text-xs px-8 py-3 rounded-lg shadow transition"
          >
            Go back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
