"use client";

import { useRouter } from "next/navigation";
import EditableImage from "../components/EditableImage";
import HeroSlidesManager from "../components/HeroSlidesManager";

// ─── Data (mirrored exactly from main site components) ──────────────────────

const instruments = [
  { title: "Drums", description: "Learn rhythm, timing, drum patterns, fills, and live performance skills. Our classes help students build strong groove and coordination.", imageSrc: "/about_cards/drums.jpeg", imageAlt: "Drum set close-up" },
  { title: "Guitar", description: "Acoustic and electric guitar training covering chords, strumming, scales, riffs, and popular songs for beginners to advanced learners.", imageSrc: "/about_cards/guitar.jpeg", imageAlt: "Person playing guitar" },
  { title: "Vocals", description: "Improve your singing with breathing techniques, pitch control, vocal exercises, and performance training.", imageSrc: "/about_cards/vocals.jpeg", imageAlt: "Young singer in recording studio" },
  { title: "Piano", description: "Learn piano fundamentals including scales, chords, melodies, and music reading with structured lessons.", imageSrc: "/about_cards/piano.jpeg", imageAlt: "Hands playing piano keys" },
  { title: "Keyboard", description: "Electronic keyboard training focusing on melodies, chord progressions, and accompaniment styles.", imageSrc: "/about_cards/keyboard.jpeg", imageAlt: "Person playing electronic keyboard" },
  { title: "Ukulele", description: "A fun and beginner-friendly instrument. Learn chords, strumming patterns, and play your favorite songs quickly.", imageSrc: "/about_cards/ukele.jpeg", imageAlt: "Teacher and student with ukulele" },
  { title: "Exam", description: "We prepare students for graded music exams from Trinity College London, Rockschool London, and ABRSM. These exams allow students to formally validate their skills as they progress.", imageSrc: "/exam.jpg", imageAlt: "Music producer at mixing console" },
  { title: "Online Classes", description: "We offer live, interactive online classes designed to provide the same structured learning experience as in-person sessions, with personalized guidance and regular feedback.", imageSrc: "/about_cards/class.jpeg", imageAlt: "Person attending online music class on laptop" },
];

const galleryImages = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate" },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums" },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor" },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation" },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums" },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing" },
];

