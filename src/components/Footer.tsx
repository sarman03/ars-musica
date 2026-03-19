export default function Footer() {
  return (
    <footer className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-0 pb-16">
      <div className="max-w-6xl mx-auto border-t border-zinc-800 pt-16" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 mt-12">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
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
          <p className="text-zinc-500 text-sm leading-relaxed">
            Your ideas deserve more than a demo.
            <br />
            Let&apos;s turn them into records that last.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div>
            <h4 className="text-zinc-300 font-medium text-sm mb-4">Navigation</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Services</a></li>
              <li><a href="#about" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">About</a></li>
              <li><a href="#work" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Work</a></li>
              <li><a href="#contact" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Contact</a></li>
              <li><a href="/404" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">404</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-300 font-medium text-sm mb-4">Socials</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Twitter</a></li>
              <li><a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Youtube</a></li>
              <li><a href="#" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
