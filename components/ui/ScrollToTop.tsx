"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { silk } from "@/lib/motion";

/** Повернення нагору — з'являється після першого екрана. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Повернутись нагору"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: silk }}
          className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center border border-clay/35 bg-porcelain/90 backdrop-blur-md transition-colors duration-500 ease-silk hover:border-wine md:bottom-8 md:right-8 md:h-12 md:w-12"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-bottom scale-y-0 bg-wine transition-transform duration-500 ease-silk group-hover:scale-y-100"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="relative z-10 h-5 w-5 text-ink transition-colors duration-500 group-hover:text-porcelain"
          >
            <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
