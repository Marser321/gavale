import UrgencyBar from './components/UrgencyBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductSpotlight from './components/ProductSpotlight';
import FeatureGrid from './components/FeatureGrid';
import GallerySection from './components/GallerySection';
import ConversionZone from './components/ConversionZone';
import RealityWall from './components/RealityWall';
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
        <ConversionZone />
        <ProductSpotlight />
        <FeatureGrid />
        <GallerySection />
        <RealityWall />
        <Footer />
      </main>
    </>
  );
}
