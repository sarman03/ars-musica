"use client";

import { motion } from "motion/react";

export default function FloatingContactButtons() {
  const whatsappUrl = "https://wa.me/919818759189?text=Hi%2C%20I%20would%20like%20to%20book%20a%20demo";
  const phoneUrl = "tel:+919818759189";

  return (
    <div className="fixed right-4 top-[50%] -translate-y-1/2 z-50 flex flex-col gap-4">
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] cursor-pointer select-none transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.6, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="md:w-[28px] md:h-[28px]"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.48-.003 9.932-4.451 9.935-9.93.002-2.654-1.03-5.15-2.906-7.027A9.82 9.82 0 0012.002 1.84c-5.467 0-9.917 4.45-9.92 9.933-.001 1.761.464 3.483 1.347 5.024l-.995 3.637 3.73-.978c1.511.822 3.02 1.258 4.483 1.258zm10.742-7.531c-.272-.136-1.61-.795-1.86-.886-.25-.09-.432-.136-.613.136-.182.273-.704.886-.863 1.068-.159.182-.318.205-.59.069-.273-.136-1.15-.424-2.19-1.353-.809-.721-1.355-1.614-1.514-1.886-.159-.273-.017-.42.12-.556.123-.122.272-.318.409-.477.136-.159.182-.272.272-.454.09-.182.045-.341-.022-.477-.068-.136-.613-1.477-.84-2.023-.222-.534-.467-.461-.64-.47l-.547-.008c-.182 0-.477.068-.727.341-.25.272-.954.932-.954 2.272 0 1.341.977 2.636 1.113 2.818.136.182 1.92 2.931 4.65 4.113.65.28 1.157.446 1.554.573.653.208 1.248.179 1.718.109.524-.078 1.61-.659 1.838-1.295.228-.637.228-1.183.159-1.295-.069-.114-.25-.205-.522-.341z" />
        </svg>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        href={phoneUrl}
        aria-label="Call Us"
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[#3B9CFC] text-white shadow-[0_4px_14px_rgba(59,156,252,0.4)] hover:bg-[#258ae6] hover:shadow-[0_6px_20px_rgba(59,156,252,0.6)] cursor-pointer select-none transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.6, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="md:w-[26px] md:h-[26px]"
        >
          <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </motion.a>
    </div>
  );
}
