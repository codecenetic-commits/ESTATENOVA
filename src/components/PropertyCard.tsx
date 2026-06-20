'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, GitCompare, BedDouble, Bath, Square, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Property } from '@/data/properties';
import { agents } from '@/data/agents';
import { useApp } from '@/context/AppContext';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const { wishlist, toggleWishlist, compareList, addToCompare, removeFromCompare, formatPrice } = useApp();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const isLiked = wishlist.includes(property.id);
  const isCompared = compareList.some((p) => p.id === property.id);

  // Find agent
  const agent = agents.find((a) => a.id === property.agentId);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(property.id);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative flex flex-col h-full group"
    >
      {/* Property Image & Slider */}
      <div className="relative h-[240px] overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${property.images[currentImgIndex]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

        {/* Ribbon Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
          <span className="px-3 py-1 bg-slate-950/80 text-white text-[10px] uppercase font-bold tracking-widest rounded backdrop-blur-sm border border-white/10">
            {property.type}
          </span>
          {property.price > 10000000 && (
            <span className="px-3 py-1 bg-gold-500 text-slate-950 text-[10px] uppercase font-black tracking-widest rounded shadow-md">
              Elite Tier
            </span>
          )}
        </div>

        {/* Favorite & Compare Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-colors ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-slate-950/50 hover:bg-slate-950 text-white border border-white/10'
            }`}
            title={isLiked ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart size={15} className={isLiked ? 'fill-current' : ''} />
          </button>

          {/* Compare Button */}
          <button
            onClick={handleCompareToggle}
            className={`p-2.5 rounded-full backdrop-blur-sm transition-colors ${
              isCompared
                ? 'bg-gold-500 text-slate-950'
                : 'bg-slate-950/50 hover:bg-slate-950 text-white border border-white/10'
            }`}
            title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
          >
            <GitCompare size={15} />
          </button>
        </div>

        {/* Left/Right Slider Arrows */}
        {property.images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 hover:text-gold-500 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 hover:text-gold-500 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Bullet Indicator */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
            {property.images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentImgIndex === i ? 'bg-gold-500 w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left">
        <div className="space-y-2">
          {/* Price & Rent/Buy */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              {formatPrice(property.price)}
              {property.status === 'Rent' && (
                <span className="text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">/mo</span>
              )}
            </span>
            <span className="text-[10px] px-2 py-0.5 border border-slate-200 dark:border-slate-800 rounded font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              For {property.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white group-hover:text-gold-500 dark:group-hover:text-gold-450 transition-colors tracking-wide leading-tight line-clamp-1">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-xs">
            <MapPin size={12} className="text-gold-500 flex-shrink-0" />
            <span className="truncate">{property.location.address}, {property.location.city}</span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="flex justify-between items-center py-4 border-y border-slate-100 dark:border-slate-800/80 my-4 text-slate-650 dark:text-slate-350 text-xs font-semibold">
          <div className="flex items-center space-x-1">
            <BedDouble size={14} className="text-gold-500" />
            <span>{property.beds} Bed{property.beds > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath size={14} className="text-gold-500" />
            <span>{property.baths} Bath{property.baths > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square size={12} className="text-gold-500" />
            <span>{property.sqft.toLocaleString()} Sqft</span>
          </div>
        </div>

        {/* Footer info: Agent Mini-Profile & CTA */}
        <div className="flex items-center justify-between mt-auto">
          {agent && (
            <div className="flex items-center space-x-2">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-8 h-8 rounded-full object-cover border border-gold-500/20"
              />
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Advisor</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">
                  {agent.name.split(' ')[0]}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => onViewDetails(property)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold-500 hover:text-slate-950 border border-gold-500/30 hover:bg-gold-500 rounded-lg transition-all"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};
