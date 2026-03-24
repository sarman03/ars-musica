"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 18, suffix: "+", label: "Years in music" },
  { value: 700, suffix: "+", label: "Live Performance" },
  { value: 7, suffix: "+", label: "Courses Offered" },
  { value: 1000, suffix: "+", label: "Students Trained" },
];

function formatNumber(n: number) {
  return n.toLocaleString("en-IN");
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 600;
          const steps = 40;
          const increment = value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <p
      ref={ref}
      className="text-zinc-300 font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight"
    >
      {formatNumber(count)}
      {suffix}
    </p>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-black py-16 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center text-center py-4"
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="text-zinc-400 text-sm md:text-base mt-3 font-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
