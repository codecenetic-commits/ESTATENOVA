'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { properties, Property } from '@/data/properties';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDetails: (property: Property) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onViewDetails,
}) => {
  const { wishlist, toggleWishlist, formatPrice } = useApp();

  // Filter properties in wishlist
  const likedProperties = properties.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Slider Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80 flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center space-x-2">
                <Heart size={18} className="text-red-500 fill-current" />
                <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                  Saved Properties
                </h3>
                <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded-full font-bold">
                  {likedProperties.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar text-left">
              {likedProperties.length > 0 ? (
                likedProperties.map((prop) => (
                  <motion.div
                    key={prop.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex space-x-3.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30 hover:border-gold-500 transition-colors relative group"
                  >
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-18 h-18 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-bold text-gold-500 font-serif">
                            {formatPrice(prop.price)}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500">
                            {prop.type}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate font-serif mt-0.5">
                          {prop.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {prop.location.neighborhood}, {prop.location.city}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => {
                            onClose();
                            onViewDetails(prop);
                          }}
                          className="text-[10px] uppercase font-bold text-gold-500 flex items-center space-x-0.5 hover:translate-x-1 transition-transform"
                        >
                          <span>Explore Details</span>
                          <ArrowRight size={10} />
                        </button>

                        <button
                          onClick={() => toggleWishlist(prop.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3 py-20">
                  <div className="p-4 rounded-full border border-dashed border-slate-350 dark:border-slate-850 text-slate-350 dark:text-slate-700">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Your Wishlist is Empty</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto font-light">
                      Click the heart icon on properties to save them for later review.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {likedProperties.length > 0 && (
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-gold-500/10 transition-all text-center"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
