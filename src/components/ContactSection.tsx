"use client";

import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-[25vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/Gemini_Generated_Image_t2zuzet2zuzet2zu@1.5x.jpg')",
        }}
      />

      {/* Top gradient fade to black */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent z-[1]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 text-center"
      >
        <h2 className="text-white font-semibold text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-tight mb-8">
          Let&apos;s Get
          <br />
          In Touch
        </h2>

        {/* Contact Details */}
        <div className="flex flex-col items-center gap-4 mt-8 px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-zinc-300">
            {/* Email */}
            <a 
              href="mailto:arsmusica.academy@gmail.com" 
              className="flex items-center gap-2.5 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              <span className="text-sm md:text-base font-medium">arsmusica.academy@gmail.com</span>
            </a>
            
            <div className="hidden sm:block w-px h-4 bg-zinc-800" />
            
            {/* Phone */}
            <a 
              href="tel:+919818759189" 
              className="flex items-center gap-2.5 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="text-sm md:text-base font-medium">+91 98187 59189</span>
            </a>
          </div>

          {/* Address */}
          <div className="flex items-start justify-center gap-2.5 max-w-lg text-zinc-300 mt-0 sm:mt-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400 flex-shrink-0 mt-1">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm md:text-base text-center font-medium">
              B-8, Pocket C, Mayfield Garden, Sector 50, Gurugram, Haryana 122018
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
