"use client";

import { useEffect, useRef, useState } from "react";
import SiteImage from "./SiteImage";

interface GalleryItem {
  src: string;
  alt: string;
  rotate: string;
}

const galleryImages: GalleryItem[] = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate",  rotate: "-rotate-2" },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums",    rotate: "rotate-1"  },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor",  rotate: "-rotate-1" },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation",       rotate: "rotate-2"  },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums",       rotate: "-rotate-1" },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing",        rotate: "rotate-1"  },
];

function TapedPhotoCard({ src, alt, rotate, index }: GalleryItem & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative mt-14 ${rotate} transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 hover:scale-105 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${index % 3 * 150}ms` }}
    >
      {/* Bar — floats above the image, detached */}
      <div
        className="absolute -top-4 left-0 right-0 h-5 z-10 rounded-sm shadow-md transition-all duration-300"
        style={{
          background: "linear-gradient(to bottom, #888, #555 40%, #3a3a3a)",
        }}
      />
      <div className="absolute -top-4 left-0 right-0 h-5 z-10 rounded-sm bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Photo */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          boxShadow: "0 12px 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 z-[5] bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

        <div className="relative aspect-square w-full">
          <SiteImage
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className="bg-black px-6 md:px-24 lg:px-24 py-12">
      <div className=" mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
          <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-tight uppercase">
            Gallery
          </h2>
        </div>

        {/* Taped photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 max-w-5xl mx-auto">
          {galleryImages.map((image, i) => (
            <TapedPhotoCard key={i} {...image} index={i} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-20">
          <a
            href="/gallery"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-full text-base transition-colors"
          >
            Explore More
          </a>
        </div>
      </div>
    </section>
  );
}