const mentors = [
  { name: "Nawin Rai - Ars Musica Academy", description: "He is also an accomplished drummer and percussionist, Nawin performs with well-known rock bands such as Squarez Attached and Esmond Lama. He is regularly invited for collaborations and special sessions with leading bands and artists across the NCR music scene, earning him respect as both a performer and a collaborator.", imageSrc: "/mentors/mentor_1.jpeg", imageAlt: "Nawin Rai playing drums" },
  { name: "Rosemary Deosa \u2013 Co-Founder | Vocal Instructor | Singer | Performer | Songwriter | Composer", description: "Rosemary Deosa is a passionate and accomplished vocalist, performer, and music educator with over 11 years of experience in teaching and live performance. As the Co-Founder of Ars Musica Academy, she plays a vital role in shaping the academy\u2019s artistic vision, nurturing a culture that is student-focused, expressive, and rooted in musical excellence.", imageSrc: "/mentors/mentor_5.jpeg", imageAlt: "Rosemary Deosa performing" },
  { name: "Ranjan Dewan \u2013 Guitar Educator", description: "Ranjan Dewan is a dedicated guitar educator and performer originally from Darjeeling, with over two decades of experience in teaching and performing music. He holds an ATCL certification in Western Classical Guitar from Trinity College London, which laid the foundation for his strong musical training and technical expertise.", imageSrc: "/mentors/mentor_3.jpeg", imageAlt: "Ranjan Dewan with guitar" },
  { name: "Aro Phungshok \u2013 Piano Instructor", description: "Aro Phungshok is a passionate and dedicated piano teacher with a strong commitment to nurturing musical talent and inspiring students through the art of piano. With a warm and encouraging teaching approach, she focuses on helping students develop not only strong technical skills but also confidence, creativity, and a deep appreciation for music.", imageSrc: "/mentors/mentor_2.jpeg", imageAlt: "Aro Phungshok at piano" },
  { name: "Bonita Solomon \u2013 Piano & Music Theory Instructor | Pianist | Vocalist", description: "Bonita Solomon is a passionate musician and dedicated educator with over 18 years of experience in music performance and teaching. A trained pianist and vocalist, Bonita holds certifications from Trinity College London, UK, and has completed Grade 5 in Music Theory from ABRSM, reflecting her strong academic grounding in music.", imageSrc: "/mentors/mentor_4.jpeg", imageAlt: "Bonita Solomon" },
  { name: "Ahao Gachui \u2013 Guitar Instructor", description: "Ahao Gachui is a passionate music educator with over 25 years of experience, specializing in guitar. He holds a Grade 8 Guitar Certification from Trinity College London. With extensive experience performing in gospel and contemporary bands, Ahao brings real-world musical insight into his teaching. He currently serves as Music Director at New Life Church, Gurgaon.", imageSrc: "/mentors/mentor_6.jpg", imageAlt: "Ahao Gachui playing guitar" },
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
            <h2 className="text-brand-red font-semibold text-2xl tracking-tight uppercase">
              Hero Carousel
            </h2>
          </div>
          <p className="text-zinc-500 text-sm px-6 mb-4">
            Add, remove, or reorder the slides shown on the homepage hero section.
          </p>
          <HeroSlidesManager />
        </div>
      </section>

      {/* ─── What We Do Section (sticky card stack) ─── */}
      <section className="bg-black">
        <div className="flex flex-col items-center gap-4 pt-16 pb-2">
          <div className="flex items-center gap-3">
            <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-tight uppercase">
              What We Do
            </h2>
            <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
              {instruments.length} IMAGES
            </span>
          </div>
          <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
        </div>

        {instruments.map((instrument, index) => (
          <div
            key={instrument.title}
            className="sticky top-12"
            style={{ zIndex: index + 2 }}
          >
            <div className="h-screen flex items-center justify-center px-6 md:px-10 py-6">
              <div className="w-full max-w-7xl bg-zinc-900 rounded-3xl flex flex-col md:flex-row h-[88vh]">
                <div className="flex flex-col justify-center gap-6 p-10 md:p-16 md:w-[45%]">
                  <div className="w-10 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
                  <h3 className="text-white font-semibold text-3xl md:text-4xl tracking-tight uppercase">
                    {instrument.title}
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
                    {instrument.description}
                  </p>
                  <span className="border border-zinc-600 text-zinc-300 rounded-full px-6 py-2.5 text-sm w-fit">
                    Contact me
                  </span>
                </div>
                <div className="md:w-[55%] flex items-center p-4 md:p-6">
                  <div className="relative w-full h-80 md:h-[95%] rounded-2xl overflow-hidden">
                    <EditableImage
                      src={instrument.imageSrc}
                      alt={instrument.imageAlt}
                      fill
                      className="object-cover"
                      sectionLabel={`What We Do \u2014 ${instrument.title}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Quote Section ─── */}
      <section className="bg-black flex items-end min-h-screen px-6 pb-16">
        <div className="w-full flex flex-col items-center text-center gap-1">
          <p className="font-heading text-brand-red/80 font-semibold text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
            Every Musician Starts With A Single Note
          </p>
          <p className="font-heading text-brand-red/30 font-semibold text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
            Practice Turns Notes Into Music
          </p>
          <p className="font-heading text-brand-red/15 font-semibold text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
            Confidence Turns Music Into Performance
          </p>
        </div>
      </section>

      {/* ─── Gallery Section ─── */}
      <section className="bg-black px-6 md:px-24 lg:px-24 py-12">
        <div className="mx-auto">
          <div className="mb-10">
            <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <div className="flex items-center gap-3">
              <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-tight uppercase">
                Gallery
              </h2>
              <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
                {galleryImages.length} IMAGES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {galleryImages.map((image, i) => (
              <div key={i} className="relative mt-14">
                <div
                  className="absolute -top-4 left-0 right-0 h-5 z-10 rounded-sm shadow-md"
                  style={{ background: "linear-gradient(to bottom, #888, #555 40%, #3a3a3a)" }}
                />
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)" }}>
                  <div className="relative aspect-square w-full">
                    <EditableImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sectionLabel={`Gallery \u2014 Image ${i + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-20">
            <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <div className="flex items-center gap-3">
              <h2 className="text-brand-red font-semibold text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase text-center">
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
                    <h3 className="text-brand-red font-semibold text-xl md:text-2xl uppercase tracking-tight absolute bottom-1 left-1/2 -translate-x-1/2">
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
                    <h3 className="text-brand-red font-semibold text-xl md:text-2xl uppercase tracking-tight absolute bottom-1 left-1/2 -translate-x-1/2">
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
              <p className="text-zinc-300 font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight">
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

      {/* ─── Mentors Section ─── */}
      <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-[2px] rounded-full mb-6" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
            <div className="flex items-center gap-3">
              <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-tight uppercase">
                Our Mentors
              </h2>
              <span className="bg-red-700/20 text-brand-red text-xs font-bold px-2.5 py-1 rounded">
                {mentors.length} IMAGES
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Row 1: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mentors.slice(0, 3).map((mentor) => (
                <div
                  key={mentor.name}
                  className="bg-zinc-900 rounded-t-[999px] rounded-b-3xl overflow-hidden flex flex-col"
                >
                  <div className="relative w-full aspect-[3/4] rounded-t-[999px] overflow-hidden p-3 pt-4">
                    <div className="relative w-full h-full rounded-t-[999px] overflow-hidden">
                      <EditableImage
                        src={mentor.imageSrc}
                        alt={mentor.imageAlt}
                        fill
                        className="object-cover object-top"
                        sectionLabel={`Mentor \u2014 ${mentor.name.split(" \u2013")[0].split(" -")[0]}`}
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
              ))}
            </div>
            {/* Row 2: 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-[16.67%]">
              {mentors.slice(3).map((mentor) => (
                <div
                  key={mentor.name}
                  className="bg-zinc-900 rounded-t-[999px] rounded-b-3xl overflow-hidden flex flex-col"
                >
                  <div className="relative w-full aspect-[3/4] rounded-t-[999px] overflow-hidden p-3 pt-4">
                    <div className="relative w-full h-full rounded-t-[999px] overflow-hidden">
                      <EditableImage
                        src={mentor.imageSrc}
                        alt={mentor.imageAlt}
                        fill
                        className="object-cover object-top"
                        sectionLabel={`Mentor \u2014 ${mentor.name.split(" \u2013")[0].split(" -")[0]}`}
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
              ))}
            </div>
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
