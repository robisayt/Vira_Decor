"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Фірмовий елемент сайту — «мереживна нитка».
 * Тонка вертикальна лінія з логотипа проходить через усю сторінку,
 * а медальйон мережива рухається по ній разом зі скролом.
 */
export default function Thread() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const markerTop = useTransform(progress, [0, 1], ["4%", "96%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-6 z-40 hidden w-px lg:block xl:left-9"
    >
      <div className="absolute inset-0 hairline-v" />

      <motion.div
        className="absolute left-0 top-0 h-full w-px origin-top bg-wine/45"
        style={{ scaleY: progress }}
      />

      <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: markerTop }}>
        <motion.div
          className="relative -translate-y-1/2"
          animate={{ rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/medallion.png"
            alt=""
            width={143}
            height={173}
            className="h-7 w-auto opacity-70"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
