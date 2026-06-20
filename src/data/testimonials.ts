export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  review: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Thorne',
    role: 'Venture Capitalist & Tech Investor',
    company: 'Thorne Holdings',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    review: 'EstateNova redefined the home-buying experience for me. Their discretion, smart recommendation engine, and access to off-market waterfront assets made acquiring the Aura Waterfront Mansion seamless. Seraphina Vance is an absolute force in luxury real estate.',
    location: 'Miami Beach, FL'
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Concert Violinist & Philanthropist',
    company: 'Global Symphony Trust',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    review: 'Purchasing a beachfront residence requires deep local expertise. One Thousand Waves Estate is everything I dreamed of — a private wellness sanctuary right on the sand. The entire transaction was secured with absolute professionalism and elite care.',
    location: 'Sunny Isles Beach, FL'
  },
  {
    id: 'test-3',
    name: 'Dr. Aaron Chen',
    role: 'Chief Medical Director',
    company: 'Cardiology Center of Miami',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    review: 'The smart automation and sustainability standards of The Obsidian Smart Estate are spectacular. The AI recommendations from EstateNova aligned perfectly with my lifestyle preferences. Vivienne Mercer was incredibly thorough and supportive throughout.',
    location: 'Coral Gables, FL'
  },
  {
    id: 'test-4',
    name: 'Sofia Varghese',
    role: 'Founder & Creative Director',
    company: 'Varghese Atelier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    review: 'I leased the Apex Sky Residence for our winter collection showcase and residential stay. The concierge access and stunning direct ocean skyline panoramas were world-class. It was an award-winning stay and we look forward to making a purchase soon.',
    location: 'Mid Beach, Miami'
  }
];
