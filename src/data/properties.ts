export interface Property {
  id: string;
  title: string;
  tagline: string;
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Mansion' | 'Beachfront' | 'Smart Home';
  status: 'Buy' | 'Rent';
  price: number;
  location: {
    address: string;
    city: string;
    neighborhood: string;
    lat: number;
    lng: number;
  };
  beds: number;
  baths: number;
  garage: number;
  sqft: number;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  yearBuilt: number;
  agentId: string;
  rating: number;
  videoUrl: string;
  tour3dUrl: string;
  nearby: {
    name: string;
    type: 'school' | 'hospital' | 'restaurant' | 'shopping' | 'transit';
    distance: string;
  }[];
}

export const properties: Property[] = [
  {
    id: 'prop-1',
    title: 'Aura Waterfront Mansion',
    tagline: 'An architectural marvel overlooking Biscayne Bay',
    type: 'Mansion',
    status: 'Buy',
    price: 18500000,
    location: {
      address: '455 Ocean Drive',
      city: 'Miami Beach',
      neighborhood: 'South of Fifth',
      lat: 25.7725,
      lng: -80.1305,
    },
    beds: 6,
    baths: 8,
    garage: 4,
    sqft: 11200,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'This ultra-exclusive waterfront mansion delivers unparalleled sophistication and elite security. Designed by world-renowned Oppenheim Architecture, the estate features expansive double-height ceilings, floor-to-ceiling glass walls, a professional chef’s kitchen, and bespoke Italian marble finishes. The outer grounds host a 75-foot infinity pool, private deep-water dock, and an expansive rooftop terrace offering 360-degree sunset views.',
    features: ['Private Dock', 'Waterfront View', 'Rooftop Terrace', 'Wine Cellar', 'Chef Kitchen', 'Automated Gates'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Garden', 'Cinema room', 'Elevator'],
    yearBuilt: 2024,
    agentId: 'agent-1',
    rating: 4.9,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P', // mock matterport
    nearby: [
      { name: 'South Beach Elementary', type: 'school', distance: '1.2 miles' },
      { name: 'Mount Sinai Medical Center', type: 'hospital', distance: '3.4 miles' },
      { name: 'Prime 112 Steakhouse', type: 'restaurant', distance: '0.3 miles' },
      { name: 'Bal Harbour Shops', type: 'shopping', distance: '6.5 miles' },
      { name: 'Metrobus Station - Ocean Dr', type: 'transit', distance: '0.1 miles' }
    ]
  },
  {
    id: 'prop-2',
    title: 'The Luminary Penthouse',
    tagline: 'Sky-high living above the glittering city lights',
    type: 'Penthouse',
    status: 'Buy',
    price: 9250000,
    location: {
      address: '1420 Brickell Avenue',
      city: 'Miami',
      neighborhood: 'Brickell',
      lat: 25.7592,
      lng: -80.1918,
    },
    beds: 4,
    baths: 4.5,
    garage: 3,
    sqft: 6500,
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Commanding the top two floors of the iconic Luminary Tower, this duplex penthouse offers the peak of urban luxury. Enjoy private elevator entry, a floating sculptural staircase, custom Gaggenau appliances, and smart-tinting glass. An expansive wrap-around sky terrace hosts a private plunge pool and custom outdoor lounge, presenting uninterrupted vistas of the Miami skyline and Key Biscayne.',
    features: ['Private Elevator', 'Duplex Layout', 'Sky Pool', 'Concierge Service', 'Smart Tinting Glass'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Elevator'],
    yearBuilt: 2023,
    agentId: 'agent-2',
    rating: 4.8,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Brickell Academy', type: 'school', distance: '0.5 miles' },
      { name: 'Mercy Hospital', type: 'hospital', distance: '2.1 miles' },
      { name: 'LPM Restaurant & Bar', type: 'restaurant', distance: '0.1 miles' },
      { name: 'Brickell City Centre', type: 'shopping', distance: '0.2 miles' },
      { name: 'Brickell Metrorail Station', type: 'transit', distance: '0.3 miles' }
    ]
  },
  {
    id: 'prop-3',
    title: 'One Thousand Waves Estate',
    tagline: 'Coastal refinement meeting state-of-the-art innovation',
    type: 'Beachfront',
    status: 'Buy',
    price: 24000000,
    location: {
      address: '18801 Collins Avenue',
      city: 'Sunny Isles Beach',
      neighborhood: 'Sunny Isles',
      lat: 25.9501,
      lng: -80.1211,
    },
    beds: 7,
    baths: 9,
    garage: 6,
    sqft: 14500,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A spectacular oceanfront oasis sitting on over an acre of immaculate sand. One Thousand Waves showcases minimalist tropical design, blending indoor and outdoor ecosystems seamlessly. The residence boasts a private spa wellness wing, steam room, Finnish sauna, professional-grade gym, cold plunge, and a beachfront veranda. Equipped with full Crestron smart automation.',
    features: ['Direct Beach Access', 'Wellness Spa Wing', 'Crestron Automation', 'Sauna & Steam', 'Gated Community'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Garden', 'Cinema room'],
    yearBuilt: 2025,
    agentId: 'agent-1',
    rating: 5.0,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Norman S. Edelcup K-8', type: 'school', distance: '0.8 miles' },
      { name: 'Aventura Hospital', type: 'hospital', distance: '3.1 miles' },
      { name: 'Il Mulino New York', type: 'restaurant', distance: '0.4 miles' },
      { name: 'Aventura Mall', type: 'shopping', distance: '2.5 miles' },
      { name: 'Sunny Isles Shuttle', type: 'transit', distance: '0.1 miles' }
    ]
  },
  {
    id: 'prop-4',
    title: 'The Obsidian Smart Estate',
    tagline: 'The epitome of high-tech minimalist design',
    type: 'Smart Home',
    status: 'Buy',
    price: 7800000,
    location: {
      address: '1108 Coral Way',
      city: 'Coral Gables',
      neighborhood: 'Gables Estates',
      lat: 25.7502,
      lng: -80.2592,
    },
    beds: 5,
    baths: 6,
    garage: 3,
    sqft: 7900,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Constructed from structural concrete and carbonized wood, The Obsidian represents the peak of eco-luxury. Fully integrated with an AI-driven smart home system that adjusts lighting, air quality, security, and climate based on biometric cues. A subterranean glass garage, green living walls, custom solar-tile roof, and saltwater ozone pool make this estate as sustainable as it is luxury.',
    features: ['AI Smart Integration', 'Ozone Pool', 'Subterranean Glass Garage', 'Living Green Walls', 'Solar Roof'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Garden', 'Cinema room'],
    yearBuilt: 2024,
    agentId: 'agent-3',
    rating: 4.7,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Coral Gables Preparatory', type: 'school', distance: '1.5 miles' },
      { name: 'Coral Gables Hospital', type: 'hospital', distance: '1.9 miles' },
      { name: 'Caffe Abbracci', type: 'restaurant', distance: '1.1 miles' },
      { name: 'Miracle Mile Shops', type: 'shopping', distance: '1.2 miles' },
      { name: 'Douglas Road Metrorail', type: 'transit', distance: '1.4 miles' }
    ]
  },
  {
    id: 'prop-5',
    title: 'Elysian Canopy Villa',
    tagline: 'Lush tropical privacy meets modern geometric design',
    type: 'Villa',
    status: 'Buy',
    price: 11500000,
    location: {
      address: '3200 Devon Road',
      city: 'Coconut Grove',
      neighborhood: 'Coconut Grove',
      lat: 25.7224,
      lng: -80.2443,
    },
    beds: 5,
    baths: 5.5,
    garage: 3,
    sqft: 8200,
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Surrounded by century-old oak trees and rare palms, the Elysian Canopy Villa is a masterclass in organic modernism. Crafted with warm teak wood, natural limestone, and architectural bronze. Features include an outdoor entertainment deck, a custom cold-plunge bath, professional tennis/pickleball court, and a separate guest lodge.',
    features: ['Teak & Limestone Detail', 'Guest House', 'Pickleball Court', 'Organic Modernist design', 'Cold Plunge'],
    amenities: ['Swimming pool', 'Garage', 'Gym', 'Security', 'Garden', 'Elevator'],
    yearBuilt: 2022,
    agentId: 'agent-2',
    rating: 4.9,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Coconut Grove Elementary', type: 'school', distance: '0.9 miles' },
      { name: 'Mercy Hospital', type: 'hospital', distance: '1.8 miles' },
      { name: 'Sadelles Coconut Grove', type: 'restaurant', distance: '0.7 miles' },
      { name: 'CocoWalk Shops', type: 'shopping', distance: '0.8 miles' },
      { name: 'Coconut Grove Marina', type: 'transit', distance: '0.6 miles' }
    ]
  },
  {
    id: 'prop-6',
    title: 'Solitude Beach Villa',
    tagline: 'Uninterrupted shoreline views and ultra-private living',
    type: 'Beachfront',
    status: 'Rent',
    price: 38000,
    location: {
      address: '740 Ocean Blvd',
      city: 'Key Biscayne',
      neighborhood: 'Key Biscayne',
      lat: 25.6888,
      lng: -80.1601,
    },
    beds: 4,
    baths: 4.5,
    garage: 2,
    sqft: 5400,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Available for short-term and long-term luxury lease, this beachfront villa on Key Biscayne sits in a quiet cul-de-sac. Offers direct access to a private beach strip, floor-to-ceiling glass panel sliding doors, a saltwater swimming pool, and a high-spec chef kitchen. Ideal for high-profile clients seeking privacy.',
    features: ['Direct Sand Beach', 'Cul-de-sac Privacy', 'Saltwater Pool', 'Fully Furnished', '24/7 Patrol Service'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Security', 'Garden'],
    yearBuilt: 2021,
    agentId: 'agent-3',
    rating: 4.8,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Key Biscayne K-8 Center', type: 'school', distance: '1.4 miles' },
      { name: 'Mercy Hospital', type: 'hospital', distance: '5.2 miles' },
      { name: 'The Rusty Pelican', type: 'restaurant', distance: '2.8 miles' },
      { name: 'Key Biscayne Arcade', type: 'shopping', distance: '1.1 miles' },
      { name: 'Key Biscayne Yacht Club', type: 'transit', distance: '0.9 miles' }
    ]
  },
  {
    id: 'prop-7',
    title: 'The Vertex Penthouse Suite',
    tagline: 'Modern urban luxury at its absolute finest',
    type: 'Penthouse',
    status: 'Rent',
    price: 25000,
    location: {
      address: '701 S Miami Avenue',
      city: 'Miami',
      neighborhood: 'Brickell Key',
      lat: 25.7681,
      lng: -80.1876,
    },
    beds: 3,
    baths: 3.5,
    garage: 2,
    sqft: 4200,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An elite penthouse rental in Brickell offering skyline and ocean views. Features double height glass ceilings, smart blinds, automatic lighting system, dynamic multiroom audio, custom marble breakfast bar, and dedicated 24/7 concierge. Access to a private rooftop sky bar and premium wellness center included.',
    features: ['Rooftop Club Access', 'Double Height Glass', 'Multiroom Audio', 'Marble Bar', 'Concierge Service'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Elevator'],
    yearBuilt: 2023,
    agentId: 'agent-4',
    rating: 4.7,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Brickell International Academy', type: 'school', distance: '0.4 miles' },
      { name: 'Jackson Memorial Hospital', type: 'hospital', distance: '3.6 miles' },
      { name: 'Zuma Miami', type: 'restaurant', distance: '0.2 miles' },
      { name: 'Brickell City Centre', type: 'shopping', distance: '0.1 miles' },
      { name: 'Financial District Metromover', type: 'transit', distance: '0.2 miles' }
    ]
  },
  {
    id: 'prop-8',
    title: 'Amara Smart Sanctuary',
    tagline: 'Award-winning automation and hyper-modernist architectural lines',
    type: 'Smart Home',
    status: 'Buy',
    price: 6900000,
    location: {
      address: '2280 Tigertail Avenue',
      city: 'Miami',
      neighborhood: 'Coconut Grove',
      lat: 25.7335,
      lng: -80.2281,
    },
    beds: 4,
    baths: 5,
    garage: 3,
    sqft: 6100,
    images: [
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'This ultra-modern architectural triumph features a full Josh.ai voice-activated automation system. Built with premium custom materials including imported German kitchen fixtures, Italian porcelain slab floors, and double insulated glazing. Features include a solar backup power system, dynamic lighting design, and an integrated wellness deck.',
    features: ['Josh.ai Integration', 'German Kitchen Fixtures', 'Solar Backup Batteries', 'Tesla Chargers', 'Oversized Pivot Front Door'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Garden'],
    yearBuilt: 2024,
    agentId: 'agent-4',
    rating: 4.8,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'St. Stephen’s Episcopal', type: 'school', distance: '0.6 miles' },
      { name: 'Mercy Hospital', type: 'hospital', distance: '1.2 miles' },
      { name: 'The Key Club', type: 'restaurant', distance: '0.4 miles' },
      { name: 'CocoWalk Shopping', type: 'shopping', distance: '0.5 miles' },
      { name: 'Coconut Grove Metro Station', type: 'transit', distance: '0.9 miles' }
    ]
  },
  {
    id: 'prop-9',
    title: 'Serene Sanctuary Villa',
    tagline: 'An elegant estate surrounded by private pine tree groves',
    type: 'Villa',
    status: 'Buy',
    price: 13200000,
    location: {
      address: '3940 Banyan Drive',
      city: 'Coral Gables',
      neighborhood: 'Snapper Creek',
      lat: 25.6698,
      lng: -80.2911,
    },
    beds: 6,
    baths: 7,
    garage: 4,
    sqft: 9800,
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Located in a secure gated community, this masterfully designed estate sits on two lush acres. The villa centers around an interior courtyard with koi pond and tropical vegetation. Boasting a climate-controlled walk-in humidor, custom marble bar, full home theater, and a detached 2-bedroom guest pavilion.',
    features: ['Gated Community', 'Walk-in Humidor', 'Koi Pond Courtyard', 'Detached Guest Pavilion', 'Home Theater'],
    amenities: ['Swimming pool', 'Garage', 'Gym', 'Security', 'Garden', 'Cinema room'],
    yearBuilt: 2023,
    agentId: 'agent-1',
    rating: 4.9,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Gulliver Preparatory School', type: 'school', distance: '1.1 miles' },
      { name: 'Baptist Hospital of Miami', type: 'hospital', distance: '2.5 miles' },
      { name: 'Fiola Miami', type: 'restaurant', distance: '1.9 miles' },
      { name: 'Dadeland Mall', type: 'shopping', distance: '2.8 miles' },
      { name: 'Dadeland South Station', type: 'transit', distance: '2.7 miles' }
    ]
  },
  {
    id: 'prop-10',
    title: 'Apex Sky Residence',
    tagline: 'High-end sleek design with infinity vistas of the Atlantic',
    type: 'Penthouse',
    status: 'Rent',
    price: 45000,
    location: {
      address: '1588 Collins Avenue',
      city: 'Miami Beach',
      neighborhood: 'Mid Beach',
      lat: 25.8078,
      lng: -80.1225,
    },
    beds: 5,
    baths: 6,
    garage: 3,
    sqft: 8100,
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Spanning the top floor of a new luxury resort tower, this sky-mansion lease offers full access to resort five-star services (beach valet, 24h butler, private chef on request). The property includes custom minotti furniture, a personal gym room, sound-proof cinema, and an incredible custom glass-front infinity pool floating over the sea.',
    features: ['Resort Amenities Access', 'Butler & Chef Services', 'Personal Infinity Pool', 'Minotti Furnishings', 'Private Office'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Cinema room', 'Elevator'],
    yearBuilt: 2024,
    agentId: 'agent-2',
    rating: 5.0,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Miami Beach Senior High', type: 'school', distance: '2.0 miles' },
      { name: 'Mount Sinai Hospital', type: 'hospital', distance: '1.5 miles' },
      { name: 'Nobu Miami', type: 'restaurant', distance: '0.1 miles' },
      { name: 'Lincoln Road Mall', type: 'shopping', distance: '2.2 miles' },
      { name: 'Collins Ave Bus Link', type: 'transit', distance: '0.05 miles' }
    ]
  },
  {
    id: 'prop-11',
    title: 'The Oasis Smart Loft',
    tagline: 'Modern tech meets industrial brick luxury',
    type: 'Apartment',
    status: 'Rent',
    price: 18000,
    location: {
      address: '250 NW 24th Street',
      city: 'Miami',
      neighborhood: 'Wynwood',
      lat: 25.8005,
      lng: -80.1989,
    },
    beds: 2,
    baths: 2.5,
    garage: 1,
    sqft: 3100,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural loft located in the Wynwood Arts District. It boasts exposed brickwork, custom metal finishes, 18-foot high ceilings, industrial floor-to-ceiling iron windows, and full Sonos and Savant automation. A private rooftop terrace is fitted with a built-in outdoor kitchen, gas fireplace, and custom hot tub.',
    features: ['Exposed Brick', '18ft Ceilings', 'Rooftop Hot Tub & Kitchen', 'Sonos Sound System', 'Wynwood Art views'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Security', 'Elevator'],
    yearBuilt: 2022,
    agentId: 'agent-3',
    rating: 4.6,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Wynwood Charter School', type: 'school', distance: '0.4 miles' },
      { name: 'University of Miami Hospital', type: 'hospital', distance: '1.8 miles' },
      { name: 'KYU Restaurant', type: 'restaurant', distance: '0.2 miles' },
      { name: 'Wynwood Walls', type: 'shopping', distance: '0.1 miles' },
      { name: 'Wynwood Bus Loop', type: 'transit', distance: '0.2 miles' }
    ]
  },
  {
    id: 'prop-12',
    title: 'Marquesa Shoreline Estate',
    tagline: 'Unmatched estate footprint on the gold coast sand',
    type: 'Beachfront',
    status: 'Buy',
    price: 32500000,
    location: {
      address: '360 Ocean Boulevard',
      city: 'Golden Beach',
      neighborhood: 'Golden Beach',
      lat: 25.9662,
      lng: -80.1198,
    },
    beds: 8,
    baths: 11,
    garage: 5,
    sqft: 18200,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Commanding over 150 feet of pristine direct ocean frontage in the private municipality of Golden Beach. Marquesa features a double-wing layout: a main residential wing with grand soaring arches and a multi-level wellness spa wing with indoor lap pool, massage suites, salon, and yoga loft. The grounds contain a beach cabana, massive swimming pool with waterfalls, and tennis court.',
    features: ['150ft Ocean Frontage', 'Private Municipality Security', 'Indoor Lap Pool', 'Massage & Spa Suites', 'Cabana & Tennis Court'],
    amenities: ['Swimming pool', 'Garage', 'Smart home', 'Gym', 'Security', 'Garden', 'Cinema room', 'Elevator'],
    yearBuilt: 2025,
    agentId: 'agent-1',
    rating: 5.0,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tour3dUrl: 'https://my.matterport.com/show/?m=sxK32C5AJ8P',
    nearby: [
      { name: 'Gulfstream Academy', type: 'school', distance: '1.8 miles' },
      { name: 'Aventura Medical Center', type: 'hospital', distance: '2.8 miles' },
      { name: 'Tatiana by Chef Rodney', type: 'restaurant', distance: '2.0 miles' },
      { name: 'Aventura Mall', type: 'shopping', distance: '2.2 miles' },
      { name: 'Aventura Brightline Station', type: 'transit', distance: '2.4 miles' }
    ]
  }
];
