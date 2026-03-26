"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import WaveBars from "@/components/WaveBars"

interface Slide {
  src: string
  alt: string
}

const DEFAULT_SLIDES: Slide[] = [
  { src: "/hero/AAAArs.png", alt: "Ars Musica Academy" },
  { src: "/hero/coming soon.png", alt: "Summer Camp Coming Soon" },
]

export default function HeroSection() {
  const [show, setShow] = useState(false)
  const [current, setCurrent] = useState(0)
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Fetch slides from API
  useEffect(() => {
    fetch("/api/hero-slides")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data)
        }
      })
      .catch(() => {})
  }, [])

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next, slides.length])

  return (
    <section className="relative flex flex-col items-center min-h-screen bg-black text-center overflow-hidden">
      {/* Image Carousel — full width, starts right below navbar */}
      <div className="relative w-full flex-1 mt-16 md:mt-[72px]">
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                unoptimized={slide.src.startsWith("http")}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Slide indicators — inside carousel */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-white w-6" : "bg-white/40 w-2"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA Button */}
      <div className="relative z-[2] mt-6">
        <a
          href="/contact"
          className={`bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-full text-base transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[400ms] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Let&apos;s Talk Music
        </a>
      </div>

      {/* Animated wave bars at bottom — mobile version */}
      <div
        className={`md:hidden relative z-[2] mt-6 mb-4 h-16 w-[85%] transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[600ms] ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <WaveBars
          color="#52525b"
          bars={20}
          gap={10}
          minHeightPct={0.15}
          maxHeightPct={0.85}
          speed={0.4}
          stagger={0.55}
          opacity={1}
        />
      </div>

      {/* Animated wave bars at bottom — desktop version */}
      <div
        className={`hidden md:block relative z-[2] mt-6 mb-4 h-16 w-[55%] transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[600ms] ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <WaveBars
          color="#52525b"
          bars={36}
          gap={16}
          minHeightPct={0.15}
          maxHeightPct={0.85}
          speed={0.4}
          stagger={0.55}
          opacity={1}
        />
      </div>
    </section>
  )
}
