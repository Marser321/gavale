import UrgencyBar from './components/UrgencyBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import JustDropped from './components/JustDropped';
import BentoGrid from './components/BentoGrid';
import FeaturedProducts from './components/FeaturedProducts';
import UGCWall from './components/UGCWall';
import BrandStory from './components/BrandStory';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <div className="magic-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <UrgencyBar />
      <Navbar />
      <main>
        <HeroSection />
        <JustDropped />
        <BentoGrid />
        <FeaturedProducts />
        <UGCWall />
        <BrandStory />
        <Footer />
      </main>
    </>
  );
}
