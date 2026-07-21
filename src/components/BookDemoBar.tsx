"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function BookDemoBar() {
  const pathname = usePathname();

  // Exclude admin pages from displaying the demo booking bar
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    if (typeof window !== "undefined" && !isAdminPage) {
      document.body.classList.add("pb-[56px]", "sm:pb-0");
      return () => {
        document.body.classList.remove("pb-[56px]", "sm:pb-0");
      };
    }
  }, [isAdminPage]);

  if (isAdminPage) {
    return null;
  }

  const whatsappUrl = "https://wa.me/919818759189?text=Hi%2C%20I%20would%20like%20to%20book%20a%20demo";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 px-6 py-2 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-red hover:bg-[#a3001c] active:bg-[#850017] text-white font-semibold text-xs uppercase tracking-wider py-2 rounded-full transition-colors duration-200 shadow-md text-center block"
          >
            Book A Free Demo
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
