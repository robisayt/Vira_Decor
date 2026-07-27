import type { Variants } from "framer-motion";

/** Спільна крива руху сайту — м'яка, без різких зупинок. */
export const silk: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: silk },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: silk } },
};

export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease: silk } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});
