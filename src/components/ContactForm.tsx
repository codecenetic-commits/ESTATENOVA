'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Villa');
  const [budget, setBudget] = useState('$5M - $10M');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0B1120', '#FFFFFF'],
    });

    setSubmitted(true);
  };

  const budgetOptions = [
    'Under $5M',
    '$5M - $10M',
    '$10M - $20M',
    '$20M - $30M',
    '$30M+',
  ];

  const interestOptions = [
    'Villa',
    'Apartment',
    'Penthouse',
    'Mansion',
    'Beachfront Property',
    'Smart Home',
    'Commercial Investment',
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors border-t border-slate-200 dark:border-slate-850/60">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-500">Concierge Services</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif text-slate-900 dark:text-white">
                Initiate Your Acquisition
              </h2>
              <p className="text-slate-550 dark:text-slate-400 text-sm leading-relaxed font-light">
                Secure your private consultation with our investment advisory panel. Reach out to schedule a viewing or request a secure valuation.
              </p>
            </div>

            {/* HQ details block */}
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <span className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-gold-500 shadow-sm">
                  <MapPin size={18} />
                </span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-405 dark:text-slate-500 uppercase tracking-wider">Global Headquarters</h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    455 Ocean Drive, South of Fifth
                  </p>
                  <p className="text-xs text-slate-500">Miami Beach, FL 33139</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-gold-500 shadow-sm">
                  <Phone size={18} />
                </span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-405 dark:text-slate-500 uppercase tracking-wider">Direct Advisory Link</h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    +1 (305) 555-0190
                  </p>
                  <p className="text-xs text-slate-500">Secured switchboard</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-gold-500 shadow-sm">
                  <Mail size={18} />
                </span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-405 dark:text-slate-500 uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    inquire@estatenova.com
                  </p>
                  <p className="text-xs text-slate-500">Encrypted transmission</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-gold-500 shadow-sm">
                  <Clock size={18} />
                </span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-405 dark:text-slate-500 uppercase tracking-wider">Office Hours</h4>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Monday – Saturday
                  </p>
                  <p className="text-xs text-slate-500">09:00 AM – 06:00 PM EST</p>
                </div>
              </div>
            </div>

            {/* Verification badge */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-semibold border-t border-slate-200 dark:border-slate-850 pt-6">
              <Shield size={14} className="text-emerald-500" />
              <span>Complies with standard luxury privacy acts. NDA available on request.</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 sm:p-10 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl text-left relative overflow-hidden"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="p-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full animate-bounce">
                    <Check size={36} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Inquiry Lodged Successfully</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2 font-light">
                      Thank you. A senior luxury advisor from the EstateNova desk has received your request and will contact you directly within 2 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Marcus Thorne"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (305) 555-0100"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Preferred Visit Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Interest */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Property Interest</label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                      >
                        {interestOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-50 dark:bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Planned Budget Range</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                      >
                        {budgetOptions.map((opt, i) => (
                          <option key={i} value={opt} className="bg-slate-50 dark:bg-slate-900">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Custom Inquiry Details</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe any specific requirements, views, zoning, or timeline details..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-gold-500/10 transition-all flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <Send size={13} />
                    <span>Secure Booking Consultation</span>
                  </button>
                </form>
              )}

              {/* Glowing decorative border */}
              <div className="absolute inset-0 rounded-3xl border border-gold-500/0 hover:border-gold-500/10 pointer-events-none transition-all duration-500" />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
