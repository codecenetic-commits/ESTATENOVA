'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden dark:bg-black border-t border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
        <div className="inline-flex p-3 rounded-full bg-gold-500/5 border border-gold-500/15 text-gold-500 mb-2">
          <Sparkles className="w-6 h-6 stroke-[1.5]" />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight">
            Get Exclusive Luxury <br />
            <span className="text-gold-gradient">Property Updates</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-sans">
            Be the first to know about off-market mansions, private viewings, international real estate portfolios, and exclusive market forecasts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your premium email address"
            className="flex-1 px-5 py-3.5 bg-slate-950/80 border border-slate-850 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            {submitted ? 'Subscribed' : 'Subscribe Now'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gold-500 font-bold tracking-wide animate-pulse"
          >
            Welcome to the Registry. Check your inbox for exclusive updates.
          </motion.p>
        )}
      </div>
    </section>
  );
}
