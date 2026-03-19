import Image from "next/image";

const values = [
  {
    number: "1",
    title: "Vision",
    description:
      "Every record begins with a clear vision. I shape raw ideas into music that feels intentional, timeless, and emotionally powerful.",
  },
  {
    number: "2",
    title: "Craft",
    description:
      "Details matter. From sound design to final polish, I approach every track with precision and care that makes the music shine.",
  },
  {
    number: "3",
    title: "Trust",
    description:
      "Collaboration only works with trust. I keep communication open, deadlines tight, and always deliver what I promise without compromise.",
  },
  {
    number: "4",
    title: "Energy",
    description:
      "Music should move people. I focus on creating productions that carry energy — tracks that connect instantly and stay with listeners.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-zinc-950 px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="w-12 h-[3px] bg-white rounded-full" />
          <h2 className="text-center">
            <span className="text-red-700 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase">
              About{" "}
            </span>
            <span className="text-zinc-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase">
              Ars Musica
            </span>
          </h2>
        </div>

        {/* Content grid: 4 value cards around a center image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-16">
            {[values[0], values[2]].map((item) => (
              <div key={item.number} className="text-center">
                <div className="relative inline-block">
                  <span className="text-zinc-800 font-black text-7xl md:text-8xl leading-none">
                    {item.number}
                  </span>
                  <h3 className="text-red-600 font-black text-xl md:text-2xl uppercase tracking-tight absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mt-4 max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-red-700 mx-auto w-full max-w-[300px]">
            <Image
              src="/about.jpg"
              alt="About Ars Musica"
              fill
              className="object-cover"
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
                  <h3 className="text-red-600 font-black text-xl md:text-2xl uppercase tracking-tight absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
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
  );
}
