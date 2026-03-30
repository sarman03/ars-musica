"use client";

import { useRouter } from "next/navigation";
import EditableImage from "../components/EditableImage";
import HeroSlidesManager from "../components/HeroSlidesManager";
import AffiliationsManager from "../components/AffiliationsManager";
import GalleryImagesManager from "../components/GalleryImagesManager";
import GalleryVideosManager from "../components/GalleryVideosManager";
import CoursesManager from "../components/CoursesManager";
import MentorsManager from "../components/MentorsManager";

// ─── Data (mirrored exactly from main site components) ──────────────────────

const galleryImages = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate" },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums" },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor" },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation" },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums" },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing" },
];

const values = [
  { number: "1", title: "Vision", description: "Inspiring a lifelong connection with music. We aim to create a space where every learner discovers the joy, confidence, and purpose that music brings into life." },
  { number: "2", title: "Learning", description: "Structured guidance with creative freedom. Through expert mentorship and a balanced approach, we help students build strong foundations while expressing their individuality." },
  { number: "3", title: "Community", description: "A space where every musician belongs. We foster an inclusive environment where students grow together, share ideas, and support each other\u2019s musical journey." },
  { number: "4", title: "Expression", description: "More than skills \u2014 true artistry. We encourage students to not just learn music, but to feel it, perform it, and make it a meaningful part of their lives." },
];

const stats = [
  { value: "18+", label: "Years in music" },
  { value: "700+", label: "Live Performance" },
  { value: "7+", label: "Courses Offered" },
  { value: "1,000+", label: "Students Trained" },
];

// ─── Dashboard Page ─────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <main className="relative">
      {/* Admin top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-red-700 text-white text-xs font-bold px-2.5 py-1 rounded">
              ADMIN
            </div>
            <span className="text-zinc-400 text-sm">
              Hover over any image to replace it
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-zinc-400 hover:text-white text-sm transition-colors"
            >
              View Live Site
            </a>
            <button
              onClick={handleLogout}
              className="text-zinc-400 hover:text-brand-red text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed top bar */}
      <div className="h-12" />

      {/* ─── Hero Section ─── */}
      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              Hero Carousel
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add, remove, or reorder the slides shown on the homepage hero section.
          </p>
          <HeroSlidesManager />
        </div>
      </section>

      {/* ─── What We Do Section ─── */}
      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              What We Do — Courses
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add, edit, or remove the course cards shown on the homepage. Hover over a card to edit or delete it.
          </p>
          <CoursesManager />
        </div>
      </section>

      {/* ─── Quote Section ─── */}
      <section className="bg-black flex items-end min-h-screen px-6 pb-16">
        <div className="w-full flex flex-col items-center text-center gap-1">
          <p className="font-heading text-brand-red/80 font-semibold text-xl md:text-3xl lg:text-4xl tracking-wide uppercase" style={{ wordSpacing: "2rem" }}>
            Every  Musician  Starts  With  A  Single  Note
          </p>
          <p className="font-heading text-brand-red/30 font-semibold text-xl md:text-3xl lg:text-4xl tracking-wide uppercase" style={{ wordSpacing: "0.3em" }}>
            Practice  Turns  Notes  Into  Music
          </p>
          <p className="font-heading text-brand-red/15 font-semibold text-xl md:text-3xl lg:text-4xl tracking-wide uppercase" style={{ wordSpacing: "0.3em" }}>
            Confidence  Turns  Music  Into Performance
          </p>
        </div>
      </section>

      {/* ─── Home Page Gallery ─── */}
      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              Home Page Gallery
            </h2>
            <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
              {galleryImages.length} IMAGES
            </span>
          </div>
          <p className="text-zinc-500 text-sm mb-6">
            Click on any image to replace it. These are shown on the homepage gallery section.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {galleryImages.map((image, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden border border-zinc-700/40"
              >
                <EditableImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sectionLabel={`Home Gallery — Image ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Page ─── */}
      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              Gallery Page — Photos
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add or remove photos shown on the /gallery page.
          </p>
          <GalleryImagesManager />
        </div>
      </section>

      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              Gallery Page — Videos
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add or remove videos shown on the /gallery page.
          </p>
          <GalleryVideosManager />
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-20">
            <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <div className="flex items-center gap-3">
              <h2 className="text-brand-red font-semibold text-4xl md:text-6xl lg:text-7xl tracking-wide uppercase text-center">
                About Ars Musica
              </h2>
              <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
                1 IMAGE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            {/* Left column */}
            <div className="flex flex-col gap-20">
              {[values[0], values[2]].map((item) => (
                <div key={item.number} className="text-center px-4">
                  <div className="relative inline-block">
                    <span className="text-zinc-700 font-semibold text-8xl md:text-9xl leading-none select-none">
                      {item.number}
                    </span>
                    <h3 className="text-brand-red font-semibold text-xl md:text-2xl uppercase tracking-wide absolute bottom-1 left-1/2 -translate-x-1/2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-[260px] mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Center image */}
            <div className="relative aspect-square rounded-none overflow-hidden mx-auto w-full max-w-[340px]">
              <EditableImage
                src="/logo/logo.jpeg"
                alt="About Ars Musica"
                fill
                className="object-cover"
                sectionLabel="About Section"
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-20">
              {[values[1], values[3]].map((item) => (
                <div key={item.number} className="text-center px-4">
                  <div className="relative inline-block">
                    <span className="text-zinc-700 font-semibold text-8xl md:text-9xl leading-none select-none">
                      {item.number}
                    </span>
                    <h3 className="text-brand-red font-semibold text-xl md:text-2xl uppercase tracking-wide absolute bottom-1 left-1/2 -translate-x-1/2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-[260px] mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="bg-black py-16 px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center py-4">
              <p className="text-zinc-300 font-semibold text-4xl md:text-5xl lg:text-6xl tracking-wide">
                {stat.value}
              </p>
              <p className="text-zinc-400 text-sm md:text-base mt-3 font-normal">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 w-full h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, #3f3f46, transparent)" }} />
      </section>

      {/* ─── Affiliations Section ─── */}
      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              Affiliations
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add or remove affiliation logos shown on the homepage.
          </p>
          <AffiliationsManager />
        </div>
      </section>

      {/* ─── Mentors Section ─── */}
      <section className="bg-black py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 px-6 mb-2">
            <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <h2 className="text-brand-red font-semibold text-2xl tracking-wide uppercase">
              Our Mentors
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add, edit, or remove mentor cards shown on the homepage. Hover over a card to edit or delete it.
          </p>
          <MentorsManager />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-0 pb-16">
        <div className="max-w-6xl mx-auto border-t border-zinc-800 pt-16" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="2" y="8" width="3" height="8" rx="1" fill="currentColor" />
                <rect x="7" y="5" width="3" height="14" rx="1" fill="currentColor" />
                <rect x="12" y="3" width="3" height="18" rx="1" fill="currentColor" />
                <rect x="17" y="6" width="3" height="12" rx="1" fill="currentColor" />
              </svg>
              <span className="text-white font-bold text-lg tracking-wide">
                ARS <span className="text-brand-red">MUSICA</span>
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Your ideas deserve more than a demo.<br />
              Let&apos;s turn them into records that last.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
