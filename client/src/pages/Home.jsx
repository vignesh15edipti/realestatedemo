import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSearch from '../components/HeroSearch';
import FeaturedCarousel from '../components/FeaturedCarousel';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/propertyService';
import { motion } from 'framer-motion';
import {
  HiShieldCheck,
  HiGlobeAlt,
  HiUsers,
  HiBriefcase,
  HiChevronRight,
} from 'react-icons/hi2';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [latestProperties, setLatestProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        // Fetch featured properties
        const featData = await propertyService.getProperties({ featured: 'true', limit: 5 });
        if (featData.success) {
          setFeaturedProperties(featData.properties);
        }

        // Fetch latest properties
        const latestData = await propertyService.getProperties({ limit: 3, sort: 'newest' });
        if (latestData.success) {
          setLatestProperties(latestData.properties);
        }
      } catch (error) {
        console.error('Failed to load home page data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const categories = [
    { title: 'Apartments', type: 'Apartment', desc: 'Luxury Penthouses & Duplexes', icon: '🏢' },
    { title: 'Villas', type: 'Villa', desc: 'Elite Resplendent Estates', icon: '🏡' },
    { title: 'Plots', type: 'Plot', desc: 'Premium Land & Gated Plots', icon: '🏞️' },
    { title: 'Commercial', type: 'Commercial', desc: 'Grade-A Offices & Showrooms', icon: '🏬' },
  ];

  const handleCategoryClick = (type) => {
    navigate(`/properties?propertyType=${type}`);
  };

  return (
    <>
      <Helmet>
        <title>SVS Real Estate | Luxury Homes, Villas & Premium Properties</title>
        <meta name="description" content="Explore elite residential penthouses, luxury country villas, gated estate plots, and grade-A commercial office workspaces in India with SVS Real Estate." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-slate-950 pt-20 pb-36 md:py-48 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury architecture background"
            className="w-full h-full object-cover scale-105 filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="text-amber-500 uppercase tracking-widest text-xs md:text-sm font-bold block">
              Architects of Trust & Splendor
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
              Invest In Your <span className="text-amber-500">Legacy</span>
            </h1>
            <p className="text-slate-350 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              We guide HNIs and discerning families to premier properties, custom-designed plots, and verified commercial spaces across India.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeroSearch />
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Carousel */}
      {featuredProperties.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">Elite Collection</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-wide">Featured Masterpieces</h2>
            </div>
            <Link to="/properties" className="mt-4 md:mt-0 text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center space-x-1 justify-center">
              <span>View All Properties</span>
              <HiChevronRight />
            </Link>
          </div>
          <FeaturedCarousel properties={featuredProperties} />
        </section>
      )}

      {/* Category Navigation */}
      <section className="bg-slate-100 py-20 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Curated Portfolios</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-wide">Browse by Property Class</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explore listings filtered by distinct utility classifications tailored to support high-end living or corporate hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(cat.type)}
                className="group bg-white rounded-xl shadow-sm border border-slate-200/40 p-8 text-center cursor-pointer hover:shadow-md hover:border-amber-500 transition-all duration-300 flex flex-col items-center"
              >
                <span className="text-5xl mb-4 transform group-hover:scale-115 transition duration-300 block">
                  {cat.icon}
                </span>
                <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About SVS Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video lg:aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
                alt="Luxury building glass facade"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay statistics */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 hidden sm:block max-w-[200px]">
              <span className="text-3xl font-black text-amber-500 block">₹450 Cr+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Investments Managed</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">Heritage of Excellence</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-wide leading-tight">
              A Bespoke Approach to Wealth In Real Estate
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              At SVS Real Estate, we believe a home is not merely bricks and mortar, but a physical extension of your family's achievements. Founded by veteran investment bankers and seasoned developers, we bridge the gap between financial due diligence and physical luxury.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every listing, whether a ready-to-move-in villa in Goa or a premium commercial building in Bangalore, undergoes stringent legal checks and structural auditing.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-3">
                <HiShieldCheck className="text-amber-500 h-8 w-8 shrink-0" />
                <span className="text-slate-800 text-xs font-bold uppercase tracking-wider">100% Title Verified</span>
              </div>
              <div className="flex items-center space-x-3">
                <HiUsers className="text-amber-500 h-8 w-8 shrink-0" />
                <span className="text-slate-800 text-xs font-bold uppercase tracking-wider">Bespoke Advisory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      {latestProperties.length > 0 && (
        <section className="bg-slate-100 py-20 border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">Recent Additions</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-wide">Latest Opportunities</h2>
              </div>
              <Link to="/properties" className="mt-4 md:mt-0 text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center space-x-1 justify-center">
                <span>Browse Full Catalog</span>
                <HiChevronRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestProperties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 font-bold">Core Strengths</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-wide">Why High-Net-Worth Buyers Select SVS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200/55 space-y-4">
            <div className="h-12 w-12 bg-amber-100 text-amber-600 flex items-center justify-center rounded-lg">
              <HiShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Absolute Legal Guard</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              We conduct three-tier legal checks and ensure clear titles for all plots and residential holdings, ensuring a bulletproof transfer of ownership.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200/55 space-y-4">
            <div className="h-12 w-12 bg-amber-100 text-amber-600 flex items-center justify-center rounded-lg">
              <HiBriefcase className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Curated Portfolios</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              We focus on Grade-A design, excellent structural engineering, premium locations, and strong resale retention values. No standard inventory.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200/55 space-y-4">
            <div className="h-12 w-12 bg-amber-100 text-amber-600 flex items-center justify-center rounded-lg">
              <HiUsers className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Concierge Relations</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Our relationship manager handles everything from loan processing with tier-1 private banks to post-sale home automation setup.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            Looking to Buy or Liquidate a Premium Property?
          </h2>
          <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a confidential call with our managing directors or request a brochure for current off-market listings.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-block"
            >
              Consult an Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
