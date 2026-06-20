'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Mail, Phone, Award } from 'lucide-react';
import { Instagram, Linkedin, Twitter } from './SocialIcons';
import { agents } from '@/data/agents';

export const AgentSection: React.FC = () => {
  return (
    <section id="agents" className="py-24 bg-slate-900 border-t border-slate-800 text-slate-100 relative">
      {/* Background Glows */}
      <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-slate-800/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">Elite Brokerage</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-serif text-white">
            Our Luxury Property Advisors
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mt-2 font-light">
            Connect with seasoned experts dedicated to protecting your assets and matching your lifestyle.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, idx) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-slate-950 border border-slate-850/80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-gold-500/30 transition-all duration-300 flex flex-col justify-between text-left group relative"
            >
              {/* Profile Image & Icons Overlay */}
              <div className="relative h-[300px] overflow-hidden bg-slate-900">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded flex items-center space-x-1 text-[10px] font-bold text-white shadow-md">
                  <Star size={11} className="text-gold-500 fill-gold-500" />
                  <span>{agent.rating.toFixed(1)} Rating</span>
                </div>

                {/* Social icons overlay (floats on hover) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 bg-slate-950/90 border border-white/10 p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg">
                  <a
                    href={agent.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-gold-500 hover:scale-110 transition-all"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={agent.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-gold-500 hover:scale-110 transition-all"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a
                    href={agent.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-gold-500 hover:scale-110 transition-all"
                  >
                    <Twitter size={14} />
                  </a>
                </div>
              </div>

              {/* Bio & stats details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-black text-gold-500 flex items-center mb-1">
                    <Award size={10} className="mr-1" />
                    {agent.role.split(' & ')[0]}
                  </span>
                  <h3 className="text-lg font-bold text-white font-serif tracking-wide leading-tight">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{agent.role}</p>

                  <div className="grid grid-cols-2 gap-4 border-y border-slate-900 py-3.5 my-3.5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Experience</span>
                      <span className="text-sm font-bold text-slate-200 font-serif">{agent.experience}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Estates Sold</span>
                      <span className="text-sm font-bold text-slate-200 font-serif">{agent.propertiesSold}+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-[11px] font-semibold text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Phone size={12} className="text-gold-500 flex-shrink-0" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={12} className="text-gold-500 flex-shrink-0" />
                    <span className="truncate">{agent.email}</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full mt-5 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-gold-500 group-hover:text-slate-950 border border-gold-500/20 group-hover:bg-gold-500 rounded-lg transition-all duration-300 block"
                >
                  Contact Advisor
                </a>
              </div>

              {/* Top border gold flash */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gold-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
