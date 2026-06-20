'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix, label, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    const animation = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        if (active) setCount(Math.floor(latest));
      },
    });

    return () => {
      active = false;
      animation.stop();
    };
  }, [value, duration]);

  return (
    <div className="text-center p-6 space-y-2">
      <h3 className="text-5xl md:text-6xl font-extrabold font-serif text-slate-900 dark:text-white flex items-center justify-center">
        <span>{count.toLocaleString()}</span>
        <span className="text-gold-500 font-bold ml-1">{suffix}</span>
      </h3>
      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-950 border-t border-b border-slate-200 dark:border-slate-850 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
          <StatItem value={25} suffix="K+" label="Premium Listings" />
          <StatItem value={15} suffix="K+" label="Happy Clients" />
          <StatItem value={3} suffix="B+" label="Property Volume" />
          <StatItem value={20} suffix="+" label="Global Cities" />
        </div>
      </div>
    </section>
  );
}
