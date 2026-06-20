'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Scale, Globe2 } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Exclusive Off-Market Portfolio',
    description: 'We offer our clients private access to rare estates, penthouses, and islands that are never published on the public market.',
  },
  {
    icon: EyeOff,
    title: 'Sovereign Discretion & Security',
    description: 'Trust is our primary asset. We preserve absolute privacy and identity protection across all luxury asset acquisitions.',
  },
  {
    icon: Scale,
    title: 'Institutional Legal Safeguards',
    description: 'Every transaction is vetted by senior real estate attorneys to ensure compliance, escrow safety, and seamless closing.',
  },
  {
    icon: Globe2,
    title: 'Cross-Border Wealth Advisory',
    description: 'Our advisors specialize in tax-efficient investment structures and cross-border currency liquidation protocols.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-slate-900 text-white relative overflow-hidden dark:bg-black">
      {/* Decorative Blur glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Split grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left descriptive text */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
              Why EstateNova
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif">
              Unrivaled Standards, <br />
              <span className="text-gold-gradient">Uncompromised Trust</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-md font-sans">
              For over a decade, EstateNova has catered to high-net-worth buyers, diplomats, and international investors who require professional excellence, technical safety, and artistic curation.
            </p>
            
            {/* Elegant luxury quote */}
            <div className="border-l-2 border-gold-500 pl-4 py-1 mt-6">
              <p className="text-sm font-serif italic text-slate-300">
                “Luxury is not about price; it is about environment, architectural truth, and a seamless transactional journey.”
              </p>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-2 block">
                — Harrison Vance, Managing Director
              </span>
            </div>
          </div>

          {/* Right Cards list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                  className="bg-slate-950/80 border border-slate-800/80 p-8 rounded-2xl text-left flex flex-col justify-between h-64 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 pointer-events-none transition-all duration-300" />
                  
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
