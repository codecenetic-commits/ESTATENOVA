'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, Download, Calculator, Calendar, Play, Eye, ShieldCheck, Check, Info, Award } from 'lucide-react';
import { Property } from '@/data/properties';
import { agents } from '@/data/agents';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const { wishlist, toggleWishlist, formatPrice, addRecentView } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mortgage Calculator State
  const [downPaymentPct, setDownPaymentPct] = useState(20); // 20% default
  const [interestRate, setInterestRate] = useState(5.5); // 5.5% default
  const [loanTerm, setLoanTerm] = useState(30); // 30 years default

  // Booking Form State
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('10:00 AM');
  const [bookSuccess, setBookSuccess] = useState(false);

  // Reset indices and views when property changes
  useEffect(() => {
    if (property) {
      setActiveImageIndex(0);
      setShowVideo(false);
      setBookSuccess(false);
      addRecentView(property.id); // Register recently viewed
    }
  }, [property]);

  const isLiked = property ? wishlist.includes(property.id) : false;
  const agent = property ? agents.find((a) => a.id === property.agentId) : null;

  // Calculate mortgage
  const mortgagePayment = useMemo(() => {
    if (!property) return 0;
    const principal = property.price * (1 - downPaymentPct / 100);
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    if (monthlyRate === 0) return principal / totalPayments;

    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return isNaN(payment) ? 0 : payment;
  }, [property, downPaymentPct, interestRate, loanTerm]);

  if (!property) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/property/${property.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadBrochure = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#0B1120', '#FFFFFF'],
    });
    alert(`Brochure for "${property.title}" has been prepared and downloaded! (Mock Demo)`);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail || !bookPhone || !bookDate) {
      alert('Please fill out all fields to book a visit.');
      return;
    }
    setBookSuccess(true);
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#D4AF37', '#0B1120'],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#D4AF37', '#0B1120'],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Drawer Sheet panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-4xl h-full bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col z-10"
          >
            {/* Header control bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 sticky top-0 z-20">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest bg-gold-500 text-slate-950 px-2 py-0.5 rounded">
                  {property.type}
                </span>
                <span className="text-xs text-slate-450 dark:text-slate-400 font-semibold truncate max-w-[200px] md:max-w-xs">
                  {property.title}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {/* Like */}
                <button
                  onClick={() => toggleWishlist(property.id)}
                  className={`p-2 rounded-full border transition-colors ${
                    isLiked
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-slate-300 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:text-red-500'
                  }`}
                  title="Favorite"
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:text-gold-500 hover:border-gold-500 transition-colors relative"
                  title="Share"
                >
                  {copiedLink ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
                  {copiedLink && (
                    <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable details content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              
              {/* Top Section: Hero Image Showcase & Slider */}
              <div className="space-y-4">
                <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-950 shadow-lg">
                  {showVideo ? (
                    <video
                      src={property.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={property.images[activeImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Video/Image Toggle buttons on hover */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={() => setShowVideo(false)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 backdrop-blur-md transition-all ${
                        !showVideo
                          ? 'bg-gold-500 text-slate-950'
                          : 'bg-slate-950/60 text-white hover:bg-slate-950 border border-white/10'
                      }`}
                    >
                      <Eye size={12} />
                      <span>Photos</span>
                    </button>
                    <button
                      onClick={() => setShowVideo(true)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 backdrop-blur-md transition-all ${
                        showVideo
                          ? 'bg-gold-500 text-slate-950'
                          : 'bg-slate-950/60 text-white hover:bg-slate-950 border border-white/10'
                      }`}
                    >
                      <Play size={12} />
                      <span>Video Tour</span>
                    </button>
                  </div>
                </div>

                {/* Thumbnail list */}
                {!showVideo && property.images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto py-1">
                    {property.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeImageIndex === i ? 'border-gold-500 scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid: Title Info, Price, Stats */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-4 text-left">
                  <span className="text-xs font-bold text-gold-500 uppercase tracking-widest font-serif">{property.tagline}</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
                    {property.title}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                    {property.description}
                  </p>
                </div>

                {/* Price Display card */}
                <div className="md:col-span-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-4 shadow-sm">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Acquisition Value</span>
                    <h2 className="text-3xl font-black font-serif text-slate-900 dark:text-white">
                      {formatPrice(property.price)}
                      {property.status === 'Rent' && <span className="text-sm font-sans font-medium text-slate-500">/mo</span>}
                    </h2>
                    <span className="inline-block text-[10px] px-2 py-0.5 bg-gold-500/10 text-gold-500 border border-gold-500/20 font-bold rounded">
                      Available for {property.status}
                    </span>
                  </div>

                  <button
                    onClick={handleDownloadBrochure}
                    className="w-full py-3 border border-slate-350 dark:border-slate-800 hover:border-gold-500 text-slate-800 dark:text-slate-300 hover:text-gold-500 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 bg-white dark:bg-slate-950"
                  >
                    <Download size={14} />
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>

              {/* Spec Counts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-200 dark:border-slate-800/80 text-left">
                {[
                  { label: 'Bedrooms', val: `${property.beds} Rooms` },
                  { label: 'Bathrooms', val: `${property.baths} Baths` },
                  { label: 'Garage Spacings', val: `${property.garage} Vehicles` },
                  { label: 'Square Footage', val: `${property.sqft.toLocaleString()} Sqft` },
                ].map((spec, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{spec.label}</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white font-serif">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Features & Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* Highlights features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center space-x-2">
                    <Award size={18} className="text-gold-500" />
                    <span>Architectural Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-slate-650 dark:text-slate-350 font-medium">
                        <Check size={14} className="text-gold-500" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amen, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60 text-xs font-semibold text-slate-750 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        <span>{amen}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl text-left space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white flex items-center space-x-2">
                    <Calculator size={18} className="text-gold-500" />
                    <span>Mortgage Estimator</span>
                  </h3>
                  <span className="text-[10px] text-slate-450 uppercase font-bold tracking-widest flex items-center">
                    <Info size={11} className="mr-1" /> Estimated Principal & Interest
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-5">
                    {/* Down Payment slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Down Payment ({downPaymentPct}%)</span>
                        <span className="text-gold-500">{formatPrice(property.price * (downPaymentPct / 100))}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        className="w-full accent-gold-500 h-1 bg-slate-200 dark:bg-slate-850 rounded"
                      />
                    </div>

                    {/* Interest Rate slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Interest Rate</span>
                        <span className="text-gold-500">{interestRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-gold-500 h-1 bg-slate-200 dark:bg-slate-850 rounded"
                      />
                    </div>

                    {/* Loan Term slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Loan Term</span>
                        <span className="text-gold-500">{loanTerm} Years</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="30"
                        step="5"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full accent-gold-500 h-1 bg-slate-200 dark:bg-slate-850 rounded"
                      />
                    </div>
                  </div>

                  {/* Calculated Output Display */}
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-inner">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Monthly Payment</span>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
                      {formatPrice(mortgagePayment)}
                    </h2>
                    <span className="text-[10px] text-slate-500 block leading-tight font-medium">
                      Calculated on loan principal of {formatPrice(property.price * (1 - downPaymentPct / 100))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Private Viewing Scheduler Form */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
                {/* Advisor Assignment */}
                <div className="md:col-span-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left flex flex-col justify-between">
                  {agent ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3.5">
                          <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/20"
                          />
                          <div className="text-left">
                            <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest block">Assigned Broker</span>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">{agent.name}</h4>
                            <p className="text-[10px] text-slate-450 mt-0.5">{agent.role}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">
                          Broker experience: {agent.experience}. Highly specialized in local zoning, tax strategies, and private sales.
                        </p>
                      </div>

                      <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4 space-y-2 text-xs font-semibold">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Direct phone</span>
                          <span className="text-slate-800 dark:text-slate-200">{agent.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Secure email</span>
                          <span className="text-slate-800 dark:text-slate-200">{agent.email}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-400">No Broker Assigned.</div>
                  )}
                </div>

                {/* View Schedule Form */}
                <div className="md:col-span-8 glass-premium p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 text-left relative flex flex-col justify-between">
                  <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                    <Calendar size={18} className="text-gold-500" />
                    <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                      Schedule Private Viewing
                    </h3>
                  </div>

                  {bookSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-8"
                    >
                      <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-550/20 mb-3 animate-bounce">
                        <Check size={28} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">Viewing Request Lodged</h4>
                      <p className="text-xs text-slate-500 max-w-xs mt-1.5 font-light">
                        Broker {agent?.name} will contact you at {bookEmail} within 2 hours to confirm your private viewing slot.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Full Name</label>
                          <input
                            type="text"
                            required
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            placeholder="e.g. Marcus Aurelius"
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Email Address</label>
                          <input
                            type="email"
                            required
                            value={bookEmail}
                            onChange={(e) => setBookEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={bookPhone}
                            onChange={(e) => setBookPhone(e.target.value)}
                            placeholder="+1 (305) 000-0000"
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Date</label>
                            <input
                              type="date"
                              required
                              value={bookDate}
                              onChange={(e) => setBookDate(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-2 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-gold-500"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Time</label>
                            <select
                              value={bookTime}
                              onChange={(e) => setBookTime(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg px-2 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-gold-500"
                            >
                              <option>10:00 AM</option>
                              <option>12:00 PM</option>
                              <option>2:00 PM</option>
                              <option>4:00 PM</option>
                              <option>6:00 PM</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gold-gradient text-slate-950 text-xs font-bold uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-gold-500/10 transition-all active:scale-95 mt-4"
                      >
                        Request Private Viewing Slot
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
