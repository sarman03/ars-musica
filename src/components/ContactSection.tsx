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
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
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
        <h2 className="text-white font-semibold text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-tight">
          Let&apos;s Get
          <br />
          In Touch
        </h2>
      </motion.div>
    </section>
  );
}
