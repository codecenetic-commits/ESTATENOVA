'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Instagram, Linkedin, Facebook, Youtube } from './SocialIcons';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { formatPrice } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-20 pb-10 relative overflow-hidden font-sans">
      {/* Visual Accent: Gold Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Logo & Description */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center space-x-2 text-white">
              <span className="text-xl font-black font-serif tracking-widest text-gold-gradient">
                ESTATENOVA
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-455 max-w-sm">
              Curating architectural masterpieces and ultra-high-end residences in premium global locations. Redefining property acquisition through design expertise and financial integrity.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Facebook, href: 'https://facebook.com' },
                { icon: Youtube, href: 'https://youtube.com' }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:border-gold-500 hover:text-gold-500 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h4 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              Subscribe to Private Briefings
            </h4>
            <p className="text-sm text-slate-400 max-w-lg">
              Receive updates on off-market listings, architectural design trends, and premium portfolio insights directly from our concierge team.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your premium email address"
                className="flex-1 px-5 py-3.5 bg-slate-900/50 border border-slate-850 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-gold-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
              >
                {submitted ? 'Subscribed' : 'Subscribe'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {submitted && (
              <p className="text-xs text-gold-500 font-semibold animate-pulse">
                Welcome to EstateNova. You have been added to our private registry.
              </p>
            )}
          </div>
        </div>

        {/* Middle Section: Quick Links & Contacts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-left">
          
          {/* Properties Column */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold font-serif uppercase tracking-widest text-white">Properties</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Villas & Mansions</a></li>
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Sky Penthouses</a></li>
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Coastal Estates</a></li>
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Eco Smart Homes</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold font-serif uppercase tracking-widest text-white">Company</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-gold-500 transition-colors">Our Legacy</a></li>
              <li><a href="#agents" className="hover:text-gold-500 transition-colors">Private Brokers</a></li>
              <li><a href="#testimonials" className="hover:text-gold-500 transition-colors">Client Reviews</a></li>
              <li><a href="#faqs" className="hover:text-gold-500 transition-colors">FAQ Registry</a></li>
            </ul>
          </div>

          {/* Quick Search Locations */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold font-serif uppercase tracking-widest text-white">Locations</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Miami Beach, FL</a></li>
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Golden Beach, FL</a></li>
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Coral Gables, FL</a></li>
              <li><a href="#properties" className="hover:text-gold-500 transition-colors">Key Biscayne, FL</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h5 className="text-sm font-bold font-serif uppercase tracking-widest text-white">Concierge</h5>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>1000 Ocean Drive, Suite 500, Miami Beach, FL 33139</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="tel:+13055550190" className="hover:text-gold-500 transition-colors">+1 (305) 555-0190</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href="mailto:concierge@estatenova.com" className="hover:text-gold-500 transition-colors">concierge@estatenova.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-655 font-semibold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} EstateNova. Luxury Living Starts Here.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Accessibility Standards</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
