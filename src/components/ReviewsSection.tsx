"use client";

import { useEffect, useState, useRef } from "react";

interface Review {
  reviewerName: string;
  rating: number;
  text: string;
  date?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#F59E0B" : "none"}
          stroke={i < rating ? "#F59E0B" : "#52525b"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.reviewerName.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 shrink-0 w-[290px] sm:w-[350px] snap-start">
      <Stars rating={review.rating} />
      <p className="text-zinc-300 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
        <div className="w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center font-semibold text-sm shrink-0">
          {initial}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{review.reviewerName}</p>
          {review.date && <p className="text-zinc-500 text-xs">{review.date}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setReviews(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Card width + gap (290px + 24px = 314px on mobile, 350px + 24px = 374px on desktop)
    const scrollAmount = el.clientWidth > 640 ? 374 : 314;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading || reviews.length === 0) return null;

  return (
    <section className="bg-black px-6 md:px-24 lg:px-24 py-12">
      <div className="mx-auto">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
          <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-wide uppercase">
            What Our Students Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Scrollable Track without scrollbar */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 px-4 md:px-0 snap-x snap-mandatory no-scrollbar [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>

        {/* Navigation Buttons Row below the cards */}
        <div className="flex justify-between items-center max-w-5xl mx-auto mt-6 px-4 md:px-0">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none active:scale-95"
            aria-label="Previous review"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-900 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none active:scale-95"
            aria-label="Next review"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
