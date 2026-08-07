import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMapPin, HiCheckCircle, HiXCircle, HiInformationCircle, HiMiniSparkles, HiPhone, HiEnvelope, HiUser } from 'react-icons/hi2';
import { FaRulerCombined, FaCompass, FaTag } from 'react-icons/fa';
import realTimeSiteView from '../assets/real_time_site_view.png';

// Premium responsive dummy plots data mapped to coordinates (viewBox="0 0 1000 1000")
const DUMMY_PLOTS = [
  { 
    id: 'p1', 
    number: '101', 
    status: 'Available', 
    size: 2400, 
    area: 2400, 
    price: 8500000, 
    dimensions: '40 x 60 ft', 
    facing: 'South', 
    points: '200,770 310,770 295,930 185,930',
    coordinates: { x: 247, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Vikram Singh (Senior Associate)', phone: '+91 91000 82001', email: 'vikram.singh@svsrealestate.com' }
  },
  { 
    id: 'p2', 
    number: '102', 
    status: 'Sold', 
    size: 2400, 
    area: 2400, 
    price: 8500000, 
    dimensions: '40 x 60 ft', 
    facing: 'South', 
    points: '310,770 395,770 380,930 295,930',
    coordinates: { x: 345, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Ananya Roy (Sales Executive)', phone: '+91 91000 82002', email: 'ananya.roy@svsrealestate.com' }
  },
  { 
    id: 'p3', 
    number: '103', 
    status: 'Available', 
    size: 2400, 
    area: 2400, 
    price: 8600000, 
    dimensions: '40 x 60 ft', 
    facing: 'South', 
    points: '395,770 480,770 470,930 380,930',
    coordinates: { x: 428, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Vikram Singh (Senior Associate)', phone: '+91 91000 82001', email: 'vikram.singh@svsrealestate.com' }
  },
  { 
    id: 'p4', 
    number: '104', 
    status: 'Booked', 
    size: 3000, 
    area: 3000, 
    price: 11000000, 
    dimensions: '50 x 60 ft', 
    facing: 'South', 
    points: '480,770 550,770 545,930 470,930',
    coordinates: { x: 511, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Rohan Mehta (Acquisitions Manager)', phone: '+91 91000 82003', email: 'rohan.mehta@svsrealestate.com' }
  },
  { 
    id: 'p5', 
    number: '107', 
    status: 'Available', 
    size: 2400, 
    area: 2400, 
    price: 8500500, 
    dimensions: '40 x 60 ft', 
    facing: 'South', 
    points: '550,770 635,770 635,930 545,930',
    coordinates: { x: 591, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Ananya Roy (Sales Executive)', phone: '+91 91000 82002', email: 'ananya.roy@svsrealestate.com' }
  },
  { 
    id: 'p6', 
    number: '108', 
    status: 'Available', 
    size: 2400, 
    area: 2400, 
    price: 8500000, 
    dimensions: '40 x 60 ft', 
    facing: 'South', 
    points: '635,770 715,770 720,930 635,930',
    coordinates: { x: 676, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Vikram Singh (Senior Associate)', phone: '+91 91000 82001', email: 'vikram.singh@svsrealestate.com' }
  },
  { 
    id: 'p7', 
    number: '109', 
    status: 'Sold', 
    size: 2400, 
    area: 2400, 
    price: 8500000, 
    dimensions: '40 x 60 ft', 
    facing: 'South', 
    points: '715,770 790,770 805,930 720,930',
    coordinates: { x: 757, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Ananya Roy (Sales Executive)', phone: '+91 91000 82002', email: 'ananya.roy@svsrealestate.com' }
  },
  { 
    id: 'p8', 
    number: '105', 
    status: 'Available', 
    size: 3200, 
    area: 3200, 
    price: 11500000, 
    dimensions: '45 x 71 ft', 
    facing: 'South-East', 
    points: '790,770 915,770 950,900 805,930',
    coordinates: { x: 863, y: 850 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Rohan Mehta (Acquisitions Manager)', phone: '+91 91000 82003', email: 'rohan.mehta@svsrealestate.com' }
  },
  
  { 
    id: 'p9', 
    number: '59', 
    status: 'Available', 
    size: 2800, 
    area: 2800, 
    price: 9800000, 
    dimensions: '40 x 70 ft', 
    facing: 'North', 
    points: '250,630 350,630 338,715 240,715',
    coordinates: { x: 294, y: 672 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Vikram Singh (Senior Associate)', phone: '+91 91000 82001', email: 'vikram.singh@svsrealestate.com' }
  },
  { 
    id: 'p10', 
    number: '50', 
    status: 'Available', 
    size: 1800, 
    area: 1800, 
    price: 6500000, 
    dimensions: '30 x 60 ft', 
    facing: 'North', 
    points: '350,630 410,630 405,715 338,715',
    coordinates: { x: 375, y: 672 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Ananya Roy (Sales Executive)', phone: '+91 91000 82002', email: 'ananya.roy@svsrealestate.com' }
  },
  { 
    id: 'p11', 
    number: '51', 
    status: 'Sold', 
    size: 1800, 
    area: 1800, 
    price: 6500000, 
    dimensions: '30 x 60 ft', 
    facing: 'North', 
    points: '410,630 475,630 470,715 405,715',
    coordinates: { x: 441, y: 672 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Rohan Mehta (Acquisitions Manager)', phone: '+91 91000 82003', email: 'rohan.mehta@svsrealestate.com' }
  },
  { 
    id: 'p12', 
    number: '57', 
    status: 'Booked', 
    size: 1600, 
    area: 1600, 
    price: 5800000, 
    dimensions: '30 x 53 ft', 
    facing: 'East', 
    points: '390,595 480,595 475,630 390,630',
    coordinates: { x: 432, y: 612 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Ananya Roy (Sales Executive)', phone: '+91 91000 82002', email: 'ananya.roy@svsrealestate.com' }
  },
  { 
    id: 'p13', 
    number: '56', 
    status: 'Available', 
    size: 2000, 
    area: 2000, 
    price: 7200000, 
    dimensions: '35 x 57 ft', 
    facing: 'West', 
    points: '295,595 390,595 390,630 295,630',
    coordinates: { x: 342, y: 612 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Vikram Singh (Senior Associate)', phone: '+91 91000 82001', email: 'vikram.singh@svsrealestate.com' }
  },
  { 
    id: 'p14', 
    number: '55', 
    status: 'Sold', 
    size: 2000, 
    area: 2000, 
    price: 7200000, 
    dimensions: '35 x 57 ft', 
    facing: 'West', 
    points: '295,560 395,560 390,595 295,595',
    coordinates: { x: 342, y: 577 },
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
    ],
    contact: { agent: 'Rohan Mehta (Acquisitions Manager)', phone: '+91 91000 82003', email: 'rohan.mehta@svsrealestate.com' }
  },
];

const PlotDroneView = ({ propertyName, onSelectPlot, backgroundImage }) => {
  const [selectedPlot, setSelectedPlot] = useState(DUMMY_PLOTS[0]);
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('drone'); // drone or blueprint
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  const handlePlotClick = (plot) => {
    setSelectedPlot(plot);
    setIsPanelExpanded(true); // Auto-expand details panel on click (responsive helper)
    if (onSelectPlot) {
      onSelectPlot(plot);
    }
  };

  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return realTimeSiteView;
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl;
    }
    const hostUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${hostUrl}${imgUrl}`;
  };

  const getStatusColor = (status, isHovered = false) => {
    switch (status) {
      case 'Available':
        return isHovered ? 'rgba(34, 197, 94, 0.45)' : 'rgba(34, 197, 94, 0.25)';
      case 'Booked':
        return isHovered ? 'rgba(245, 158, 11, 0.55)' : 'rgba(245, 158, 11, 0.35)';
      case 'Sold':
        return isHovered ? 'rgba(239, 68, 68, 0.55)' : 'rgba(239, 68, 68, 0.35)';
      default:
        return 'rgba(255, 255, 255, 0.2)';
    }
  };

  const getStrokeColor = (status) => {
    switch (status) {
      case 'Available':
        return '#22c55e';
      case 'Booked':
        return '#f59e0b';
      case 'Sold':
        return '#ef4444';
      default:
        return '#ffffff';
    }
  };

  const filteredPlots = DUMMY_PLOTS.filter((plot) => {
    if (filter === 'All') return true;
    return plot.status === filter;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Header controls bar */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-md">
        <div>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
            <HiMiniSparkles className="animate-pulse" /> Interactive Layout Map
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">
            Drone View Layout Plan
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Select a plot segment directly on the aerial view to check dimensions, pricing & availability.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setViewMode('drone')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              viewMode === 'drone'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-350 hover:bg-slate-750'
            }`}
          >
            Drone View
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              viewMode === 'blueprint'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-350 hover:bg-slate-750'
            }`}
          >
            Layout Blueprint
          </button>
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Map Panel */}
        <div className="lg:col-span-2 relative bg-slate-950 overflow-hidden flex items-center justify-center min-h-[400px]">
          {/* Background Map Image */}
          {viewMode === 'drone' ? (
            <img
              src={getImageUrl(backgroundImage)}
              alt="Gated community drone view"
              className="w-full h-full object-cover aspect-square opacity-80 transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full aspect-square bg-slate-900 border-2 border-dashed border-slate-850 relative flex items-center justify-center overflow-hidden transition-all duration-300">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
              {/* Main access road in layout blueprint */}
              <div className="absolute top-[470px] left-0 right-0 h-14 bg-slate-850/80 border-t border-b border-slate-700/50 flex items-center justify-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Main Avenue Road (30ft Wide)</span>
              </div>
            </div>
          )}

          {/* SVG Overlay representing responsive mapped plots */}
          <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full select-none"
          >
            {/* Draw Roads and Landmarks in drone overlay */}
            {/* <rect x="0" y="270" width="1000" height="50" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="2" strokeDasharray="5,5" />
            <text x="500" y="300" fill="rgba(255, 255, 255, 0.4)" fontSize="14" fontWeight="bold" letterSpacing="4" textAnchor="middle">
              MAIN ROADWAY PASSAGE
            </text> */}

            {/* Render interactive plots */}
            {filteredPlots.map((plot) => {
              const isSelected = selectedPlot?.id === plot.id;
              const isHovered = hoveredPlot?.id === plot.id;
              return (
                <g key={plot.id} className="cursor-pointer">
                  {/* Polygon Shape */}
                  <polygon
                    points={plot.points}
                    fill={getStatusColor(plot.status, isSelected || isHovered)}
                    stroke={getStrokeColor(plot.status)}
                    strokeWidth={isSelected || isHovered ? 3 : 1.5}
                    onClick={() => handlePlotClick(plot)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    style={{
                      filter: isHovered ? `drop-shadow(0 0 10px ${getStrokeColor(plot.status)})` : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease-in-out'
                    }}
                    className="transition-all duration-150"
                  />
                  {/* Label tag inside polygon */}
                  {(() => {
                    const coords = plot.points.split(' ').map((p) => p.split(',').map(Number));
                    const centerX = coords.reduce((acc, c) => acc + c[0], 0) / coords.length;
                    const centerY = coords.reduce((acc, c) => acc + c[1], 0) / coords.length;
                    return (
                      <text
                        x={centerX}
                        y={centerY + 4}
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="900"
                        textAnchor="middle"
                        pointerEvents="none"
                        className="drop-shadow-lg font-sans"
                      >
                        {plot.number}
                      </text>
                    );
                  })()}
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip */}
          <AnimatePresence>
            {hoveredPlot && (() => {
              const coords = hoveredPlot.points.split(' ').map((p) => p.split(',').map(Number));
              const centerX = coords.reduce((acc, c) => acc + c[0], 0) / coords.length;
              const centerY = coords.reduce((acc, c) => acc + c[1], 0) / coords.length;

              let leftPercent = (centerX / 1000) * 100;
              let topPercent = (centerY / 1000) * 100;

              // Tooltip boundary collision detection to keep tooltips on-screen on mobile
              let translateX = '-50%';
              let translateY = '-130%';

              if (leftPercent < 18) {
                translateX = '0%';
                leftPercent = Math.max(2, leftPercent - 5);
              } else if (leftPercent > 82) {
                translateX = '-100%';
                leftPercent = Math.min(98, leftPercent + 5);
              }

              if (topPercent < 18) {
                translateY = '40%'; // Reposition below the plot
              }

              const getStatusIndicator = (status) => {
                switch (status) {
                  case 'Available': return '🟢';
                  case 'Booked': return '🟡';
                  case 'Sold': return '🔴';
                  default: return '⚪';
                }
              };

              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: translateY === '40%' ? 8 : -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: translateY === '40%' ? 8 : -8 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: `translate(${translateX}, ${translateY})`,
                    pointerEvents: 'none',
                    zIndex: 50,
                  }}
                  className="bg-slate-950/90 backdrop-blur-md border border-slate-700/50 text-white px-3 py-1.5 rounded-xl shadow-2xl text-[11px] flex items-center gap-2 whitespace-nowrap font-medium"
                >
                  <span className="font-extrabold text-slate-100">Plot {hoveredPlot.number}</span>
                  <span className="text-slate-600 font-normal">|</span>
                  <span className="flex items-center gap-1">
                    <span>{getStatusIndicator(hoveredPlot.status)}</span>
                    <span className="font-bold tracking-wide uppercase text-[10px]">{hoveredPlot.status}</span>
                  </span>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Compass Rose overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-lg flex items-center gap-2">
            <FaCompass className="text-amber-500 h-4.5 w-4.5 animate-spin-slow" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">North ↑</span>
          </div>

          {/* Color Legend */}
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-850 px-4 py-2.5 rounded-xl flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 block"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500">
              <span className="h-2 w-2 rounded-full bg-amber-500 block"></span>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-1.5 text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500 block"></span>
              <span>Sold</span>
            </div>
          </div>
        </div>

        {/* Details and Selection Panel */}
        <div className="bg-slate-850 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          {/* Mobile Collapsible Header Toggle */}
          <button
            onClick={() => setIsPanelExpanded(!isPanelExpanded)}
            className="lg:hidden w-full py-4 px-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 text-slate-300 font-bold text-xs flex items-center justify-between transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 block animate-pulse"></span>
              <span>Plot #{selectedPlot?.number || 'Select a Plot'} Parameters</span>
            </span>
            <span className="text-amber-500 font-extrabold">{isPanelExpanded ? '▼ Hide Details' : '▲ Show Details'}</span>
          </button>

          {/* Panel content wrapper */}
          <div className={`${isPanelExpanded ? 'block' : 'hidden lg:block'} p-6 space-y-6 flex-grow flex flex-col justify-between transition-all duration-300`}>
            <div className="space-y-6">
              {/* Status Selector Filters */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450">Filter Availability</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-900/70 p-1 rounded-lg border border-slate-800">
                  {['All', 'Available', 'Booked', 'Sold'].map((statusOpt) => (
                    <button
                      key={statusOpt}
                      onClick={() => setFilter(statusOpt)}
                      className={`py-1.5 text-[9px] font-bold uppercase rounded-md tracking-wider transition-all duration-200 ${
                        filter === statusOpt
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {statusOpt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Plot Specs */}
              <AnimatePresence mode="wait">
                {selectedPlot ? (
                  <motion.div
                    key={selectedPlot.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-450 tracking-wider">Selected Plot</span>
                        <h3 className="text-2xl font-black text-white">Plot #{selectedPlot.number}</h3>
                      </div>
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md ${
                          selectedPlot.status === 'Available' 
                            ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20' 
                            : selectedPlot.status === 'Booked' 
                            ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20' 
                            : 'bg-red-500/15 text-red-500 border border-red-500/20'
                        }`}>
                          {selectedPlot.status}
                        </span>
                      </div>
                    </div>

                    {/* Fact sheet list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                        <div className="flex items-center gap-2 text-slate-400">
                          <HiInformationCircle className="text-amber-500" />
                          <span>Plot ID</span>
                        </div>
                        <span className="font-bold text-white uppercase tracking-wider">{selectedPlot.id}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                        <div className="flex items-center gap-2 text-slate-400">
                          <FaRulerCombined className="text-amber-500" />
                          <span>Area Size</span>
                        </div>
                        <span className="font-bold text-white">{selectedPlot.size.toLocaleString()} Sqft</span>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                        <div className="flex items-center gap-2 text-slate-400">
                          <HiInformationCircle className="text-amber-500" />
                          <span>Dimensions</span>
                        </div>
                        <span className="font-bold text-white">{selectedPlot.dimensions}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                        <div className="flex items-center gap-2 text-slate-400">
                          <FaCompass className="text-amber-500" />
                          <span>Facing Direction</span>
                        </div>
                        <span className="font-bold text-white">{selectedPlot.facing}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                        <div className="flex items-center gap-2 text-slate-400">
                          <FaTag className="text-amber-500" />
                          <span>Standard Value</span>
                        </div>
                        <span className="font-bold text-amber-500 text-sm">
                          ₹{(selectedPlot.price / 100000).toFixed(2)} Lakhs
                        </span>
                      </div>

                      {selectedPlot.coordinates && (
                        <div className="flex items-center justify-between text-xs bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                          <div className="flex items-center gap-2 text-slate-400">
                            <HiMapPin className="text-amber-500" />
                            <span>Centroid (X, Y)</span>
                          </div>
                          <span className="font-bold text-slate-300 font-mono">
                            {selectedPlot.coordinates.x}px, {selectedPlot.coordinates.y}px
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Optional Plot Image Gallery */}
                    {selectedPlot.images && selectedPlot.images.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-450">Plot View Gallery</span>
                        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                          {selectedPlot.images.map((imgUrl, index) => (
                            <div key={index} className="h-16 w-24 shrink-0 rounded-lg overflow-hidden border border-slate-800 shadow-inner bg-slate-900">
                              <img src={imgUrl} alt={`Plot ${selectedPlot.number} view ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Information card */}
                    {selectedPlot.contact && (
                      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2.5 mt-4 text-[11px]">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-450">Assigned Broker</span>
                        <div className="flex items-center gap-2 text-white font-bold">
                          <HiUser className="text-amber-500 h-4.5 w-4.5 shrink-0" />
                          <span>{selectedPlot.contact.agent}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 text-slate-350 font-medium">
                          <a href={`tel:${selectedPlot.contact.phone}`} className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                            <HiPhone className="text-amber-500/80 h-3.5 w-3.5 shrink-0" />
                            <span>{selectedPlot.contact.phone}</span>
                          </a>
                          <a href={`mailto:${selectedPlot.contact.email}`} className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                            <HiEnvelope className="text-amber-500/80 h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{selectedPlot.contact.email}</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Quick Booking CTA - Moved inside animated container */}
                    <div className="pt-4 border-t border-slate-800/60 mt-4">
                      {selectedPlot.status === 'Available' ? (
                        <button
                          onClick={() => {
                            const inquiryTextarea = document.getElementById('inquiryMessageInput');
                            if (inquiryTextarea) {
                              inquiryTextarea.value = `Hello, I am interested in inquiring about Plot No. ${selectedPlot.number} (${selectedPlot.size} Sqft, facing ${selectedPlot.facing}) at ${propertyName}. Please share payment plans and availability details.`;
                              inquiryTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                              inquiryTextarea.focus();
                            }
                            window.scrollTo({
                              top: document.getElementById('inquiryFormCard')?.offsetTop || 1200,
                              behavior: 'smooth'
                            });
                          }}
                          className="w-full bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/10 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <HiCheckCircle className="h-4.5 w-4.5 shrink-0" />
                          <span>Enquire Plot #{selectedPlot.number}</span>
                        </button>
                      ) : (
                        <div className="w-full border border-slate-800 bg-slate-900/30 text-center py-3 px-4 rounded-xl text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1.5 animate-pulse">
                          <HiXCircle className="h-4 w-4 text-red-500" />
                          <span>Plot #{selectedPlot.number} is currently {selectedPlot.status}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-xs text-slate-500">Select a plot coordinate to examine parameters.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mini interactive list representing selected filter */}
      <div className="p-4 bg-slate-950/40 border-t border-slate-800/60 flex items-center gap-3 overflow-x-auto">
        <span className="text-[9px] uppercase font-bold text-slate-500 shrink-0">Select Quick:</span>
        <div className="flex gap-2">
          {filteredPlots.map((plot) => (
            <button
              key={plot.id}
              onClick={() => handlePlotClick(plot)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                selectedPlot?.id === plot.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-850 text-slate-350 hover:bg-slate-800'
              }`}
            >
              #{plot.number} ({plot.status[0]})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlotDroneView;
