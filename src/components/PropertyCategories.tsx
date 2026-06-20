'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  filterType: string;
}

const categories: Category[] = [
  {
    id: 'villas',
    name: 'Luxury Villas',
    count: 14,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    filterType: 'Villa',
  },
  {
    id: 'apartments',
    name: 'Elegant Apartments',
    count: 22,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    filterType: 'Apartment',
  },
  {
    id: 'penthouses',
    name: 'Sky Penthouses',
    count: 8,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    filterType: 'Penthouse',
  },
  {
    id: 'mansions',
    name: 'Grand Mansions',
    count: 6,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    filterType: 'Mansion',
  },
  {
    id: 'beachfront',
    name: 'Beachfront Estates',
    count: 11,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    filterType: 'Beachfront',
  },
  {
    id: 'smart-homes',
    name: 'Smart Homes',
    count: 15,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    filterType: 'Smart Home',
  },
];

interface PropertyCategoriesProps {
  onSelectCategory: (type: string) => void;
}

export default function PropertyCategories({ onSelectCategory }: PropertyCategoriesProps) {
  const handleCategoryClick = (filterType: string) => {
    onSelectCategory(filterType);
    const gridElement = document.getElementById('properties');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold mb-3 block"
          >
            Curated Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif"
          >
            Explore Luxury Niches
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-450 text-lg leading-relaxed font-sans"
          >
            From high-altitude penthouses to waterfront retreats, find your dream architecture in our categorized collection.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => handleCategoryClick(cat.filterType)}
              className="relative h-96 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Parallax image overlay */}
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 z-10 transition-colors duration-500" />
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gold gradient glow cover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-15 opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-end text-left">
                <span className="text-xs text-gold-500 font-bold uppercase tracking-widest mb-2 block">
                  {cat.count} Exclusive Listings
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mb-2 group-hover:text-gold-100 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-slate-350 flex items-center gap-1 group-hover:text-white transition-colors duration-300 font-semibold uppercase tracking-wider">
                  View Collection
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-gold-500/30 transition-colors duration-500 pointer-events-none z-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
