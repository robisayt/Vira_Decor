"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { silk } from "@/lib/motion";

/**
 * Повернення нагору. З'являється після першого екрана,
 * тонке кільце по колу показує прогрес прокрутки сторінки.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
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
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.55, ease: silk }}
          className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-porcelain/95 shadow-[0_10px_30px_-12px_rgba(43,30,32,0.45)] backdrop-blur-md transition-all duration-500 ease-silk hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(43,30,32,0.55)] md:bottom-8 md:right-8 md:h-[52px] md:w-[52px]"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* Заливка при наведенні */}
          <span
            aria-hidden
            className="absolute inset-0 scale-90 rounded-full bg-wine opacity-0 transition-all duration-500 ease-silk group-hover:scale-100 group-hover:opacity-100"
          />

          {/* Кільце прогресу прокрутки */}
          <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-clay/25 transition-colors duration-500 group-hover:text-porcelain/25"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: progress }}
              className="text-wine transition-colors duration-500 group-hover:text-porcelain"
            />
          </svg>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="relative z-10 h-[18px] w-[18px] text-ink transition-all duration-500 ease-silk group-hover:-translate-y-0.5 group-hover:text-porcelain"
          >
            <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
