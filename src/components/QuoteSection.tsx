"use client";

import { useEffect, useRef, useState } from "react";

const lines = [
  "Every Musician Starts With A Single Note",
  "Practice Turns Notes Into Music",
  "Confidence Turns Music Into Performance",
];

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.min(0.999, Math.max(0, -rect.top / scrollableHeight));

      const index = Math.min(lines.length - 1, Math.floor(progress * lines.length));
      console.log("QuoteSection scroll:", { rectTop: rect.top, rectHeight: rect.height, scrollableHeight, progress, index, activeIndex });
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-black relative px-6" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-3">
          {lines.map((line, i) => (
            <p
              key={i}
              className="font-heading font-semibold text-xl md:text-3xl lg:text-4xl tracking-wide uppercase transition-opacity duration-500"
              style={{
                color: "var(--color-brand-red)",
                opacity: i === activeIndex ? 0.9 : 0.12,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
