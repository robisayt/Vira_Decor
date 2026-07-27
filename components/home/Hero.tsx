"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Frame from "@/components/ui/Frame";
import { hero } from "@/content/site";
import { silk } from "@/lib/motion";

export default function Hero() {
  const reduce = useReducedMotion();

  const line = {
    hidden: { y: reduce ? 0 : "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: { duration: 1.1, ease: silk, delay: 0.25 + i * 0.12 },
    }),
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-porcelain pt-[var(--header-h)]">
      {/* Шар 1 — м'яке світло з правого верхнього кута */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 88% -10%, #D6CCCD 0%, rgba(214,204,205,0.45) 34%, rgba(254,254,254,0) 68%)",
        }}
      />
      {/* Шар 2 — тепла тінь знизу */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(145,115,113,0.16), rgba(254,254,254,0))",
        }}
      />

      {/* Шар 3 — мереживо з логотипа як водяний знак */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.14, scale: 1 }}
        transition={{ duration: 2.2, ease: silk, delay: 0.2 }}
        className="pointer-events-none absolute -right-16 top-[12%] hidden md:block lg:right-[4%]"
      >
        <Image
          src="/ornament.png"
          alt=""
          width={180}
          height={480}
          priority
          className="h-[64vh] w-auto animate-drift"
        />
      </motion.div>

      <div className="shell relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-between pb-10 pt-10 md:pb-14 md:pt-16">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-[36rem]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className="inline-flex items-center gap-3"
            >
              <span aria-hidden className="h-px w-10 bg-clay/70" />
              <span className="label text-clay">{hero.eyebrow}</span>
            </motion.span>

            <h1 className="mt-7 display text-[clamp(2.9rem,10.5vw,4.6rem)] lg:text-[clamp(3.6rem,4.6vw,5.6rem)]">
              {hero.title.map((word, index) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    custom={index}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    className="block"
                  >
                    {index === 2 ? (
                      <span className="text-wine italic">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: silk, delay: 0.8 }}
              className="mt-7 max-w-md text-pretty text-base leading-relaxed text-taupe md:text-lg"
            >
              {hero.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: silk, delay: 0.95 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
              <Button href={hero.secondary.href} variant="outline">
                {hero.secondary.label}
              </Button>
            </motion.div>
          </div>

          {/* Візуальна картка з м'яким зміщенням шарів */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: silk, delay: 0.45 }}
            className="relative hidden lg:block"
          >
            <div className="group relative ml-auto aspect-[4/5] w-full max-w-[26rem]">
              <div
                aria-hidden
                className="absolute -left-8 -top-8 h-full w-full border border-clay/30"
              />
              <Frame
                tex="tex-1"
                className="absolute inset-0 shadow-soft"
                sizes="(max-width: 1024px) 0px, 26rem"
                priority
              />
              <div className="absolute -bottom-7 -left-7 max-w-[15rem] bg-porcelain px-6 py-5 shadow-soft">
                <span className="label text-clay">Studio Design</span>
                <p className="mt-2 font-display text-xl leading-snug text-ink">
                  Від планування до готового Інтер&apos;єру
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 border-t border-clay/20 pt-6"
        >
          <ul className="grid grid-cols-3 gap-4">
            {hero.marks.map((mark) => (
              <li key={mark.value} className="min-w-0">
                <p className="font-display text-lg text-ink md:text-2xl">{mark.value}</p>
                <p className="mt-1 label text-clay/80">{mark.note}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
