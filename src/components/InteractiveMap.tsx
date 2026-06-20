'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Map, MapPin, School, Hospital, Utensils, ShoppingBag, Train, Compass, Award } from 'lucide-react';
import { Property, properties } from '@/data/properties';
import { useApp } from '@/context/AppContext';

// Dynamically import MapInner with SSR disabled so Leaflet works in Next.js App Router
const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center flex-col text-slate-400 space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
      <span className="text-xs uppercase font-bold tracking-widest text-slate-500">Initializing Premium Map Engine...</span>
    </div>
  ),
});

interface InteractiveMapProps {
  onViewDetails: (property: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onViewDetails }) => {
  const { formatPrice } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties[0]);
  const [activeAmenityFilter, setActiveAmenityFilter] = useState<'all' | 'school' | 'hospital' | 'restaurant' | 'shopping' | 'transit'>('all');

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const amenitiesTags = [
    { type: 'all', label: 'All Places', icon: <Compass size={13} /> },
    { type: 'school', label: 'Schools', icon: <School size={13} /> },
    { type: 'hospital', label: 'Hospitals', icon: <Hospital size={13} /> },
    { type: 'restaurant', label: 'Restaurants', icon: <Utensils size={13} /> },
    { type: 'shopping', label: 'Shopping', icon: <ShoppingBag size={13} /> },
    { type: 'transit', label: 'Transit', icon: <Train size={13} /> },
  ] as const;

  // Filter nearby amenities for selected property
  const filteredNearby = selectedProperty?.nearby.filter(
    (n) => activeAmenityFilter === 'all' || n.type === activeAmenityFilter
  ) || [];

  return (
    <section id="map-section" className="py-24 bg-slate-900 border-y border-slate-800 text-slate-100 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] bg-slate-800/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-500">Live Spatial Navigator</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 font-serif text-white">
            Interactive Property Explorer
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mt-2 font-light">
            Visualize our elite properties spatially and inspect nearby luxury conveniences and essential institutions.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Sidebar List of properties */}
          <div className="lg:col-span-4 flex flex-col space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {properties.map((prop) => {
              const isSelected = selectedProperty?.id === prop.id;
              return (
                <div
                  key={prop.id}
                  onClick={() => handleSelectProperty(prop)}
                  className={`p-4 rounded-xl border transition-all duration-350 cursor-pointer text-left relative overflow-hidden group ${
                    isSelected
                      ? 'bg-slate-950 border-gold-500 shadow-xl shadow-gold-500/5'
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex space-x-3.5 items-center relative z-10">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-slate-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-gold-500 font-serif">
                          {formatPrice(prop.price)}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500">
                          {prop.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate font-serif mt-0.5 group-hover:text-gold-500 transition-colors">
                        {prop.title}
                      </h4>
                      <p className="text-[10px] text-slate-450 truncate mt-1 flex items-center">
                        <MapPin size={9} className="text-gold-500 mr-0.5" />
                        {prop.location.neighborhood}, {prop.location.city}
                      </p>
                    </div>
                  </div>

                  {/* Sidebar Glow strip for selected */}
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gold-500" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side: Map Viewer */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Amenity Filter Buttons Bar */}
            {selectedProperty && (
              <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-2">Nearby:</span>
                <div className="flex flex-wrap gap-1.5">
                  {amenitiesTags.map((tag) => (
                    <button
                      key={tag.type}
                      onClick={() => setActiveAmenityFilter(tag.type as any)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all ${
                        activeAmenityFilter === tag.type
                          ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/10'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {tag.icon}
                      <span>{tag.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Map Frame container */}
            <div className="flex-1 min-h-[480px] relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <MapInner
                properties={properties}
                selectedProperty={selectedProperty}
                onSelectProperty={handleSelectProperty}
                onViewDetails={onViewDetails}
              />
            </div>

            {/* Selected Property Nearby Amenities Listing */}
            {selectedProperty && (
              <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                <div className="md:col-span-2 lg:col-span-3 flex items-center justify-between border-b border-slate-800 pb-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-500 flex items-center">
                    <Award size={12} className="mr-1.5" />
                    Local Infrastructure around {selectedProperty.title}
                  </span>
                  <span className="text-[10px] text-slate-450 font-medium">
                    Showing {filteredNearby.length} conveniences
                  </span>
                </div>
                {filteredNearby.length > 0 ? (
                  filteredNearby.map((place, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/40">
                      <div className="flex items-center space-x-2">
                        <span className="p-1.5 rounded bg-slate-800 text-gold-500">
                          {place.type === 'school' && <School size={12} />}
                          {place.type === 'hospital' && <Hospital size={12} />}
                          {place.type === 'restaurant' && <Utensils size={12} />}
                          {place.type === 'shopping' && <ShoppingBag size={12} />}
                          {place.type === 'transit' && <Train size={12} />}
                        </span>
                        <span className="text-xs font-semibold text-slate-200 truncate max-w-[130px]" title={place.name}>
                          {place.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">
                        {place.distance}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-4 text-center text-xs text-slate-500">
                    No amenities in this category registered for this estate.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
