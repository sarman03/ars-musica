"use client";

import { useRouter } from "next/navigation";
import EditableImage from "../components/EditableImage";

// ─── Data (mirrored from original components) ───────────────────────────────

const instruments = [
  { title: "Drums", description: "Learn rhythm, timing, drum patterns, fills, and live performance skills. Our classes help students build strong groove and coordination.", imageSrc: "/drums.jpg", imageAlt: "Drum set close-up" },
  { title: "Guitar", description: "Acoustic and electric guitar training covering chords, strumming, scales, riffs, and popular songs for beginners to advanced learners.", imageSrc: "/guitar.jpg", imageAlt: "Person playing guitar" },
  { title: "Vocals", description: "Improve your singing with breathing techniques, pitch control, vocal exercises, and performance training.", imageSrc: "/vocals.jpg", imageAlt: "Young singer in recording studio" },
  { title: "Piano", description: "Learn piano fundamentals including scales, chords, melodies, and music reading with structured lessons.", imageSrc: "/piano.jpg", imageAlt: "Hands playing piano keys" },
  { title: "Keyboard", description: "Electronic keyboard training focusing on melodies, chord progressions, and accompaniment styles.", imageSrc: "/keyboard.jpg", imageAlt: "Person playing electronic keyboard" },
  { title: "Ukulele", description: "A fun and beginner-friendly instrument. Learn chords, strumming patterns, and play your favorite songs quickly.", imageSrc: "/ukulele.jpg", imageAlt: "Teacher and student with ukulele" },
  { title: "Exam", description: "We prepare students for graded music exams from Trinity College London, Rockschool London, and ABRSM.", imageSrc: "/exam.jpg", imageAlt: "Music producer at mixing console" },
];

const galleryImages = [
  { src: "/gallery/gallery-1.jpg", alt: "Student receiving certificate" },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums" },
  { src: "/gallery/gallery-3.jpg", alt: "Student with music instructor" },
  { src: "/gallery/gallery-4.jpg", alt: "Certificate presentation" },
  { src: "/gallery/gallery-5.jpg", alt: "Student practicing drums" },
  { src: "/gallery/gallery-6.jpg", alt: "Young singer performing" },
];

const mentors = [
  { name: "Nawin Rai - Ars Musica Academy", description: "He is also an accomplished drummer and percussionist...", imageSrc: "/mentors/nawin.jpg", imageAlt: "Nawin Rai playing drums" },
  { name: "Aro Phungshok – Piano Instructor", description: "Aro Phungshok is a passionate and dedicated piano teacher...", imageSrc: "/mentors/aro.jpg", imageAlt: "Aro Phungshok at piano" },
  { name: "Ranjan Dewan – Guitar Educator", description: "Ranjan Dewan is a dedicated guitar educator and performer...", imageSrc: "/mentors/ranjan.jpg", imageAlt: "Ranjan Dewan with guitar" },
];

