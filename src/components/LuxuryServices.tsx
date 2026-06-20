'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Search, 
  TrendingUp, 
  Scale, 
  Palette, 
  Handshake 
} from 'lucide-react';

interface Service {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Search,
    title: 'Property Procurement',
    description: 'Bespoke acquisition services for ultra-high-net-worth individuals seeking exceptional estates, penthouses, and private islands.',
    features: ['Off-market access', 'Private showings', 'Portfolio management'],
  },
  {
    icon: Handshake,
    title: 'Strategic Sales & Marketing',
    description: 'World-class marketing campaigns utilizing cinematic video, virtual 3D tours, and elite global networks to sell your luxury assets.',
    features: ['Cinematic production', 'Global outreach', 'Targeted marketing'],
  },
  {
    icon: Key,
    title: 'Premium Leasing Concierge',
    description: 'Short-term and long-term rental management for prestigious properties, catering to corporate executives, diplomats, and VIPs.',
    features: ['Tenant vetting', 'White-glove management', '24/7 guest relations'],
  },
  {
    icon: TrendingUp,
    title: 'Wealth & Investment Advisory',
    description: 'Data-driven analysis and advisory on real estate portfolios, capital growth opportunities, and tax-efficient investments.',
    features: ['ROI optimization', 'Market forecasting', 'Portfolio diversification'],
  },
  {
    icon: Scale,
    title: 'Legal & Transaction Advisory',
    description: 'End-to-end legal support, escrow coordination, and cross-border transaction structuring to guarantee security and peace of mind.',
    features: ['Due diligence', 'Cross-border expertise', 'Escrow coordination'],
  },
  {
    icon: Palette,
    title: 'Architectural & Interior Curation',
    description: 'Partnership with award-winning architects and interior designers to elevate properties to the highest standards of luxury living.',
    features: ['Space optimization', 'Premium staging', 'Custom remodeling'],
  },
];

export default function LuxuryServices() {
  return (
    <section id="services" className="py-24 bg-slate-900 text-white relative overflow-hidden dark:bg-black">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold mb-3 block"
          >
            Exquisite Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif"
          >
            Our Elite Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed font-sans"
          >
            At EstateNova, we redefine premium real estate services by providing a comprehensive, white-glove experience tailored to your exact specifications.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-gold-500/30 transition-all duration-300 group flex flex-col justify-between shadow-2xl relative overflow-hidden"
              >
                {/* Micro hover glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500 pointer-events-none" />

                <div>
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:border-gold-500/50 group-hover:bg-gold-500/10 transition-colors duration-300 text-gold-500">
                    <IconComponent className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif mb-3 group-hover:text-gold-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>

                <ul className="border-t border-slate-900 pt-5 space-y-2 mt-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
