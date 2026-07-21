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
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicSchool",
  name: "Ars Musica Academy",
  url: "https://arsmusicaacademy.com",
  logo: "https://arsmusicaacademy.com/logo/logo.jpeg",
  image: "https://arsmusicaacademy.com/logo/logo.jpeg",
  description:
    "Professional music classes in Gurgaon — Guitar, Piano, Drums, Vocals, Keyboard, Ukulele & more. Trinity, Rockschool & ABRSM exam preparation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-8, Pocket C, Mayfield Garden, Sector 50",
    addressLocality: "Gurugram",
    postalCode: "122018",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.425366,
    longitude: 77.0562705,
  },
  sameAs: [
    "https://www.instagram.com/arsmusica.academy",
    "https://www.youtube.com/@Arsmusicaacademy",
    "https://www.facebook.com/profile.php?id=61579686133656",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Music Courses",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Guitar Classes" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Piano Classes" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Drums Classes" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Vocal Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Keyboard Classes" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Ukulele Classes" } },
    ],
  },
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <AffiliationSection />
      <StatsSection />
      <WhatWeDoSection />
      <QuoteSection />
      <div className="relative z-[2]">
        <MentorsSection />
        <AboutSection />
        <GallerySection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
        <MapSection />
        <Footer />
      </div>
    </main>
  );
}
