'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Compass, History, Building2, Users2 } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineEvent[] = [
  {
    year: '2012',
    title: 'The Genesis',
    description: 'EstateNova was founded in Miami Beach with a single mission: to bring institutional-grade security and architectural curation to the luxury residential market.',
  },
  {
    year: '2016',
    title: 'Global Expansion',
    description: 'Opened offices in New York and Dubai, connecting high-net-worth buyers with ultra-premium developments across continents.',
  },
  {
    year: '2020',
    title: 'Technological Edge',
    description: 'Pioneered 3D architectural scanning and AI-driven client lifestyle recommendations, elevating the digital home-buying experience.',
  },
  {
    year: '2026',
    title: 'Eco-Luxury Epoch',
    description: 'Committed fully to sustainability, launching our carbon-neutral Smart Mansion Collection to cater to the modern conscious investor.',
  },
];

const awards = [
  { institution: 'International Property Awards', title: 'Best Luxury Brokerage 2024' },
  { institution: 'Architectural Curation Council', title: 'Design Innovation Award 2025' },
  { institution: 'Global Luxury Council', title: 'Brokerage of the Year 2025' },
];

export default function AboutSection() {
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid: Info & Office Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          {/* Left Text */}
          <div className="lg:col-span-6 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500">
              The EstateNova Legacy
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-serif">
              Crafting Legacies, <br />
              <span className="text-gold-gradient">One Estate at a Time</span>
            </h2>
            <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-md font-sans">
              Founded on the pillars of architectural excellence, discretion, and financial foresight, EstateNova is more than a brokerage. We are curators of premium environments, connecting individuals with locations that shape their life stories.
            </p>
            <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-md font-sans">
              Our curated portfolio spans remote beachfront private sanctuaries, high-altitude city penthouses, and automated smart villas built with high-fidelity materials that stand the test of time.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-250 dark:border-slate-850">
              <div className="space-y-1">
                <h4 className="text-4xl font-extrabold font-serif text-slate-950 dark:text-white">$3.2B+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Asset Value Sold</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-4xl font-extrabold font-serif text-slate-950 dark:text-white">99.4%</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Client Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Right Images Layout */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            {/* Background glowing texture */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="col-span-8 rounded-2xl overflow-hidden h-72 shadow-xl hover:shadow-2xl transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="EstateNova Offices"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-72 shadow-xl hover:shadow-2xl transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"
                alt="Architectural Planning"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-4 rounded-2xl overflow-hidden h-60 shadow-xl hover:shadow-2xl transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                alt="Client Consultation"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-8 rounded-2xl overflow-hidden h-60 shadow-xl hover:shadow-2xl transition-all duration-300 bg-slate-900 border border-slate-800 dark:bg-slate-900/50 p-6 flex flex-col justify-center text-left">
              <span className="text-gold-500 mb-3 block">
                <Compass className="w-8 h-8 stroke-[1.5]" />
              </span>
              <h4 className="text-lg font-bold font-serif text-white mb-1">Curation & Integrity</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Every property is vetted by architectural panels and legal advisors to ensure maximum portfolio defense and investment security.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Slider Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16 mb-24">
          <div className="flex items-center space-x-2 text-gold-500 mb-10 justify-center">
            <History className="w-5 h-5" />
            <h3 className="text-lg font-bold font-serif uppercase tracking-widest text-slate-900 dark:text-white">
              The Journey So Far
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
            {/* Timeline Menu Selector */}
            <div className="flex md:flex-col justify-between md:justify-start w-full md:w-44 border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-800 pb-4 md:pb-0 md:pl-4 space-x-4 md:space-x-0 md:space-y-4">
              {timeline.map((event, index) => (
                <button
                  key={event.year}
                  onClick={() => setActiveYearIndex(index)}
                  className={`text-left text-lg md:text-xl font-bold font-serif transition-colors py-1 ${
                    activeYearIndex === index
                      ? 'text-gold-500 md:border-l-2 md:border-gold-500 md:pl-4 -ml-4 md:translate-x-1 duration-300'
                      : 'text-slate-450 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  {event.year}
                </button>
              ))}
            </div>

            {/* Event Display Panel */}
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl min-h-[160px] text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYearIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-3">
                    {timeline[activeYearIndex].title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-sans">
                    {timeline[activeYearIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Awards Badges Section */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 block">
            Recognized Global Standards
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award, idx) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-850 p-6 rounded-2xl flex items-center space-x-4 hover:border-gold-500/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 bg-gold-500/5 border border-gold-500/10 text-gold-500 rounded-xl">
                  <Award className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="text-left space-y-1">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {award.institution}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                    {award.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
