import SiteImage from "./SiteImage";

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
  contactHref = "/contact",
}: InstrumentCardProps) {
  return (
    <div className="min-h-0 md:h-screen flex items-center justify-center px-4 md:px-10 py-6">
      <div className="w-full max-w-7xl bg-zinc-900 rounded-3xl flex flex-col md:flex-row h-auto md:h-[88vh]">
        {/* Image — on top for mobile, right side for desktop */}
        <div className="md:order-2 md:w-[55%] flex items-center p-4 md:p-6">
          <div className="relative w-full h-52 md:h-[95%] rounded-2xl overflow-hidden">
            <SiteImage
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="md:order-1 flex flex-col justify-center gap-4 md:gap-6 px-6 pb-6 md:p-16 md:w-[45%]">
          <div className="w-10 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
          <h3 className="text-white font-semibold text-2xl md:text-4xl tracking-tight uppercase">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
            {description}
          </p>
          <a
            href={contactHref}
            className="hidden md:inline-block border border-zinc-600 text-zinc-300 rounded-full px-6 py-2.5 text-sm w-fit hover:border-zinc-400 transition-colors"
          >
            Contact me
          </a>
        </div>
      </div>
    </div>
  );
}
