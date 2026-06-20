'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, X, Trash2, Check, Star, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Property } from '@/data/properties';

interface ComparisonBarProps {
  onViewDetails: (property: Property) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
  onViewDetails,
  isOpen,
  onClose,
}) => {
  const { compareList, removeFromCompare, clearCompare, formatPrice } = useApp();
  const [isFullscreenCompareOpenInternal, setIsFullscreenCompareOpenInternal] = useState(false);

  const isFullscreenCompareOpen = isOpen !== undefined ? isOpen : isFullscreenCompareOpenInternal;

  const setIsFullscreenCompareOpen = (value: boolean) => {
    if (onClose && !value) {
      onClose();
    }
    setIsFullscreenCompareOpenInternal(value);
  };

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Bottom Floating Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="glass-premium rounded-2xl border border-gold-500/20 p-4 flex items-center justify-between shadow-2xl"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="p-2 rounded-lg bg-gold-500/10 text-gold-500 border border-gold-500/20">
              <GitCompare size={18} />
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white font-serif">Compare Estates</h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                {compareList.length} of 3 assets selected
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Asset avatars */}
            <div className="hidden sm:flex space-x-1.5 items-center">
              {compareList.map((prop) => (
                <div key={prop.id} className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-700/50 group">
                  <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeFromCompare(prop.id)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-350"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {compareList.length < 3 && (
                <div className="w-9 h-9 rounded-lg border border-dashed border-slate-400 dark:border-slate-800 flex items-center justify-center text-slate-500 text-[10px]" title="Add more properties">
                  +
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <button
              onClick={() => setIsFullscreenCompareOpen(true)}
              className="px-4 py-2 bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg hover:shadow-gold-500/10 transition-all"
            >
              Compare
            </button>
            <button
              onClick={clearCompare}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
              title="Clear list"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Overlay Comparison Table */}
      <AnimatePresence>
        {isFullscreenCompareOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreenCompareOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80 flex justify-between items-center bg-slate-50 dark:bg-slate-900/60">
                <div className="flex items-center space-x-2">
                  <GitCompare size={20} className="text-gold-500" />
                  <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                    Estate Comparison Matrix
                  </h3>
                </div>
                <button
                  onClick={() => setIsFullscreenCompareOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Table Body Content (Scrollable) */}
              <div className="flex-1 overflow-x-auto overflow-y-auto p-6 custom-scrollbar">
                <table className="w-full border-collapse border-slate-200 dark:border-slate-800 text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="py-4 pr-4 w-1/4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Specifications
                      </th>
                      {compareList.map((prop) => (
                        <th key={prop.id} className="py-4 px-4 w-1/4">
                          <div className="space-y-3">
                            <div className="h-28 rounded-xl overflow-hidden bg-slate-950">
                              <img src={prop.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-gold-500 font-serif">
                                {prop.type}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate font-serif mt-0.5">
                                {prop.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                {prop.location.neighborhood}, {prop.location.city}
                              </p>
                            </div>
                          </div>
                        </th>
                      ))}
                      {/* Empty columns if comparison list is less than 3 */}
                      {compareList.length < 3 &&
                        Array.from({ length: 3 - compareList.length }).map((_, i) => (
                          <th key={i} className="py-4 px-4 w-1/4 text-center">
                            <div className="h-28 rounded-xl border border-dashed border-slate-350 dark:border-slate-850 flex items-center justify-center text-slate-500 text-xs">
                              Empty Spot
                            </div>
                            <span className="text-xs text-slate-400 block mt-3">Add another asset to compare</span>
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 text-xs font-semibold text-slate-750 dark:text-slate-200">
                    {/* Price */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Acquisition Value</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 text-sm font-bold text-gold-500 font-serif">
                          {formatPrice(p.price)}
                          {p.status === 'Rent' && <span className="text-[10px] font-sans font-medium text-slate-500">/mo</span>}
                        </td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Status */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Transaction Mode</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4">
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {p.status === 'Buy' ? 'For Sale' : 'For Rent'}
                          </span>
                        </td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Bedrooms */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Bedrooms</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 font-serif text-sm font-bold text-slate-900 dark:text-white">{p.beds} Rooms</td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Bathrooms */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Bathrooms</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 font-serif text-sm font-bold text-slate-900 dark:text-white">{p.baths} Baths</td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Garage */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Garage Space</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 font-serif text-sm font-bold text-slate-900 dark:text-white">{p.garage} Vehicles</td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Sqft */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Square Footage</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 font-serif text-sm font-bold text-slate-900 dark:text-white">{p.sqft.toLocaleString()} Sqft</td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Build Year */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Year Built</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 font-serif text-sm font-bold text-slate-900 dark:text-white">{p.yearBuilt}</td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Rating */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Client Rating</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4">
                          <div className="flex items-center space-x-1 font-serif text-slate-900 dark:text-white font-bold text-sm">
                            <Star size={13} className="text-gold-500 fill-gold-500" />
                            <span>{p.rating.toFixed(1)}</span>
                          </div>
                        </td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Smart Home */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider">Smart Automation</td>
                      {compareList.map((p) => {
                        const hasSmart = p.amenities.some((a) => a.toLowerCase().includes('smart'));
                        return (
                          <td key={p.id} className="py-4 px-4">
                            {hasSmart ? (
                              <span className="p-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 inline-flex">
                                <Check size={12} />
                              </span>
                            ) : (
                              <span className="p-1 rounded bg-slate-200 dark:bg-slate-900 text-slate-500 border border-slate-350 dark:border-slate-800 inline-flex">
                                <X size={12} />
                              </span>
                            )}
                          </td>
                        );
                      })}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Highlights Summary */}
                    <tr>
                      <td className="py-4 pr-4 font-bold text-slate-400 uppercase tracking-wider align-top">Highlights</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 align-top">
                          <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                            {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        </td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>

                    {/* Details Trigger */}
                    <tr>
                      <td className="py-4 pr-4 border-b border-transparent" />
                      {compareList.map((p) => (
                        <td key={p.id} className="py-4 px-4 border-b border-transparent">
                          <button
                            onClick={() => {
                              setIsFullscreenCompareOpen(false);
                              onViewDetails(p);
                            }}
                            className="w-full py-2 bg-slate-900 hover:bg-gold-500 hover:text-slate-950 border border-slate-800 hover:border-gold-500 text-slate-200 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
                          >
                            Explore Asset
                          </button>
                        </td>
                      ))}
                      {compareList.length < 3 && Array.from({ length: 3 - compareList.length }).map((_, i) => <td key={i} />)}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center space-x-2 text-slate-400 text-xs font-semibold justify-center">
                <AlertCircle size={14} className="text-gold-500" />
                <span>Scroll horizontally or vertically to compare all metrics. Close matrix to return.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
