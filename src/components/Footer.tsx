import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-0 pb-16">
      <div className="max-w-6xl mx-auto border-t border-zinc-800 pt-16" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 mt-12">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo/logo.jpeg" alt="Ars Musica" width={24} height={24} className="rounded-sm" />
            <span className="text-white font-bold text-lg tracking-wide">
               <span className="text-brand-red">ARS MUSICA ACADEMY</span> 
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
              <li><a href="/#what-we-do" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Courses</a></li>
              <li><a href="/#about" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">About</a></li>
              <li><a href="/contact" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-300 font-medium text-sm mb-4">Socials</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="https://www.instagram.com/arsmusica.academy?igsh=Zno2MXZxcXNrNmNu" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Instagram</a></li>
              <li><a href="https://www.youtube.com/@Arsmusicaacademy" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Youtube</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61579686133656" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
