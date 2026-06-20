'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { faqs } from '@/data/faqs';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors border-t border-slate-200 dark:border-slate-850/60">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">Concierge Desk</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-serif text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mt-2 font-light">
            Find immediate answers regarding private transactions, acquisitions, scheduling, and investments.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle size={18} className="text-gold-500 flex-shrink-0" />
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white font-serif">
                      {faq.question}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-400 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-full"
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-550 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-light border-t border-slate-100 dark:border-slate-850/40 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
