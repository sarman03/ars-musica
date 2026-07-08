"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const DEFAULT_VIDEOS = [
  "https://evvnbosyzxickfzxumai.supabase.co/storage/v1/object/public/assets/gallery-videos/VID-20230718-WA0002_1.mp4",
  "https://evvnbosyzxickfzxumai.supabase.co/storage/v1/object/public/assets/gallery-videos/VID-20230718-WA0002_2.mp4",
  "https://evvnbosyzxickfzxumai.supabase.co/storage/v1/object/public/assets/gallery-videos/IMG_1865.mp4",
];

const DEFAULT_IMAGES = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate", displayMode: "fill-box" as const },
  // { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums" },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing", displayMode: "fill-box" as const },
];

interface GalleryImage {
  src: string;
  alt: string;
  displayMode?: "fill-box" | "show-full-image";
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function VideoCarousel({ videosHeading, videos }: { videosHeading: { ref: React.RefObject<HTMLDivElement | null>; visible: boolean }; videos: string[] }) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const prevActiveRef = useRef(active);

  const prev = (active - 1 + videos.length) % videos.length;
  const next = (active + 1) % videos.length;

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const handleEnded = useCallback(() => {
    setActive((a) => (a + 1) % videos.length);
  }, [videos.length]);

  // Reset play state when active video changes
  useEffect(() => {
    setIsPlaying(false);
  }, [active]);

  // Pause video when section goes out of view
  useEffect(() => {
    if (!inView) {
      setIsPlaying(false);
    }
  }, [inView]);

