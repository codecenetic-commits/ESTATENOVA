# EstateNova | Luxury Real Estate & Premium Properties

EstateNova is a sophisticated, modern real estate platform designed to showcase luxury properties with a seamless, interactive user experience. Built with Next.js 15+, React 19, and Tailwind CSS 4, it features cutting-edge components like an AI property recommender, interactive maps, and fluid animations.

![EstateNova Preview]

## ✨ Features

- 🏙️ **Luxury Property Showcase**: High-fidelity property cards with detailed specs.
- 🤖 **AI Property Recommender**: Intelligent matchmaking engine to find your perfect home.
- 🗺️ **Interactive Leaflet Map**: Real-time property locations and area exploration.
- 🔍 **Advanced Search & Filtering**: Precise filters for status, type, city, and price range.
- 💖 **Wishlist & Comparison**: User-centric tools to save and compare luxury offerings.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- 🌗 **Dark Mode Support**: Seamless transition between light and dark themes.
- ⚡ **High Performance**: Built with Next.js App Router for optimal speed and SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font) & Playfair Display

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/estate-nova.git
   cd estate-nova
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (pages, layout, robots, sitemap)
├── components/     # Reusable UI components
├── context/        # Global state management (AppContext)
├── data/           # Mock data and property listings
└── public/         # Static assets (images, icons)
```

## 📈 SEO & Optimization

EstateNova is optimized for search engines and social sharing:
- **Dynamic Sitemap**: Automatically generated at `/sitemap.xml`.
- **Crawler Instructions**: Defined in `/robots.txt`.
- **Advanced Metadata**: Comprehensive OpenGraph and Twitter tags in the root layout.
- **Image Optimization**: Utilizing `next/image` for fast-loading visual assets.

## 📄 License

This project is private. (Modify as needed)

---

Built with ❤️ by the EstateNova Team.
