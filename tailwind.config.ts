import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Палітра бренду — єдине джерело правди для кольорів. */
        porcelain: "#FEFEFE", // фон, повітря
        dust: "#D6CCCD",      // світлий рожево-сірий
        mauve: "#B6A3A5",     // м'який пудровий
        clay: "#917371",      // теплий акцент
        taupe: "#81666B",     // приглушений темний
        wine: "#60242C",      // головний акцент, кнопки
        /* Похідні відтінки (тільки для фонів і тексту) */
        linen: "#F7F4F4",
        ink: "#2B1E20",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        label: "0.28em",
        wide2: "0.14em",
      },
      maxWidth: {
        shell: "1440px",
      },
      boxShadow: {
        soft: "0 24px 60px -30px rgba(43, 30, 32, 0.35)",
        lift: "0 40px 90px -40px rgba(43, 30, 32, 0.5)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-24px,0) scale(1.04)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
