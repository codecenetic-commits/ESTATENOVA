'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, GitCompare, Sun, Moon, Globe, DollarSign, Calendar, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface NavbarProps {
  onWishlistClick: () => void;
  onCompareClick: () => void;
  onConsultationClick: () => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onWishlistClick,
  onCompareClick,
  onConsultationClick,
  onSearchClick,
}) => {
  const { theme, toggleTheme, wishlist, compareList, currency, setCurrency, language, setLanguage } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrDropdown, setShowCurrDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Properties', href: '#properties' },
    { name: 'Services', href: '#services' },
    { name: 'Agents', href: '#agents' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass-navbar py-3 shadow-lg shadow-black/10'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
         <a href="#home" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-widest text-stone-800 dark:text-stone-100">
              ESTATE<span className="text-[#D4AF37]">NOVA</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Utility Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-gold-500 transition-colors"
              title="Search Properties"
            >
              <Search size={19} />
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCurrDropdown(!showCurrDropdown);
                  setShowLangDropdown(false);
                }}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-gold-500 flex items-center space-x-1 text-sm font-semibold transition-colors"
              >
                <DollarSign size={16} />
                <span>{currency}</span>
              </button>
              <AnimatePresence>
                {showCurrDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-24 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 overflow-hidden"
                  >
                    {(['USD', 'EUR', 'AED'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setShowCurrDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs hover:bg-gold-500 hover:text-slate-950 transition-colors ${
                          currency === curr ? 'text-gold-500 font-bold' : 'text-slate-300'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowCurrDropdown(false);
                }}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-gold-500 flex items-center space-x-1 text-sm font-semibold transition-colors"
              >
                <Globe size={16} />
                <span>{language}</span>
              </button>
              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-28 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 overflow-hidden"
                  >
                    {[
                      { code: 'EN', name: 'English' },
                      { code: 'FR', name: 'Français' },
                      { code: 'AR', name: 'العربية' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs hover:bg-gold-500 hover:text-slate-950 transition-colors ${
                          language === lang.code ? 'text-gold-500 font-bold' : 'text-slate-300'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Trigger */}
            <button
              onClick={onWishlistClick}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors relative"
              title="Saved Properties"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Compare Trigger */}
            <button
              onClick={onCompareClick}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-gold-500 transition-colors relative"
              title="Compare Properties"
            >
              <GitCompare size={19} />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-slate-950 text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-gold-500 transition-colors"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Consultation CTA */}
            <button
              onClick={onConsultationClick}
              className="relative px-5 py-2.5 rounded-full bg-gold-gradient text-slate-950 text-xs font-semibold uppercase tracking-wider overflow-hidden group shadow-md shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-95 transition-all"
            >
              <span className="relative z-10 flex items-center space-x-1">
                <Calendar size={13} />
                <span>Book Consultation</span>
              </span>
              <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-gold-500 transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={onWishlistClick}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors relative"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-900 dark:text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <span className="text-xl font-bold tracking-wider text-white">
                    ESTATE<span className="text-gold-500">NOVA</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-slate-300 hover:text-gold-500 transition-colors py-2 border-b border-slate-800/50"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Mobile Dropdowns / Actions */}
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Currency</span>
                  <div className="flex space-x-2">
                    {(['USD', 'EUR', 'AED'] as const).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-2.5 py-1 rounded border text-xs font-semibold ${
                          currency === curr
                            ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                            : 'border-slate-800 text-slate-400'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Language</span>
                  <div className="flex space-x-2">
                    {(['EN', 'FR', 'AR'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-2.5 py-1 rounded border text-xs font-semibold ${
                          language === lang
                            ? 'border-gold-500 bg-gold-500/10 text-gold-500'
                            : 'border-slate-800 text-slate-400'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onCompareClick();
                  }}
                  className="w-full py-3 bg-slate-800 text-slate-300 text-sm font-semibold rounded-lg flex items-center justify-center space-x-2"
                >
                  <GitCompare size={16} />
                  <span>Compare List ({compareList.length})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onConsultationClick();
                  }}
                  className="w-full py-3 bg-gold-gradient text-slate-950 text-sm font-bold rounded-lg uppercase tracking-wider shadow-lg shadow-gold-500/10"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