const values = [
  { number: "1", title: "Vision", description: "Every record begins with a clear vision. I shape raw ideas into music that feels intentional, timeless, and emotionally powerful." },
  { number: "2", title: "Craft", description: "Details matter. From sound design to final polish, I approach every track with precision and care that makes the music shine." },
  { number: "3", title: "Trust", description: "Collaboration only works with trust. I keep communication open, deadlines tight, and always deliver what I promise without compromise." },
  { number: "4", title: "Energy", description: "Music should move people. I focus on creating productions that carry energy — tracks that connect instantly and stay with listeners." },
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

      {/* ─── Hero Section (no images, just mirrored) ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/20 rounded-full blur-[120px]" />
        <div className="relative z-[1] flex flex-col items-center gap-8 mt-16">
          <h1 className="flex flex-col gap-0 leading-none">
            <span className="text-brand-red font-black text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase">
              Learn Music
            </span>
            <span className="text-brand-red font-black text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase">
              Play with Confidence
            </span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
            Learn instruments and vocals with experienced teachers in a creative
            and inspiring environment.
          </p>
          <span className="bg-red-700 text-white font-semibold px-8 py-3.5 rounded-lg text-base">
            Let&apos;s Talk Music
          </span>
        </div>
        {/* Section label */}
        <div className="absolute bottom-4 left-4 bg-zinc-800/80 text-zinc-400 text-xs px-3 py-1.5 rounded-lg">
          Hero Section — No images
        </div>
      </section>

      {/* ─── What We Do Section ─── */}
      <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="flex items-center gap-3">
            <h2 className="text-brand-red font-black text-4xl md:text-6xl tracking-tight uppercase">
              What We Do
            </h2>
            <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
              7 IMAGES
            </span>
          </div>
          <div className="w-12 h-[3px] bg-white rounded-full" />
        </div>

        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {instruments.map((instrument) => (
            <div
              key={instrument.title}
              className="flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
            >
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12 md:w-1/2">
                <div className="w-12 h-[3px] bg-white rounded-full" />
                <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase">
                  {instrument.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  {instrument.description}
                </p>
              </div>
              <div className="relative md:w-1/2 h-64 md:h-auto min-h-[300px]">
                <EditableImage
                  src={instrument.imageSrc}
                  alt={instrument.imageAlt}
                  fill
                  className="object-cover"
                  sectionLabel={`What We Do — ${instrument.title}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quote Section (no images) ─── */}
      <section className="bg-black flex items-center justify-center py-24 px-6">
        <div className="flex flex-col items-center text-center gap-1">
          <p className="text-brand-red font-black text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
            Every Musician Starts With A Single Note
          </p>
          <p className="text-brand-red/70 font-black text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
            Practice Turns Notes Into Music
          </p>
          <p className="text-brand-red/50 font-black text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
            Confidence Turns Music Into Performance
          </p>
        </div>
      </section>

      {/* ─── Gallery Section ─── */}
      <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="w-12 h-[3px] bg-white rounded-full mb-4" />
            <div className="flex items-center gap-3">
              <h2 className="text-white font-black text-3xl md:text-4xl tracking-tight uppercase">
                Gallery
              </h2>
              <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
                6 IMAGES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800"
              >
                <EditableImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sectionLabel={`Gallery — Image ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="bg-zinc-950 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-16">
            <div className="w-12 h-[3px] bg-white rounded-full" />
            <div className="flex items-center gap-3">
              <h2 className="text-center">
                <span className="text-brand-red font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase">
                  About{" "}
                </span>
                <span className="text-zinc-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase">
                  Ars Musica
                </span>
              </h2>
              <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
                1 IMAGE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left column */}
            <div className="flex flex-col gap-16">
              {[values[0], values[2]].map((item) => (
                <div key={item.number} className="text-center">
                  <div className="relative inline-block">
                    <span className="text-zinc-800 font-black text-7xl md:text-8xl leading-none">
                      {item.number}
                    </span>
                    <h3 className="text-brand-red font-black text-xl md:text-2xl uppercase tracking-tight absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Center image — EDITABLE */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-red-700 mx-auto w-full max-w-[300px]">
              <EditableImage
                src="/about.jpg"
                alt="About Ars Musica"
                fill
                className="object-cover"
                sectionLabel="About Section"
              />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-16">
              {[values[1], values[3]].map((item) => (
                <div key={item.number} className="text-center">
                  <div className="relative inline-block">
                    <span className="text-zinc-800 font-black text-7xl md:text-8xl leading-none">
                      {item.number}
                    </span>
                    <h3 className="text-brand-red font-black text-xl md:text-2xl uppercase tracking-tight absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section (no images) ─── */}
      <section className="bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5+", label: "Years in music" },
              { value: "50+", label: "Live Performance" },
              { value: "7+", label: "Courses Offered" },
              { value: "500+", label: "Students Trained" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-zinc-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-sm md:text-base mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mentors Section ─── */}
      <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-16">
            <div className="w-12 h-[3px] bg-white rounded-full" />
            <div className="flex items-center gap-3">
              <h2 className="text-center">
                <span className="text-brand-red font-black text-4xl md:text-5xl tracking-tight uppercase">
                  Our Ment
                </span>
                <span className="text-zinc-500 font-black text-4xl md:text-5xl tracking-tight uppercase">
                  ors
                </span>
              </h2>
              <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
                3 IMAGES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.name}
                className="bg-zinc-900/50 border border-zinc-800 rounded-t-[80px] rounded-b-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-72 mx-4 mt-4 rounded-t-[72px] overflow-hidden">
                  <EditableImage
                    src={mentor.imageSrc}
                    alt={mentor.imageAlt}
                    fill
                    className="object-cover"
                    sectionLabel={`Mentor — ${mentor.name.split(" –")[0].split(" -")[0]}`}
                  />
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="w-8 h-[2px] bg-white rounded-full" />
                  <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight leading-tight">
                    {mentor.name}
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                    {mentor.description}
                  </p>
                  <div className="w-6 h-[1px] bg-zinc-600 rounded-full mt-auto" />
                </div>
              </div>
            ))}
          </div>
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
