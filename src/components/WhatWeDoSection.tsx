import InstrumentCard from "./InstrumentCard";

const instruments = [
  {
    title: "Drums",
    description:
      "Learn rhythm, timing, drum patterns, fills, and live performance skills. Our classes help students build strong groove and coordination.",
    imageSrc: "/about_cards/drums.jpeg",
    imageAlt: "Drum set close-up",
  },
  {
    title: "Guitar",
    description:
      "Acoustic and electric guitar training covering chords, strumming, scales, riffs, and popular songs for beginners to advanced learners.",
    imageSrc: "/about_cards/guitar.jpeg",
    imageAlt: "Person playing guitar",
  },
  {
    title: "Vocals",
    description:
      "Improve your singing with breathing techniques, pitch control, vocal exercises, and performance training.",
    imageSrc: "/about_cards/vocals.jpeg",
    imageAlt: "Young singer in recording studio",
  },
  {
    title: "Piano",
    description:
      "Learn piano fundamentals including scales, chords, melodies, and music reading with structured lessons.",
    imageSrc: "/about_cards/piano.jpeg",
    imageAlt: "Hands playing piano keys",
  },
  {
    title: "Keyboard",
    description:
      "Electronic keyboard training focusing on melodies, chord progressions, and accompaniment styles.",
    imageSrc: "/about_cards/keyboard.jpeg",
    imageAlt: "Person playing electronic keyboard",
  },
  {
    title: "Ukulele",
    description:
      "A fun and beginner-friendly instrument. Learn chords, strumming patterns, and play your favorite songs quickly.",
    imageSrc: "/about_cards/ukele.jpeg",
    imageAlt: "Teacher and student with ukulele",
  },
  {
    title: "Exam",
    description:
      "We prepare students for graded music exams from Trinity College London, Rockschool London, and ABRSM. These exams allow students to formally validate their skills as they progress.",
    imageSrc: "/exam.jpg",
    imageAlt: "Music producer at mixing console",
  },
  {
    title: "Online Classes",
    description:
      "We offer live, interactive online classes designed to provide the same structured learning experience as in-person sessions, with personalized guidance and regular feedback.",
    imageSrc: "/about_cards/class.jpeg",
    imageAlt: "Person attending online music class on laptop",
  }
];

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="bg-black">
      {/* Section heading */}
      <div className="flex flex-col items-center gap-4 pt-16 pb-2">
        <h2 className="text-brand-red font-semibold text-4xl md:text-6xl tracking-tight uppercase">
          What We Do
        </h2>
        <div className="w-12 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
      </div>

      {/* Sticky card stack — each card sticks at top:0 and the next slides over it */}
      {instruments.map((instrument, index) => (
        <div
          key={instrument.title}
          className="sticky top-0"
          style={{ zIndex: index + 2 }}
        >
          <InstrumentCard
            title={instrument.title}
            description={instrument.description}
            imageSrc={instrument.imageSrc}
            imageAlt={instrument.imageAlt}
          />
        </div>
      ))}
    </section>
  );
}
