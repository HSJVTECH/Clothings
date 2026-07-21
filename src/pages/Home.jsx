import React from 'react';
import HeroAnimation from '../components/HeroAnimation';
import FeaturedCollection from '../components/FeaturedCollection';
import NewArrivals from '../components/NewArrivals';
import AboutBrand from '../components/AboutBrand';
import FeaturedCategories from '../components/FeaturedCategories';
import EditorialBanner from '../components/EditorialBanner';
import InstagramGallery from '../components/InstagramGallery';
import Newsletter from '../components/Newsletter';

const Home = ({ heroImages, heroLoaded }) => {
  return (
    <main className="bg-primary text-white">
      {/* ── 1. Pinned 3D Hero Animation Sequence (Frame 1 -> 240) ── */}
      <HeroAnimation images={heroImages} isLoaded={heroLoaded} />

      {/* ── 2. Content Sections (Solid Dark Luxury Background) ── */}
      <div className="relative z-10 bg-[#0B0B0B] text-white">
        <FeaturedCollection />
        <div className="divider container-luxury border-white/10" />
        <NewArrivals />
        <AboutBrand />
        <div className="divider container-luxury border-white/10" />
        <FeaturedCategories />
        
        {/* ── 3. Editorial Campaign Monograph / End Scene ── */}
        <EditorialBanner />

        <InstagramGallery />
        <Newsletter />
      </div>
    </main>
  );
};

export default Home;
