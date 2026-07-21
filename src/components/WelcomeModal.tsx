"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import ContactFormFields from "./ContactFormFields";

export default function WelcomeModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Exclude admin pages from displaying the welcome modal
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminPage) return;

    // Check if user has already seen the welcome modal in this session
    const hasSeen = sessionStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeen) {
      // Small delay for a smooth entry after initial mount
      const t = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [isAdminPage]);

  const handleClose = () => {
    sessionStorage.setItem("hasSeenWelcomeModal", "true");
    setIsOpen(false);
  };

  if (isAdminPage || !isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close welcome modal"
            className="absolute top-4 right-4 text-zinc-500 hover:text-white cursor-pointer transition-colors p-2 rounded-full hover:bg-zinc-900/50"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto pr-1">
            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <h2 className="font-heading font-semibold text-2xl md:text-3xl text-brand-red tracking-wide uppercase leading-tight">
                Welcome to
                <br />
                Ars Musica Academy
              </h2>
              <p className="text-zinc-400 text-sm md:text-base mt-2">
                Get in Touch with Us
              </p>
            </div>

            {/* Form Fields */}
            <ContactFormFields onSubmitSuccess={handleClose} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
