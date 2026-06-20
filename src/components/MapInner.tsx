'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, BedDouble, Bath, Square, Star } from 'lucide-react';
import { Property } from '@/data/properties';
import { useApp } from '@/context/AppContext';

// Fix Leaflet marker icon asset issue in Next.js
// By using custom L.divIcon, we bypass issues with leaflet marker assets and get custom styling!
const createCustomIcon = (isActive: boolean, type: string) => {
  return L.divIcon({
    className: 'custom-marker-container',
    html: `
      <div class="relative flex items-center justify-center">
        <!-- Pin Shadow -->
        <div class="absolute w-6 h-6 rounded-full bg-gold-500/30 blur-sm scale-150 animate-pulse"></div>
        <!-- Inner Pin -->
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full ${
          isActive ? 'bg-white text-gold-500 scale-110 shadow-gold-500/50' : 'bg-gold-500 text-slate-950 shadow-black/20'
        } border-2 border-slate-900 shadow-lg transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 3-10 9h3v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h3L12 3z"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

interface MapRecenterProps {
  center: [number, number];
  zoom: number;
}

const MapRecenter: React.FC<MapRecenterProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.0 });
  }, [center, zoom, map]);
  return null;
};

interface MapInnerProps {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

const MapInner: React.FC<MapInnerProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  onViewDetails,
}) => {
  const { formatPrice } = useApp();
  const [mapCenter, setMapCenter] = useState<[number, number]>([25.80, -80.16]); // Central Miami/Miami Beach
  const [mapZoom, setMapZoom] = useState(11);

  useEffect(() => {
    if (selectedProperty) {
      setMapCenter([selectedProperty.location.lat, selectedProperty.location.lng]);
      setMapZoom(14);
    }
  }, [selectedProperty]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      className="w-full h-full rounded-2xl outline-none"
      zoomControl={true}
    >
      {/* Dark theme maps from CartoDB */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapRecenter center={mapCenter} zoom={mapZoom} />

      {properties.map((prop) => {
        const isActive = selectedProperty?.id === prop.id;
        return (
          <Marker
            key={prop.id}
            position={[prop.location.lat, prop.location.lng]}
            icon={createCustomIcon(isActive, prop.type)}
            eventHandlers={{
              click: () => {
                onSelectProperty(prop);
              },
            }}
          >
            <Popup>
              {/* Premium popup card inside Map */}
              <div className="w-[240px] text-left">
                <div className="relative h-28 w-full bg-slate-950">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-gold-500 text-slate-950 text-[9px] uppercase font-black tracking-widest rounded">
                    {prop.type}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 text-slate-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gold-500 font-serif">
                      {formatPrice(prop.price)}
                      {prop.status === 'Rent' && <span className="text-[10px] text-slate-400 font-sans">/mo</span>}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 border border-slate-800 rounded font-bold uppercase tracking-wider text-slate-400">
                      {prop.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white truncate font-serif">
                    {prop.title}
                  </h4>

                  <div className="flex items-center text-[10px] text-slate-400 space-x-1">
                    <MapPin size={9} className="text-gold-500" />
                    <span className="truncate">{prop.location.neighborhood}, {prop.location.city}</span>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-900">
                    <span className="flex items-center space-x-0.5">
                      <BedDouble size={10} className="text-gold-500" />
                      <span>{prop.beds}b</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <Bath size={10} className="text-gold-500" />
                      <span>{prop.baths}ba</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <Square size={10} className="text-gold-500" />
                      <span>{prop.sqft} sqft</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onViewDetails(prop)}
                    className="w-full mt-2.5 py-1.5 bg-gold-500 hover:bg-gold-600 text-slate-950 text-[10px] uppercase font-bold tracking-widest rounded transition-colors text-center"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapInner;
