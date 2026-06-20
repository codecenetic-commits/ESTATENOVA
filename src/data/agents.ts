export interface Agent {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  propertiesSold: number;
  image: string;
  phone: string;
  email: string;
  socials: {
    instagram: string;
    linkedin: string;
    twitter: string;
  };
}

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Seraphina Vance',
    role: 'Principal Partner & Luxury Director',
    experience: '12+ Years',
    rating: 5.0,
    propertiesSold: 184,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    phone: '+1 (305) 555-0190',
    email: 'seraphina@estatenova.com',
    socials: {
      instagram: 'https://instagram.com/seraphina.lux',
      linkedin: 'https://linkedin.com/in/seraphinavance',
      twitter: 'https://twitter.com/seraphinavance'
    }
  },
  {
    id: 'agent-2',
    name: 'Julian Sterling',
    role: 'Senior Investment Advisor',
    experience: '15 Years',
    rating: 4.9,
    propertiesSold: 210,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    phone: '+1 (305) 555-0144',
    email: 'julian@estatenova.com',
    socials: {
      instagram: 'https://instagram.com/julian_sterling',
      linkedin: 'https://linkedin.com/in/juliansterling',
      twitter: 'https://twitter.com/jster_realestate'
    }
  },
  {
    id: 'agent-3',
    name: 'Alexander Croft',
    role: 'Waterfront & Penthouse Specialist',
    experience: '8 Years',
    rating: 4.8,
    propertiesSold: 96,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    phone: '+1 (305) 555-0177',
    email: 'alexander@estatenova.com',
    socials: {
      instagram: 'https://instagram.com/alexandercroft.re',
      linkedin: 'https://linkedin.com/in/alexandercroft',
      twitter: 'https://twitter.com/alexcroft_re'
    }
  },
  {
    id: 'agent-4',
    name: 'Vivienne Mercer',
    role: 'Smart Home & Sustainable Living Specialist',
    experience: '6 Years',
    rating: 4.9,
    propertiesSold: 72,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    phone: '+1 (305) 555-0168',
    email: 'vivienne@estatenova.com',
    socials: {
      instagram: 'https://instagram.com/vivienne.mercer',
      linkedin: 'https://linkedin.com/in/viviennemercer',
      twitter: 'https://twitter.com/viv_mercer'
    }
  }
];
