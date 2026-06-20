'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/data/properties';

type Currency = 'USD' | 'EUR' | 'AED';
type Language = 'EN' | 'FR' | 'AR';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  wishlist: string[]; // property IDs
  toggleWishlist: (id: string) => void;
  compareList: Property[]; // property objects
  addToCompare: (property: Property) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  recentlyViewed: string[]; // property IDs
  addRecentView: (id: string) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  formatPrice: (price: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getSafeLocalStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return saved as unknown as T;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getSafeLocalStorage('estatenova-theme', 'dark'));
  const [wishlist, setWishlist] = useState<string[]>(() => getSafeLocalStorage('estatenova-wishlist', []));
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => getSafeLocalStorage('estatenova-recent', []));
  const [currency, setCurrency] = useState<Currency>(() => getSafeLocalStorage('estatenova-currency', 'USD'));
  const [language, setLanguage] = useState<Language>(() => getSafeLocalStorage('estatenova-language', 'EN'));

  // Sync theme class with document element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('estatenova-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('estatenova-wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const addToCompare = (property: Property) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === property.id)) return prev;
      if (prev.length >= 3) {
        // Replace the last one or do nothing
        return [...prev.slice(1), property];
      }
      return [...prev, property];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addRecentView = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, 6);
      localStorage.setItem('estatenova-recent', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem('estatenova-currency', curr);
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('estatenova-language', lang);
  };

  const formatPrice = (price: number) => {
    // Exchange rates (mock base USD)
    let converted = price;
    let symbol = '$';

    if (currency === 'EUR') {
      converted = price * 0.92;
      symbol = '€';
    } else if (currency === 'AED') {
      converted = price * 3.67;
      symbol = 'د.إ ';
    }

    if (converted >= 1000000) {
      return `${symbol}${(converted / 1000000).toFixed(1)}M`;
    }
    return `${symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        wishlist,
        toggleWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        recentlyViewed,
        addRecentView,
        currency,
        setCurrency: handleSetCurrency,
        language,
        setLanguage: handleSetLanguage,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
