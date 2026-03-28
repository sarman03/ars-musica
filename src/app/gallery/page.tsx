import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryPageContent from "@/components/GalleryPageContent";
import LightRaysBackground from "@/components/LightRaysBackground";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos and videos from Ars Musica Academy — performances, classes, events, and student showcases in Gurgaon.",
  alternates: {
    canonical: "https://arsmusicaacademy.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main className="relative bg-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRaysBackground intensity={0.5} />
      </div>
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24">
          <GalleryPageContent />
        </div>
        <Footer />
      </div>
    </main>
  );
}
