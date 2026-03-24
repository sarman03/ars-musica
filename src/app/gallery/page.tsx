import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-24">
        <GallerySection />
      </div>
      <Footer />
    </main>
  );
}
