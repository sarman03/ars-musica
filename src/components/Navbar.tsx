import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 w-full absolute top-0 left-0 z-20">
      <a href="/" className="flex items-center gap-2">
        <Image
          src="/logo/logo.jpeg"
          alt="Ars Musica"
          width={24}
          height={24}
          className="rounded-sm"
        />
        <span className="text-white font-bold text-lg tracking-wide">
          ARS <span className="text-brand-red">MUSICA</span>
        </span>
      </a>

      <div className="flex items-center gap-8">
        <a href="/#about" className="text-brand-red hover:text-brand-red transition-colors text-sm font-medium">
          About
        </a>
        <a href="/#what-we-do" className="text-brand-red hover:text-brand-red transition-colors text-sm font-medium">
          Courses
        </a>
      </div>

      <a
        href="/contact"
        className="border border-zinc-500 text-zinc-300 rounded-full px-5 py-2 text-sm hover:border-zinc-300 transition-colors"
      >
        Get in touch
      </a>
    </nav>
  );
}
