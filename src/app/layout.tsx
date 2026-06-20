import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'EstateNova | Luxury Real Estate & Premium Properties',
  description: 'Discover extraordinary luxury living. Explore world-class villas, penthouses, and apartments in prime locations with EstateNova. Luxury Living Starts Here.',
  keywords: 'luxury real estate, premium villas, penthouses for sale, beachfront properties, smart homes, EstateNova',
  authors: [{ name: 'EstateNova Team' }],
  creator: 'EstateNova',
  publisher: 'EstateNova',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'EstateNova | Luxury Real Estate & Premium Properties',
    description: 'Discover extraordinary luxury living. Explore world-class villas, penthouses, and apartments in prime locations with EstateNova.',
    url: 'https://estatenova.com',
    siteName: 'EstateNova',
    images: [
      {
        url: 'https://estatenova.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EstateNova Luxury Real Estate',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EstateNova | Luxury Real Estate & Premium Properties',
    description: 'Discover extraordinary luxury living. Explore world-class villas, penthouses, and apartments with EstateNova.',
    images: ['https://estatenova.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
