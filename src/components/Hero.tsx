'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Calendar, ArrowDown, ShieldCheck, Award, Star } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80'
];

interface HeroProps {
  onExploreClick: () => void;
  onScheduleClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onScheduleClick }) => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentBg]})` }}
          />
        </AnimatePresence>
        {/* Dark Overlays & Ambient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-1" />
        
        {/* Floating Ambient Glows */}
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-gold-500/10 rounded-full blur-[100px] z-1 animate-pulse" />
        <div className="absolute bottom-[10%] left-[20%] w-[250px] h-[250px] bg-slate-500/15 rounded-full blur-[80px] z-1" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        {/* Left: Text Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-500 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Star size={11} className="fill-gold-500 text-gold-500" />
            <span>Premium Real Estate Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Discover Extraordinary <br />
            <span className="text-gold-gradient bg-clip-text font-serif italic font-normal">
              Luxury Living
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-350 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light"
          >
            Explore world-class villas, penthouses, apartments, and commercial properties in prime locations. Formulated for the most discerning investors.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-gold-gradient text-slate-950 font-bold text-sm uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 active:scale-95 transition-all group"
            >
              <Compass size={16} className="group-hover:rotate-45 transition-transform" />
              <span>Explore Properties</span>
            </button>
            <button
              onClick={onScheduleClick}
              className="px-8 py-4 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider flex items-center space-x-2 hover:border-gold-500/50 transition-all active:scale-95"
            >
              <Calendar size={16} />
              <span>Schedule a Visit</span>
            </button>
          </motion.div>

          {/* Counter Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-slate-800/80 pt-8 w-full max-w-lg">
            {[
              { num: '15K+', label: 'Premium Listings', delay: 0.4 },
              { num: '8K+', label: 'Happy Clients', delay: 0.5 },
              { num: '250+', label: 'Luxury Agents', delay: 0.6 },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                className="flex flex-col"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-gold-500 font-serif">
                  {stat.num}
                </span>
                <span className="text-slate-400 text-xs mt-1 font-medium tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Floating Luxury Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-[380px] glass-premium rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative p-5 group"
          >
            {/* Asset showcase image */}
            <div className="relative h-[280px] rounded-xl overflow-hidden mb-4">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80')` }}
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-gold-500 text-slate-950 text-[10px] uppercase font-black rounded tracking-widest shadow-md">
                Featured Asset
              </div>
            </div>

            {/* Showcase Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gold-500 font-semibold uppercase tracking-wider">Miami Beach</span>
                <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  <span>Verified Estate</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white font-serif tracking-wide">The Marquesa Estate</h3>
              <div className="flex justify-between items-center text-slate-400 text-xs border-t border-slate-800/80 pt-3 mt-1">
                <span>8 Beds</span>
                <span>•</span>
                <span>11 Baths</span>
                <span>•</span>
                <span>18,200 Sqft</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-white font-serif">$32,500,000</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest border border-slate-700 px-2 py-1 rounded">Buy</span>
              </div>
            </div>

            {/* Glowing borders hover effect */}
            <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/20 pointer-events-none transition-all duration-500" />
          </motion.div>

          {/* Back glows/shapes */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/5 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
        onClick={onExploreClick}
      >
        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400 mb-2">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="p-1 rounded-full border border-slate-800 bg-slate-900/50 hover:border-gold-500/50 transition-colors"
        >
          <ArrowDown size={14} className="text-gold-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
