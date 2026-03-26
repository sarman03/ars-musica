"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed md:absolute top-0 left-0 w-full z-20 px-4 md:px-0 pt-3 md:pt-0">
        <div className="flex items-center justify-between px-5 md:px-10 py-4 md:py-5 md:bg-transparent bg-white/10 backdrop-blur-xl md:backdrop-blur-none rounded-xl md:rounded-none border border-white/15 md:border-0">
          {/* Logo */}
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

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#about" className="text-brand-red hover:text-brand-red transition-colors text-sm font-medium">
              About
            </a>
            <a href="/#what-we-do" className="text-brand-red hover:text-brand-red transition-colors text-sm font-medium">
              Courses
            </a>
            <a href="/gallery" className="text-brand-red hover:text-brand-red transition-colors text-sm font-medium">
              Gallery
            </a>
            <a href="/#mentors" className="text-brand-red hover:text-brand-red transition-colors text-sm font-medium">
              Mentors
            </a>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/919818759189?text=Hi%2C%20I%20would%20like%20to%20book%20a%20demo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full px-5 py-2 text-sm transition-colors"
            >
              Book a Demo
            </a>
            <a
              href="/contact"
              className="border border-zinc-500 text-zinc-300 rounded-full px-5 py-2 text-sm hover:border-zinc-300 transition-colors"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[6px]"
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2px] bg-white rounded-full" />
            <span className="block w-6 h-[2px] bg-white rounded-full" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden absolute top-3 left-4 right-4 z-50 bg-zinc-900 rounded-2xl border border-zinc-700/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
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
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mx-5 h-px bg-zinc-700/60" />

        {/* Links */}
        <div className="flex flex-col items-center gap-6 py-8">
          <a
            href="/#about"
            onClick={() => setOpen(false)}
            className="text-brand-red text-lg font-medium"
          >
            About
          </a>
          <a
            href="/#what-we-do"
            onClick={() => setOpen(false)}
            className="text-brand-red text-lg font-medium"
          >
            Courses
          </a>
          <a
            href="/gallery"
            onClick={() => setOpen(false)}
            className="text-brand-red text-lg font-medium"
          >
            Gallery
          </a>
          <a
            href="/#mentors"
            onClick={() => setOpen(false)}
            className="text-brand-red text-lg font-medium"
          >
            Mentors
          </a>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="border border-zinc-600 text-zinc-300 rounded-full px-12 py-3 text-sm hover:border-zinc-400 transition-colors mt-2"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
