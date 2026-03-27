"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_AFFILIATIONS = [
  { src: "/affiliation/abrsm.png", alt: "ABRSM" },
  { src: "/affiliation/trinity.png", alt: "Trinity College London" },
  { src: "/affiliation/rockschool.png", alt: "Rockschool" },
  { src: "/affiliation/trinity2.png", alt: "Trinity College London Registered" },
];

interface Affiliation {
  src: string;
  alt: string;
}

export default function AffiliationSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [affiliations, setAffiliations] = useState<Affiliation[] | null>(null);

  useEffect(() => {
    fetch("/api/affiliations")
      .then((res) => res.json())
      .then((data) => {
        setAffiliations(Array.isArray(data) && data.length > 0 ? data : DEFAULT_AFFILIATIONS);
      })
      .catch(() => setAffiliations(DEFAULT_AFFILIATIONS));
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeadingVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Duplicate items for seamless loop
  const resolved = affiliations ?? [];
  const items = [...resolved, ...resolved];

  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          ref={headingRef}
          className={`mb-16 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="w-12 h-[2px] rounded-full mb-6" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
          <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-tight uppercase">
            Our Affiliations
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-4 max-w-xl">
            Our Programmes are delivered by experienced, certified instructors.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 " />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 " />

        <div className="flex w-max animate-marquee gap-8">
          {items.map((item, i) => (
            <div
              key={`${item.alt}-${i}`}
              className="flex-shrink-0 w-[280px] md:w-[340px] aspect-[4/3] bg-zinc-900 rounded-3xl border border-zinc-800 p-4 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
