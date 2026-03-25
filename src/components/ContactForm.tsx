"use client";

import { useEffect, useState } from "react";
import LightRaysBackground from "@/components/LightRaysBackground";

export default function ContactForm() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !city) return;

    const text = [
      `Hello Ars Musica,`,
      ``,
      `I'm interested in learning more about your music classes. Here are my details:`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      ...(message ? [``, `Message: ${message}`] : []),
      ``,
      `Looking forward to hearing from you.`,
    ].join("\n");

    window.open(
      `https://wa.me/919818759189?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section className="relative bg-black min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      <LightRaysBackground intensity={0.5} />
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Social icons */}
        <div
          className={`flex items-center justify-center gap-3 mb-8 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-4 bg-zinc-800/80 rounded-full px-5 py-2.5">
            {/* TikTok */}
            <a href="#" className="flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/arsmusica.academy?igsh=Zno2MXZxcXNrNmNu" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/@Arsmusicaacademy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:opacity-80 transition-opacity">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Heading */}
        <h1
          className={`text-brand-red font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase text-center mb-6 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 will-change-[opacity,transform] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Let&apos;s Get In Touch
        </h1>

        {/* Subtitle */}
        <p
          className={`text-zinc-400 text-sm md:text-base text-center max-w-md mx-auto leading-relaxed mb-8 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[400ms] will-change-[opacity,transform] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Let&apos;s get in touch! Whether you&apos;re ready to start a project, have a question, or just want to connect, drop me a message below and I&apos;ll get back to you soon.
        </p>

        {/* Contact info */}
        <div
          className={`flex items-center justify-center gap-6 mb-12 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[500ms] will-change-[opacity,transform] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            <span className="text-zinc-300 text-sm">arsmusica.academy@gmail.com</span>
          </div>
          <div className="w-px h-4 bg-zinc-700" />
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="text-zinc-300 text-sm">+91 98187 59189</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6 transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[600ms] will-change-[opacity,transform] ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Your Name*</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Your Email*</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Your Phone*</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Your City*</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="New Delhi"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-300 text-sm font-medium mb-2 block">Your Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Let's make something happen..."
              rows={5}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-red hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-full transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
