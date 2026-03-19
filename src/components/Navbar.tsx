export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 w-full absolute top-0 left-0 z-20">
      <div className="flex items-center gap-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white"
        >
          <rect x="2" y="8" width="3" height="8" rx="1" fill="currentColor" />
          <rect x="7" y="5" width="3" height="14" rx="1" fill="currentColor" />
          <rect x="12" y="3" width="3" height="18" rx="1" fill="currentColor" />
          <rect x="17" y="6" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        <span className="text-white font-bold text-lg tracking-wide">
          ARS <span className="text-red-600">MUSICA</span>
        </span>
      </div>

      <div className="flex items-center gap-8">
        <a href="#about" className="text-red-600 hover:text-red-500 transition-colors text-sm font-medium">
          About
        </a>
        <a href="#courses" className="text-red-600 hover:text-red-500 transition-colors text-sm font-medium">
          Courses
        </a>
      </div>

      <a
        href="#contact"
        className="border border-zinc-500 text-zinc-300 rounded-full px-5 py-2 text-sm hover:border-zinc-300 transition-colors"
      >
        Get in touch
      </a>
    </nav>
  );
}
