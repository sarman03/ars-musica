import Image from "next/image";

interface InstrumentCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  contactHref?: string;
}

export default function InstrumentCard({
  title,
  description,
  imageSrc,
  imageAlt,
  contactHref = "#contact",
}: InstrumentCardProps) {
  return (
    <div className="h-screen flex items-center justify-center px-6 md:px-10 py-6">
      <div className="w-full max-w-7xl bg-zinc-900 rounded-3xl overflow-hidden flex flex-col md:flex-row h-[88vh]">
        {/* Text content */}
        <div className="flex flex-col justify-center gap-6 p-10 md:p-16 md:w-[45%]">
          <div className="w-10 h-[3px] bg-white rounded-full" />
          <h3 className="text-white font-black text-3xl md:text-4xl tracking-tight uppercase">
            {title}
          </h3>
          <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
            {description}
          </p>
          <a
            href={contactHref}
            className="border border-zinc-600 text-zinc-300 rounded-full px-6 py-2.5 text-sm w-fit hover:border-zinc-400 transition-colors"
          >
            Contact me
          </a>
        </div>

        {/* Image */}
        <div className="relative md:w-[55%] h-72 md:h-auto">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
