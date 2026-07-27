"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Frame from "@/components/ui/Frame";
import { hero, site } from "@/content/site";
import { silk } from "@/lib/motion";

export default function Hero() {
  const reduce = useReducedMotion();

  const line = {
    hidden: { y: reduce ? 0 : "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: { duration: 1.05, ease: silk, delay: 0.45 + i * 0.1 },
    }),
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-porcelain pt-[var(--header-h)] lg:min-h-[94svh]">
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
          background: "linear-gradient(to top, rgba(145,115,113,0.16), rgba(254,254,254,0))",
        }}
      />
      {/* Шар 3 — фірмове кружево як водяний знак */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.13, scale: 1 }}
        transition={{ duration: 2, ease: silk, delay: 0.2 }}
        className="pointer-events-none absolute -right-20 top-[10%] hidden md:block lg:right-[2%]"
      >
        <Image
          src="/lace.png"
          alt=""
          width={756}
          height={1782}
          priority
          className="h-[62vh] w-auto animate-drift"
        />
      </motion.div>

      <div className="shell relative flex flex-1 flex-col justify-between pb-8 pt-8 md:pb-10 md:pt-10">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div className="max-w-[36rem]">
            {/* Логотип — головний елемент першого екрана */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: silk, delay: 0.1 }}
            >
              <Image
                src="/logo.png"
                alt={`${site.name} — ${site.tagline}`}
                width={1482}
                height={782}
                priority
                className="h-auto w-[84%] max-w-[320px] md:max-w-[400px] lg:max-w-[440px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, ease: silk, delay: 0.35 }}
              className="mt-6 flex origin-left items-center gap-4 md:mt-7"
            >
              <span aria-hidden className="h-px w-12 bg-clay/60 md:w-16" />
              <span className="label text-clay">{hero.eyebrow}</span>
            </motion.div>

            <h1 className="mt-5 display text-[clamp(2.2rem,8.4vw,3rem)] md:mt-6 lg:text-[clamp(2.6rem,3.4vw,3.9rem)]">
              {hero.title.map((word, index) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    custom={index}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    className="block"
                  >
                    {index === 2 ? <span className="italic text-wine">{word}</span> : word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: silk, delay: 0.85 }}
              className="mt-5 max-w-md text-pretty leading-relaxed text-taupe md:mt-6 md:text-lg"
            >
              {hero.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: silk, delay: 0.95 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button href={hero.primary.href} className="w-full sm:w-auto">
                {hero.primary.label}
              </Button>
              <Button href={hero.secondary.href} variant="outline" className="w-full sm:w-auto">
                {hero.secondary.label}
              </Button>
            </motion.div>
          </div>

          {/* Візуальна картка з м'яким зміщенням шарів */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: silk, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="group relative ml-auto aspect-[4/5] w-full max-w-[23rem]">
              <div aria-hidden className="absolute -left-7 -top-7 h-full w-full border border-clay/30" />
              <Frame
                tex="tex-1"
                className="absolute inset-0 shadow-soft"
                sizes="(max-width: 1024px) 0px, 23rem"
                priority
              />
              <div className="absolute -bottom-6 -left-6 max-w-[14rem] bg-porcelain px-5 py-4 shadow-soft">
                <span className="label text-clay">18 років досвіду</span>
                <p className="mt-2 font-display text-lg leading-snug text-ink">
                  Від планування до готового інтер'єру
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-8 border-t border-clay/20 pt-5"
        >
          <ul className="grid grid-cols-3 gap-3">
            {hero.marks.map((mark) => (
              <li key={mark.value} className="min-w-0">
                <p className="font-display text-base text-ink md:text-xl">{mark.value}</p>
                <p className="mt-1 label text-clay/80">{mark.note}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
