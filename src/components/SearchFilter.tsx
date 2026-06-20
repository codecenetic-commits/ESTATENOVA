'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, SlidersHorizontal, MapPin, DollarSign, Home, BedDouble, Bath } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export interface SearchFilters {
  status: 'Buy' | 'Rent';
  type: string;
  city: string;
  priceRange: number; // max price
  beds: string; // 'Any' | '1' | '2' | '3' | '4' | '5+'
  baths: string; // 'Any' | '1' | '2' | '3' | '4+'
  keyword: string;
}

interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, initialFilters }) => {
  const { formatPrice } = useApp();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [status, setStatus] = useState<'Buy' | 'Rent'>(initialFilters?.status || 'Buy');
  const [type, setType] = useState(initialFilters?.type || 'All');
  const [city, setCity] = useState(initialFilters?.city || 'All');
  const [beds, setBeds] = useState(initialFilters?.beds || 'Any');
  const [baths, setBaths] = useState(initialFilters?.baths || 'Any');
  const [keyword, setKeyword] = useState(initialFilters?.keyword || '');

  // Default Max Price Slider settings
  // If Buy -> max price is 35M, default 35M. If Rent -> max price is 50k, default 50k.
  const maxPriceLimit = status === 'Buy' ? 35000000 : 50000;
  const [priceRange, setPriceRange] = useState(initialFilters?.priceRange !== undefined ? initialFilters.priceRange : maxPriceLimit);

  // Sync state if initialFilters changes externally
  React.useEffect(() => {
    if (initialFilters) {
      setStatus(initialFilters.status);
      setType(initialFilters.type);
      setCity(initialFilters.city);
      setBeds(initialFilters.beds);
      setBaths(initialFilters.baths);
      setPriceRange(initialFilters.priceRange);
      setKeyword(initialFilters.keyword);
    }
  }, [initialFilters]);

  // Automatically update price range if status changes to stay in limits
  const handleStatusChange = (newStatus: 'Buy' | 'Rent') => {
    setStatus(newStatus);
    setPriceRange(newStatus === 'Buy' ? 35000000 : 50000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      status,
      type,
      city,
      priceRange,
      beds,
      baths,
      keyword,
    });
  };

  const handleClearFilters = () => {
    setType('All');
    setCity('All');
    setBeds('Any');
    setBaths('Any');
    setPriceRange(status === 'Buy' ? 35000000 : 50000);
    setKeyword('');
    onSearch({
      status,
      type: 'All',
      city: 'All',
      priceRange: status === 'Buy' ? 35000000 : 50000,
      beds: 'Any',
      baths: 'Any',
      keyword: '',
    });
  };

  const types = ['All', 'Villa', 'Apartment', 'Penthouse', 'Mansion', 'Beachfront', 'Smart Home'];
  const cities = ['All', 'Miami Beach', 'Miami', 'Sunny Isles Beach', 'Coral Gables', 'Key Biscayne', 'Wynwood', 'Golden Beach'];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 relative z-35 -mt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-premium rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 dark:border-white/5"
      >
        <form onSubmit={handleSearchSubmit} className="space-y-6">
          {/* Top Line: Status (Buy/Rent Toggle) & Basic Keyword Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/20 dark:border-slate-800/60 pb-6">
            {/* Tabs for Buy/Rent */}
            <div className="flex space-x-1 p-1 bg-slate-200 dark:bg-slate-900 rounded-full border border-slate-350 dark:border-slate-800">
              {(['Buy', 'Rent'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleStatusChange(mode)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    status === mode
                      ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/10'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  For {mode}
                </button>
              ))}
            </div>

            {/* Keyword Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search location, features, keywords..."
                className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          {/* Grid of Basic Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Property Type */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Home size={13} className="text-gold-500" />
                <span>Property Type</span>
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white appearance-none focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  {types.map((t) => (
                    <option key={t} value={t} className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
                      {t === 'All' ? 'All Types' : t}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Location City */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <MapPin size={13} className="text-gold-500" />
                <span>Location City</span>
              </label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white appearance-none focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  {cities.map((c) => (
                    <option key={c} value={c} className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
                      {c === 'All' ? 'All Cities' : c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                  <DollarSign size={13} className="text-gold-500" />
                  <span>Max Price</span>
                </label>
                <span className="text-xs font-bold text-gold-500">{formatPrice(priceRange)}</span>
              </div>
              <input
                type="range"
                min={status === 'Buy' ? 1000000 : 1000}
                max={maxPriceLimit}
                step={status === 'Buy' ? 500000 : 500}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-gold-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-450">
                <span>{formatPrice(status === 'Buy' ? 1000000 : 1000)}</span>
                <span>{formatPrice(maxPriceLimit)}</span>
              </div>
            </div>

            {/* Action Buttons (Submit & Toggle Advanced) */}
            <div className="flex items-end gap-3">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="p-3 bg-slate-100 dark:bg-slate-950 border border-slate-350 dark:border-slate-800 hover:border-gold-500 rounded-xl text-slate-600 dark:text-slate-350 hover:text-gold-500 transition-colors flex items-center justify-center"
                title="Advanced Filters"
              >
                <SlidersHorizontal size={18} />
              </button>

              <button
                type="submit"
                className="flex-1 py-3 bg-gold-gradient hover:shadow-lg hover:shadow-gold-500/10 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl transition-all active:scale-95"
              >
                Find Property
              </button>
            </div>
          </div>

          {/* Advanced Filters Drawer */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-slate-800/20 dark:border-slate-800/60 pt-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Bedrooms */}
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                      <BedDouble size={13} className="text-gold-500" />
                      <span>Bedrooms</span>
                    </label>
                    <div className="flex bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-1 justify-between">
                      {['Any', '3', '4', '5+'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBeds(opt)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                            beds === opt
                              ? 'bg-slate-250 dark:bg-slate-900 text-gold-500 border border-gold-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                      <Bath size={13} className="text-gold-500" />
                      <span>Bathrooms</span>
                    </label>
                    <div className="flex bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-1 justify-between">
                      {['Any', '3', '4', '5+'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBaths(opt)}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                            baths === opt
                              ? 'bg-slate-250 dark:bg-slate-900 text-gold-500 border border-gold-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filter Action */}
                  <div className="flex items-end justify-start sm:col-span-2 md:col-span-1">
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-gold-500 dark:hover:text-gold-450 border border-dashed border-slate-400 dark:border-slate-800 rounded-xl px-5 py-3 hover:border-gold-500 transition-colors w-full"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};
