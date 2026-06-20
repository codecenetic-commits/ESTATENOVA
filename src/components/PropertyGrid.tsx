'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Sparkles, History, MapPin } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { Property, properties } from '@/data/properties';
import { SearchFilters } from './SearchFilter';
import { useApp } from '@/context/AppContext';

interface PropertyGridProps {
  filters: SearchFilters;
  onViewDetails: (property: Property) => void;
}

type TabType = 'Latest' | 'Featured' | 'Luxury' | 'Popular';

export const PropertyGrid: React.FC<PropertyGridProps> = ({ filters, onViewDetails }) => {
  const { recentlyViewed, formatPrice } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('Latest');
  const [showCount, setShowCount] = useState(8);

  // Apply filters
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Status (Buy/Rent)
      if (prop.status !== filters.status) return false;

      // 2. Property Type
      if (filters.type !== 'All' && prop.type !== filters.type) return false;

      // 3. Location City
      if (filters.city !== 'All' && prop.location.city !== filters.city) return false;

      // 4. Price Limit
      if (prop.price > filters.priceRange) return false;

      // 5. Bedrooms
      if (filters.beds !== 'Any') {
        const bedVal = parseInt(filters.beds);
        if (filters.beds.includes('+')) {
          if (prop.beds < bedVal) return false;
        } else {
          if (prop.beds !== bedVal) return false;
        }
      }

      // 6. Bathrooms
      if (filters.baths !== 'Any') {
        const bathVal = parseInt(filters.baths);
        if (filters.baths.includes('+')) {
          if (prop.baths < bathVal) return false;
        } else {
          if (prop.baths !== bathVal) return false;
        }
      }

      // 7. Keyword
      if (filters.keyword) {
        const q = filters.keyword.toLowerCase();
        const matchesKeyword =
          prop.title.toLowerCase().includes(q) ||
          prop.tagline.toLowerCase().includes(q) ||
          prop.description.toLowerCase().includes(q) ||
          prop.location.city.toLowerCase().includes(q) ||
          prop.location.neighborhood.toLowerCase().includes(q) ||
          prop.features.some((f) => f.toLowerCase().includes(q)) ||
          prop.amenities.some((a) => a.toLowerCase().includes(q));
        if (!matchesKeyword) return false;
      }

      return true;
    });
  }, [filters]);

  // Apply quick tabs sorting/filtering on top of current filter set
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    if (activeTab === 'Latest') {
      // Sort by year built descending, then by price descending
      return list.sort((a, b) => b.yearBuilt - a.yearBuilt);
    }
    if (activeTab === 'Featured') {
      // Show properties that are > $10M or rated 4.9+
      return list.filter((p) => p.price > 10000000 || p.rating >= 4.9);
    }
    if (activeTab === 'Luxury') {
      // Sort by price descending
      return list.sort((a, b) => b.price - a.price);
    }
    if (activeTab === 'Popular') {
      // Sort by rating descending
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProperties, activeTab]);

  // Load recently viewed details
  const recentPropertiesList = useMemo(() => {
    return recentlyViewed
      .map((id) => properties.find((p) => p.id === id))
      .filter((p): p is Property => p !== undefined);
  }, [recentlyViewed]);

  const tabs: TabType[] = ['Latest', 'Featured', 'Luxury', 'Popular'];

  return (
    <section id="properties" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-500">EstateNova Collections</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-serif text-slate-900 dark:text-white">
              Featured Luxury Listings
            </h2>
          </div>

          {/* Quick Sorting Tabs */}
          <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-1 w-full md:w-auto overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowCount(8); // Reset count
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider relative transition-colors ${
                  activeTab === tab
                    ? 'text-gold-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-semibold uppercase tracking-wider">
          <SlidersHorizontal size={12} className="text-gold-500" />
          <span>Found {sortedProperties.length} Premium Property Matches</span>
        </div>

        {/* Grid List */}
        {sortedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {sortedProperties.slice(0, showCount).map((prop) => (
                  <motion.div
                    key={prop.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PropertyCard property={prop} onViewDetails={onViewDetails} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {sortedProperties.length > showCount && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowCount((prev) => prev + 4)}
                  className="px-8 py-3 rounded-full border border-slate-350 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-gold-500 hover:text-gold-500 font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
                >
                  Load More Properties
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 glass-premium rounded-3xl border border-dashed border-slate-300 dark:border-slate-800"
          >
            <div className="inline-flex p-4 rounded-full bg-gold-500/5 text-gold-500 mb-4 border border-gold-500/20">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-2">No Matching Assets Found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
              We couldn’t find any luxury properties matching your exact search criteria. Try modifying your filters.
            </p>
          </motion.div>
        )}

        {/* Recently Viewed Properties Section */}
        {recentPropertiesList.length > 0 && (
          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-800/80 text-left">
            <div className="flex items-center space-x-2 text-gold-500 mb-6">
              <History size={18} />
              <h3 className="text-lg font-bold font-serif tracking-wide text-slate-900 dark:text-white">
                Recently Viewed Properties
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {recentPropertiesList.map((recent) => (
                <div
                  key={recent.id}
                  onClick={() => onViewDetails(recent)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl hover:border-gold-500 dark:hover:border-gold-500/50 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group text-left"
                >
                  <div className="h-24 rounded-lg overflow-hidden mb-2 bg-slate-950">
                    <img
                      src={recent.images[0]}
                      alt={recent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-1 space-y-1">
                    <span className="text-[10px] text-gold-500 font-bold uppercase tracking-wider block">
                      {formatPrice(recent.price)}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {recent.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                      {recent.location.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
