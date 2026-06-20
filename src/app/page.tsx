'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Property } from '@/data/properties';

// Named Exports
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SearchFilter, SearchFilters } from '@/components/SearchFilter';
import { PropertyGrid } from '@/components/PropertyGrid';
import { InteractiveMap } from '@/components/InteractiveMap';
import { AgentSection } from '@/components/AgentSection';
import { Testimonials } from '@/components/Testimonials';
import { FAQSection } from '@/components/FAQSection';
import { ContactForm } from '@/components/ContactForm';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { ComparisonBar } from '@/components/ComparisonBar';
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal';
import { AIRecommender } from '@/components/AIRecommender';

// Default Exports
import PropertyCategories from '@/components/PropertyCategories';
import LuxuryServices from '@/components/LuxuryServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import NewsletterCTA from '@/components/NewsletterCTA';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';

export default function Home() {
  const { wishlist, compareList } = useApp();

  // 1. Search Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    status: 'Buy',
    type: 'All',
    city: 'All',
    priceRange: 35000000,
    beds: 'Any',
    baths: 'Any',
    keyword: '',
  });

  // 2. Modals and Drawers States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // 3. Handlers
  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    // Scroll to property grid on search submission
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      type: type,
    }));
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailsOpen(true);
  };

  const handleExploreClick = () => {
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    document.getElementById('search-filter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar navigation */}
      <Navbar
        onWishlistClick={() => setIsWishlistOpen(true)}
        onCompareClick={() => setIsCompareOpen(true)}
        onConsultationClick={handleScheduleClick}
        onSearchClick={handleSearchClick}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onScheduleClick={handleScheduleClick}
        />

        {/* Search filter panel container */}
        <div id="search-filter" className="scroll-mt-24">
          <SearchFilter onSearch={handleSearch} initialFilters={filters} />
        </div>

        {/* Property Collections by categories */}
        <PropertyCategories onSelectCategory={handleSelectCategory} />

        {/* Property Showcase Grid */}
        <PropertyGrid filters={filters} onViewDetails={handleViewDetails} />

        {/* Leaflet interactive map */}
        <InteractiveMap onViewDetails={handleViewDetails} />

        {/* AI-driven property matchmaking engine */}
        <AIRecommender onViewDetails={handleViewDetails} />

        {/* Luxury offerings & services */}
        <LuxuryServices />

        {/* Core trust value factors */}
        <WhyChooseUs />

        {/* Company key stats summary */}
        <StatsSection />

        {/* Historical background timeline */}
        <AboutSection />

        {/* Advisor Team */}
        <AgentSection />

        {/* Client feedback */}
        <Testimonials />

        {/* FAQ list */}
        <FAQSection />

        {/* Contact and schedule booking */}
        <ContactForm />

        {/* Newsletter invitation */}
        <NewsletterCTA />
      </main>

      {/* Main Footer layout */}
      <Footer />

      {/* Floating overlays & Modal dialogs */}
      <LiveChat />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onViewDetails={handleViewDetails}
      />

      <ComparisonBar
        onViewDetails={handleViewDetails}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedProperty(null);
        }}
      />
    </div>
  );
}
