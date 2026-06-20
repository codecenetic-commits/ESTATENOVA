'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-slate-800/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">Brokerage Verification</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-serif text-white">
            Client Testimonials
          </h2>
        </div>

        {/* Carousel slide container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="glass-premium rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative text-left space-y-6 max-w-2xl w-full"
            >
              {/* Quote Mark */}
              <span className="absolute top-6 right-8 text-gold-500/15 pointer-events-none">
                <Quote size={56} className="fill-current" />
              </span>

              {/* Stars rating */}
              <div className="flex space-x-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={15} className="text-gold-500 fill-gold-500" />
                ))}
              </div>

              {/* Review Statement */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light italic font-serif">
                "{current.review}"
              </p>

              {/* User Bio */}
              <div className="flex items-center space-x-4 border-t border-slate-800 pt-6">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border border-gold-500/20"
                />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white font-serif">{current.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                    {current.role}, <span className="text-gold-500">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Arrow Buttons */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-slate-800 bg-slate-950 hover:bg-slate-850 hover:text-gold-500 transition-colors text-slate-400"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex space-x-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'bg-gold-500 w-4' : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-slate-800 bg-slate-950 hover:bg-slate-850 hover:text-gold-500 transition-colors text-slate-400"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
