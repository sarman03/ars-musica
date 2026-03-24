"use client";

import SiteImage from "./SiteImage";
import { useEffect, useRef, useState } from "react";

const mentors = [
  {
    name: "Nawin Rai - Ars Musica Academy",
    description:
      "He is also an accomplished drummer and percussionist, Nawin performs with well-known rock bands such as Squarez Attached and Esmond Lama. He is regularly invited for collaborations and special sessions with leading bands and artists across the NCR music scene, earning him respect as both a performer and a collaborator.",
    imageSrc: "/mentors/mentor_1.jpeg",
    imageAlt: "Nawin Rai playing drums",
  },
  {
    name: "Rosemary Deosa \u2013 Co-Founder | Vocal Instructor | Singer | Performer | Songwriter | Composer",
    description:
      "Rosemary Deosa is a passionate and accomplished vocalist, performer, and music educator with over 11 years of experience in teaching and live performance. As the Co-Founder of Ars Musica Academy, she plays a vital role in shaping the academy's artistic vision, nurturing a culture that is student-focused, expressive, and rooted in musical excellence.",
    imageSrc: "/mentors/mentor_5.jpeg",
    imageAlt: "Rosemary Deosa performing",
  },
  {
    name: "Ranjan Dewan \u2013 Guitar Educator",
    description:
      "Ranjan Dewan is a dedicated guitar educator and performer originally from Darjeeling, with over two decades of experience in teaching and performing music. He holds an ATCL certification in Western Classical Guitar from Trinity College London, which laid the foundation for his strong musical training and technical expertise.",
    imageSrc: "/mentors/mentor_3.jpeg",
    imageAlt: "Ranjan Dewan with guitar",
  },
  {
    name: "Aro Phungshok \u2013 Piano Instructor",
    description:
      "Aro Phungshok is a passionate and dedicated piano teacher with a strong commitment to nurturing musical talent and inspiring students through the art of piano. With a warm and encouraging teaching approach, she focuses on helping students develop not only strong technical skills but also confidence, creativity, and a deep appreciation for music.",
    imageSrc: "/mentors/mentor_2.jpeg",
    imageAlt: "Aro Phungshok at piano",
  },
  {
    name: "Bonita Solomon \u2013 Piano & Music Theory Instructor | Pianist | Vocalist",
    description:
      "Bonita Solomon is a passionate musician and dedicated educator with over 18 years of experience in music performance and teaching. A trained pianist and vocalist, Bonita holds certifications from Trinity College London, UK, and has completed Grade 5 in Music Theory from ABRSM, reflecting her strong academic grounding in music.",
    imageSrc: "/mentors/mentor_4.jpeg",
    imageAlt: "Bonita Solomon",
  },
  {
    name: "Ahao Gachui \u2013 Guitar Instructor",
    description:
      "Ahao Gachui is a passionate music educator with over 25 years of experience, specializing in guitar. He holds a Grade 8 Guitar Certification from Trinity College London. With extensive experience performing in gospel and contemporary bands, Ahao brings real-world musical insight into his teaching. He currently serves as Music Director at New Life Church, Gurgaon.",
    imageSrc: "/mentors/mentor_6.jpg",
    imageAlt: "Ahao Gachui playing guitar",
  },
];

// Stagger offsets in px — middle card starts lower, side cards higher
const staggerOffsets = [-60, 40, 100];
const staggerOffsetsRow2 = [-60, 40, 100];

function MentorCard({
  mentor,
  initialOffset,
  delay = 0,
}: {
  mentor: (typeof mentors)[0];
  initialOffset: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(initialOffset);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (windowH - rect.top) / (windowH * 0.6))
      );
      setOffset(initialOffset * (1 - progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialOffset]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-zinc-900 rounded-t-[999px] rounded-b-3xl overflow-hidden flex flex-col transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: `translateY(${visible ? offset : offset + 60}px)`, transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-full aspect-[3/4] rounded-t-[999px] overflow-hidden p-3 pt-4">
        <div className="relative w-full h-full rounded-t-[999px] overflow-hidden">
          <SiteImage
            src={mentor.imageSrc}
            alt={mentor.imageAlt}
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="w-8 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
        <h3 className="text-white font-semibold text-sm md:text-base uppercase tracking-tight leading-snug">
          {mentor.name}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {mentor.description}
        </p>
        <div className="w-6 h-[1px] rounded-full mt-2" style={{ background: "linear-gradient(to right, transparent, #52525b, transparent)" }} />
      </div>
    </div>
  );
}

export default function MentorsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadingVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
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
            Our Mentors
          </h2>
        </div>

        {/* Mentor cards — row 1: 3 cards, row 2: 3 cards */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.slice(0, 3).map((mentor, i) => (
              <MentorCard
                key={mentor.name}
                mentor={mentor}
                initialOffset={staggerOffsets[i]}
                delay={i * 150}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.slice(3).map((mentor, i) => (
              <MentorCard
                key={mentor.name}
                mentor={mentor}
                initialOffset={staggerOffsetsRow2[i]}
                delay={i * 150}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
