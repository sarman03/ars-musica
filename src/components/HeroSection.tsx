"use client"

import WaveBars from "@/components/WaveBars"
import LightRaysBackground from "@/components/LightRaysBackground"

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-center px-4 overflow-hidden">
      <LightRaysBackground intensity={0.7} speed={1} />

      <div className="relative z-[1] flex flex-col items-center gap-6 mt-16">
        <h1 className="flex flex-col gap-0 leading-none text-center">
          <span className="text-brand-red font-black tracking-tight uppercase" style={{ fontSize: "clamp(2rem, 5.8vw, 5.8rem)", fontWeight: 900 }}>
            Learn Music
          </span>
          <span className="text-brand-red font-black tracking-tight uppercase" style={{ fontSize: "clamp(2rem, 5.8vw, 5.8rem)", fontWeight: 900 }}>
            Play with Confidence
          </span>
        </h1>

        <p className="text-zinc-300 text-base md:text-lg max-w-lg leading-relaxed">
          Learn instruments and vocals with experienced teachers in a creative
          and inspiring environment.
        </p>

        <a
          href="#contact"
          className="bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-full text-base transition-colors mt-2"
        >
          Let&apos;s Talk Music
        </a>
      </div>

      {/* Animated wave bars at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-[55%]">
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