  // Detect when section enters viewport — lazy load videos
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setHasBeenInView(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Control playback and audio — only play the active video when isPlaying is true
  useEffect(() => {
    if (!hasBeenInView) return;
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === active) {
        if (prevActiveRef.current !== active) {
          vid.currentTime = 0;
          prevActiveRef.current = active;
        }
        if (isPlaying && inView) {
          vid.muted = false;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        vid.muted = true;
        vid.pause();
      }
    });
  }, [active, isPlaying, inView, hasBeenInView]);

  return (
    <div ref={sectionRef} className="py-16 w-full">
      <div
        ref={videosHeading.ref}
        className={`text-center mb-10 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          videosHeading.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-white font-semibold text-2xl md:text-3xl tracking-wide uppercase">
          Videos
        </h2>
      </div>

      {/* Carousel: prev | center | next */}
      <div className="relative flex items-center justify-center w-full px-2 md:px-4 gap-3 md:gap-5">
        {/* Previous (left) */}
        <div
          onClick={() => goTo(prev)}
          className="hidden md:block flex-shrink-0 w-[20%] aspect-video bg-zinc-900 rounded-2xl border border-zinc-700/40 overflow-hidden cursor-pointer opacity-50 hover:opacity-70 transition-all duration-500 scale-90"
        >
          {hasBeenInView && (
            <video
              ref={(el) => { videoRefs.current[prev] = el; }}
              src={videos[prev]}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
          )}
        </div>

        {/* Center (active) */}
        <div className="relative w-full max-w-2xl mx-auto md:max-w-none md:flex-1 aspect-video bg-zinc-900 rounded-2xl border border-zinc-700/40 overflow-hidden transition-all duration-500">
          {hasBeenInView && (
            <video
              ref={(el) => { videoRefs.current[active] = el; }}
              key={`center-${active}`}
              src={videos[active]}
              className="w-full h-full object-cover"
              playsInline
              preload="auto"
              onEnded={handleEnded}
            />
          )}

          {/* Play/Pause Button Overlay */}
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/35 transition-all duration-300 cursor-pointer group z-20"
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 transform ${isPlaying ? "opacity-0 group-hover:opacity-100 scale-90 hover:scale-100" : "opacity-100 scale-100 hover:scale-110"}`}>
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white translate-x-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* Navigation arrows */}
          {videos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(prev); }}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all"
                aria-label="Previous video"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goTo(next); }}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all"
                aria-label="Next video"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Next (right) */}
        <div
          onClick={() => goTo(next)}
          className="hidden md:block flex-shrink-0 w-[20%] aspect-video bg-zinc-900 rounded-2xl border border-zinc-700/40 overflow-hidden cursor-pointer opacity-50 hover:opacity-70 transition-all duration-500 scale-90"
        >
          {hasBeenInView && (
            <video
              ref={(el) => { videoRefs.current[next] = el; }}
              src={videos[next]}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active ? "bg-white w-6" : "bg-zinc-600 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function GalleryPageContent() {
  const heading = useReveal();
  const photosHeading = useReveal();
  const videosHeading = useReveal();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[] | null>(null);
  const [videoUrls, setVideoUrls] = useState<string[] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery-images")
      .then((res) => res.json())
      .then((data) => {
        setGalleryImages(Array.isArray(data) && data.length > 0 ? data : DEFAULT_IMAGES);
      })
      .catch(() => setGalleryImages(DEFAULT_IMAGES));

    fetch("/api/gallery-videos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVideoUrls(data.map((v: { src: string }) => v.src));
        } else {
          setVideoUrls(DEFAULT_VIDEOS);
        }
      })
      .catch(() => setVideoUrls(DEFAULT_VIDEOS));
  }, []);

  const showPrevImage = useCallback(() => {
    if (activeImageIndex === null || !galleryImages) return;
    setActiveImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [activeImageIndex, galleryImages]);

  const showNextImage = useCallback(() => {
    if (activeImageIndex === null || !galleryImages) return;
    setActiveImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex + 1) % galleryImages.length;
    });
  }, [activeImageIndex, galleryImages]);

  // Keyboard navigation
  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, showPrevImage, showNextImage]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  // Touch handlers for swipe navigation
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      showNextImage();
    } else if (diff < -threshold) {
      showPrevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const images = galleryImages ?? [];
  const topRow = [...images, ...images];
  const bottomRow = [...images.slice().reverse(), ...images.slice().reverse()];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Page heading */}
      <div className="px-6 md:px-16 lg:px-24 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <div
            ref={heading.ref}
            className={`transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              heading.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <div
              className="w-12 h-[2px] rounded-full mb-6"
              style={{ background: "linear-gradient(to right, transparent, white, transparent)" }}
            />
            <h1 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-wide uppercase">
              Gallery
            </h1>
          </div>
        </div>
      </div>

      {/* ─── Photos ─── */}
      <div className="py-12 overflow-hidden">
        <div
          ref={photosHeading.ref}
          className={`text-center mb-10 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            photosHeading.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-white font-semibold text-2xl md:text-3xl tracking-wide uppercase">
            Photos
          </h2>
        </div>

        {/* Top row — right to left */}
        <div className="relative w-full mb-2">
          <div className="flex w-max animate-marquee-slow gap-2">
            {topRow.map((img, i) => (
              <div
                key={`top-${i}`}
                onClick={() => setActiveImageIndex(i % images.length)}
                className="flex-shrink-0 w-[200px] md:w-[260px] aspect-square relative overflow-hidden rounded-lg cursor-pointer group/photo"
                style={{ backgroundColor: img.displayMode === "show-full-image" ? "#000" : undefined }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 200px, 260px"
                  className={`absolute inset-0 transition-transform duration-500 group-hover/photo:scale-105 ${img.displayMode === "show-full-image" ? "object-contain object-center" : "object-cover"}`}
                  priority={i < 4}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — left to right */}
        <div className="relative w-full">
          <div className="flex w-max animate-marquee-slow-reverse gap-2">
            {bottomRow.map((img, i) => (
              <div
                key={`bottom-${i}`}
                onClick={() => setActiveImageIndex(images.length - 1 - (i % images.length))}
                className="flex-shrink-0 w-[200px] md:w-[260px] aspect-square relative overflow-hidden rounded-lg cursor-pointer group/photo"
                style={{ backgroundColor: img.displayMode === "show-full-image" ? "#000" : undefined }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 200px, 260px"
                  className={`absolute inset-0 transition-transform duration-500 group-hover/photo:scale-105 ${img.displayMode === "show-full-image" ? "object-contain object-center" : "object-cover"}`}
                  priority={i < 4}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Videos ─── */}
      {videoUrls && videoUrls.length > 0 && (
        <VideoCarousel videosHeading={videosHeading} videos={videoUrls} />
      )}

      {/* ─── Lightbox Modal ─── */}
      {activeImageIndex !== null && galleryImages && (
        <div 
          onClick={() => setActiveImageIndex(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 backdrop-blur-xl transition-all duration-300 py-6 md:py-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Close Button */}
          <div className="w-full flex justify-end px-6 md:px-10 z-55">
            <button
              onClick={() => setActiveImageIndex(null)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Main Content Area (Image + Floating Navigation Arrows) */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4 md:px-20">
            {/* Left Floating Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
              className="absolute left-4 md:left-8 z-55 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:bg-white/5 md:hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer focus:outline-none hover:scale-105"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Image Wrapper */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] h-[70vh] md:h-[78vh] select-none"
            >
              <Image
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].alt}
                fill
                sizes="(max-width: 768px) 90vw, 85vw"
                className="object-contain rounded-lg shadow-2xl transition-all duration-300"
                priority
              />
            </div>

            {/* Right Floating Arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); showNextImage(); }}
              className="absolute right-4 md:right-8 z-55 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:bg-white/5 md:hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer focus:outline-none hover:scale-105"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Bottom Bar (Counter) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full text-center px-6 mt-4 z-55"
          >
            <p className="text-white/40 text-xs md:text-sm tracking-wider">
              {activeImageIndex + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
