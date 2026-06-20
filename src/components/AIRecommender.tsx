'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare, Shield, HelpCircle, BedDouble, Bath, Square } from 'lucide-react';
import { properties, Property } from '@/data/properties';
import { useApp } from '@/context/AppContext';

interface AIRecommenderProps {
  onViewDetails: (property: Property) => void;
}

export const AIRecommender: React.FC<AIRecommenderProps> = ({ onViewDetails }) => {
  const { formatPrice } = useApp();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{ property: Property; score: number }[]>([]);
  const [searched, setSearched] = useState(false);

  const handleRecommendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setSearched(true);

    // Simulate luxury AI processing delay
    setTimeout(() => {
      const query = prompt.toLowerCase();
      const scored: { property: Property; score: number }[] = [];

      properties.forEach((prop) => {
        let score = 0;
        let matchedKeywordsCount = 0;

        // Keyword tokens mapping
        const keywords = [
          { tokens: ['pool', 'swimming', 'swim'], weight: 25, isAmenity: 'Swimming pool' },
          { tokens: ['gym', 'fitness', 'workout'], weight: 20, isAmenity: 'Gym' },
          { tokens: ['smart', 'automation', 'tech', 'voice'], weight: 25, isAmenity: 'Smart home' },
          { tokens: ['security', 'safe', 'secure', 'gated'], weight: 15, isAmenity: 'Security' },
          { tokens: ['garden', 'lawn', 'yard'], weight: 15, isAmenity: 'Garden' },
          { tokens: ['cinema', 'theater', 'movie'], weight: 25, isAmenity: 'Cinema room' },
          { tokens: ['elevator', 'lift'], weight: 15, isAmenity: 'Elevator' },
          { tokens: ['garage', 'car', 'parking'], weight: 15, isAmenity: 'Garage' },
          
          // Locations/Types
          { tokens: ['beach', 'beachfront', 'sand', 'ocean', 'sea'], weight: 30, check: () => prop.type === 'Beachfront' || prop.features.some(f => f.toLowerCase().includes('beach')) },
          { tokens: ['penthouse', 'sky', 'tower', 'high'], weight: 25, check: () => prop.type === 'Penthouse' },
          { tokens: ['mansion', 'estate', 'large', 'grand'], weight: 25, check: () => prop.type === 'Mansion' || prop.sqft > 10000 },
          { tokens: ['villa', 'privacy', 'private'], weight: 20, check: () => prop.type === 'Villa' },
          { tokens: ['rent', 'lease'], weight: 30, check: () => prop.status === 'Rent' },
          { tokens: ['buy', 'purchase'], weight: 30, check: () => prop.status === 'Buy' },
        ];

        // Process criteria checks
        keywords.forEach((kw) => {
          const hasToken = kw.tokens.some((token) => query.includes(token));
          if (hasToken) {
            if (kw.isAmenity) {
              if (prop.amenities.includes(kw.isAmenity)) {
                score += kw.weight;
                matchedKeywordsCount++;
              }
            } else if (kw.check) {
              if (kw.check()) {
                score += kw.weight;
                matchedKeywordsCount++;
              }
            }
          }
        });

        // Scan title, description, and features for matching words
        const words = query.split(/\s+/);
        words.forEach((word) => {
          if (word.length < 3) return;
          if (prop.title.toLowerCase().includes(word)) {
            score += 15;
            matchedKeywordsCount++;
          }
          if (prop.description.toLowerCase().includes(word)) {
            score += 8;
            matchedKeywordsCount++;
          }
          if (prop.features.some((f) => f.toLowerCase().includes(word))) {
            score += 12;
            matchedKeywordsCount++;
          }
          if (prop.location.city.toLowerCase().includes(word) || prop.location.neighborhood.toLowerCase().includes(word)) {
            score += 20;
            matchedKeywordsCount++;
          }
        });

        // Parse price limits: e.g. "under 10M", "under 15 million"
        const priceRegex = /(?:under|below|less than)\s*\$?(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/i;
        const priceMatch = query.match(priceRegex);
        if (priceMatch) {
          let limit = parseFloat(priceMatch[1]);
          const modifier = priceMatch[2] ? priceMatch[2].toLowerCase() : '';
          if (modifier === 'm' || modifier === 'million') {
            limit *= 1000000;
          } else if (modifier === 'k' || modifier === 'thousand') {
            limit *= 1000;
          }

          if (prop.price <= limit) {
            score += 40;
            matchedKeywordsCount++;
          } else {
            score -= 50; // heavily penalize if above budget limit
          }
        }

        // Add to list if we matched anything
        if (matchedKeywordsCount > 0 && score > 0) {
          // Normalize score to max 99%
          const baseMatchPct = Math.min(65 + (score / 150) * 34, 99);
          scored.push({
            property: prop,
            score: Math.round(baseMatchPct),
          });
        }
      });

      // Sort by score descending and take top 3
      const topRecs = scored.sort((a, b) => b.score - a.score).slice(0, 3);
      setRecommendations(topRecs);
      setLoading(false);
    }, 1500);
  };

  const samplePrompts = [
    'I want a beachfront villa with a private cinema room and gym.',
    'Looking for a luxury penthouse in Brickell under 10 million.',
    'A high-tech smart home in Coral Gables with a swimming pool and yard.',
  ];

  return (
    <section id="ai-recommender" className="py-24 bg-slate-900 border-b border-slate-800 text-slate-100 relative">
      {/* Glow shapes */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="inline-flex p-3 rounded-2xl bg-gold-500/5 text-gold-500 mb-4 border border-gold-500/10">
          <Sparkles size={24} className="animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-serif text-white">
          AI Property Recommendation Engine
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 font-light">
          Describe the exact lifestyle, location, amenities, and budget you require. Our semantic algorithm will filter out the perfect matched asset.
        </p>

        {/* Input prompt form */}
        <form onSubmit={handleRecommendSubmit} className="mt-10 max-w-2xl mx-auto relative group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your luxury lifestyle (e.g. Waterfront penthouse with cinema room...)"
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-gold-500 rounded-2xl pl-6 pr-32 py-5 text-sm text-white placeholder-slate-500 focus:outline-none shadow-2xl transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center space-x-1 hover:shadow-lg hover:shadow-gold-500/10 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Search</span>
                <ArrowRight size={13} />
              </>
            )}
          </button>
        </form>

        {/* Sample Prompts */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPrompt(sample)}
              className="text-[10px] bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-full transition-colors font-medium text-left"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Output Recommendations Panel */}
        <div className="mt-12">
          {loading && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="h-6 w-40 bg-slate-800 rounded-md animate-pulse mx-auto" />
              <div className="grid grid-cols-1 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-28 bg-slate-950/60 border border-slate-850 rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {!loading && searched && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-2xl mx-auto text-left"
              >
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <h3 className="text-sm font-bold font-serif text-slate-250 uppercase tracking-widest">
                    Top Lifestyle Matches
                  </h3>
                  <span className="text-[10px] text-slate-450 uppercase font-bold tracking-widest">
                    Based on semantic criteria
                  </span>
                </div>

                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {recommendations.map(({ property: prop, score }) => (
                      <div
                        key={prop.id}
                        className="p-4 bg-slate-950/60 border border-slate-850/80 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gold-500/50 transition-colors shadow-lg relative group overflow-hidden"
                      >
                        <div className="flex space-x-4 items-center">
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="w-18 h-18 rounded-lg object-cover border border-slate-800 flex-shrink-0"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-gold-500 font-serif">
                                {formatPrice(prop.price)}
                              </span>
                              <span className="text-[9px] uppercase tracking-wider text-slate-500">
                                {prop.type}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-white font-serif">{prop.title}</h4>
                            <div className="flex items-center text-[10px] text-slate-400 space-x-4 font-semibold">
                              <span className="flex items-center"><BedDouble size={10} className="text-gold-500 mr-0.5" /> {prop.beds} Beds</span>
                              <span className="flex items-center"><Bath size={10} className="text-gold-500 mr-0.5" /> {prop.baths} Baths</span>
                              <span className="flex items-center"><Square size={10} className="text-gold-500 mr-0.5" /> {prop.sqft} sqft</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-end gap-2.5 sm:gap-1.5 w-full sm:w-auto border-t sm:border-t-0 border-slate-900 pt-3 sm:pt-0">
                          <div className="text-left sm:text-right flex-1 sm:flex-initial">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Match Score</span>
                            <span className="text-base font-extrabold text-emerald-400 font-mono tracking-tight">{score}% Match</span>
                          </div>

                          <button
                            onClick={() => onViewDetails(prop)}
                            className="px-4 py-2 bg-slate-900 hover:bg-gold-500 hover:text-slate-950 border border-slate-800 hover:border-gold-500 text-slate-200 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors"
                          >
                            Explore Asset
                          </button>
                        </div>

                        {/* Top corner match highlight */}
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800 text-slate-550 text-xs">
                    No properties matched those specific conditions. Try adjusting the keywords (e.g. "pool", "mansion", "Miami Beach").
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
