"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_VIDEOS = [
  "https://evvnbosyzxickfzxumai.supabase.co/storage/v1/object/public/assets/gallery-videos/VID-20230718-WA0002_1.mp4",
  "https://evvnbosyzxickfzxumai.supabase.co/storage/v1/object/public/assets/gallery-videos/VID-20230718-WA0002_2.mp4",
  "https://evvnbosyzxickfzxumai.supabase.co/storage/v1/object/public/assets/gallery-videos/IMG_1865.mp4",
];

const DEFAULT_IMAGES = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate" },
  // { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums" },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor" },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation" },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums" },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing" },
];

interface GalleryImage {
  src: string;
  alt: string;
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

  const prev = (active - 1 + videos.length) % videos.length;
  const next = (active + 1) % videos.length;

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const handleEnded = useCallback(() => {
    setActive((a) => (a + 1) % videos.length);
  }, [videos.length]);

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

  // Control playback and audio — only play the active video
  useEffect(() => {
    if (!hasBeenInView) return;
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === active) {
        vid.muted = !inView;
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.muted = true;
        vid.pause();
      }
    });
  }, [active, inView, hasBeenInView]);

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
          className="flex-shrink-0 w-[20%] aspect-video bg-zinc-900 rounded-2xl border border-zinc-700/40 overflow-hidden cursor-pointer opacity-50 hover:opacity-70 transition-all duration-500 scale-90"
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
        <div className="relative flex-1 aspect-video bg-zinc-900 rounded-2xl border border-zinc-700/40 overflow-hidden transition-all duration-500">
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

          {/* Navigation arrows */}
          {videos.length > 1 && (
            <>
              <button
                onClick={() => goTo(prev)}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all"
                aria-label="Previous video"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => goTo(next)}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all"
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
          className="flex-shrink-0 w-[20%] aspect-video bg-zinc-900 rounded-2xl border border-zinc-700/40 overflow-hidden cursor-pointer opacity-50 hover:opacity-70 transition-all duration-500 scale-90"
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
          <div className="flex w-max animate-marquee gap-2">
            {topRow.map((img, i) => (
              <div
                key={`top-${i}`}
                className="flex-shrink-0 w-[200px] md:w-[260px] aspect-square relative overflow-hidden rounded-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — left to right */}
        <div className="relative w-full">
          <div className="flex w-max animate-marquee-reverse gap-2">
            {bottomRow.map((img, i) => (
              <div
                key={`bottom-${i}`}
                className="flex-shrink-0 w-[200px] md:w-[260px] aspect-square relative overflow-hidden rounded-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover"
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
    </section>
  );
}
