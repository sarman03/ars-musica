"use client";

import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

export default function ContactSection() {
  return (
    <section id="contact">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-center"
        >
          {/* <div
            className="w-12 h-[2px] rounded-full mx-auto mb-6"
            style={{
              background:
                "linear-gradient(to right, transparent, white, transparent)",
            }}
          /> */}
          <h2 className="text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-tight">
            Let&apos;s Get
            <br />
            In Touch
          </h2>
        </motion.div>
      </LampContainer>
    </section>
  );
}
