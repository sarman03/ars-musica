import Image from "next/image";

const values = [
  {
    number: "1",
    title: "Vision",
    description:
      "Inspiring a lifelong connection with music. We aim to create a space where every learner discovers the joy, confidence, and purpose that music brings into life.",
  },
  {
    number: "2",
    title: "Learning",
    description:
      "Structured guidance with creative freedom. Through expert mentorship and a balanced approach, we help students build strong foundations while expressing their individuality.",
  },
  {
    number: "3",
    title: "Community",
    description:
      "A space where every musician belongs. We foster an inclusive environment where students grow together, share ideas, and support each other's musical journey.",
  },
  {
    number: "4",
    title: "Expression",
    description:
      "More than skills — true artistry. We encourage students to not just learn music, but to feel it, perform it, and make it a meaningful part of their lives.",
  },
];

function ValueCard({ item }: { item: (typeof values)[0] }) {
  return (
    <div className="text-center px-4">
      <div className="relative inline-block">
        <span className="text-zinc-700 font-black text-8xl md:text-9xl leading-none select-none">
          {item.number}
        </span>
        <h3 className="text-brand-red font-black text-xl md:text-2xl uppercase tracking-tight absolute bottom-1 left-1/2 -translate-x-1/2">
          {item.title}
        </h3>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-[260px] mx-auto">
        {item.description}
      </p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="bg-black px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center mb-20">
          <div className="w-12 h-[2px] rounded-full mb-4" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
          <h2 className="text-brand-red font-black text-4xl md:text-6xl lg:text-7xl tracking-tight uppercase text-center">
            About Ars Musica
          </h2>
        </div>

        {/* 3-column grid: left values | center image | right values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-20">
            <ValueCard item={values[0]} />
            <ValueCard item={values[2]} />
          </div>

          {/* Center logo */}
          <div className="relative aspect-square rounded-none overflow-hidden mx-auto w-full max-w-[340px]">
            <Image
              src="/logo/logo.jpeg"
              alt="About Ars Musica"
              fill
              className="object-cover"
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-20">
            <ValueCard item={values[1]} />
            <ValueCard item={values[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}
