import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import QuoteSection from "@/components/QuoteSection";
import GallerySection from "@/components/GallerySection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import MentorsSection from "@/components/MentorsSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <WhatWeDoSection />
      <QuoteSection />
      <GallerySection />
      <AboutSection />
      <StatsSection />
      <MentorsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
