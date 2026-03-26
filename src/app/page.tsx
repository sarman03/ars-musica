import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import QuoteSection from "@/components/QuoteSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import AffiliationSection from "@/components/AffiliationSection";
import MentorsSection from "@/components/MentorsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <WhatWeDoSection />
      <QuoteSection />
      <div className="relative z-[2]">
        <GallerySection />
        <AboutSection />
        <StatsSection />
        <AffiliationSection />
        <MentorsSection />
        <FaqSection />
        <ContactSection />
        <MapSection />
        <Footer />
      </div>
    </main>
  );
}
