"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Frame from "@/components/ui/Frame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { directions } from "@/content/site";
import { silk } from "@/lib/motion";
import { cn } from "@/lib/utils";

const textures = ["tex-1", "tex-4", "tex-2", "tex-5", "tex-3"];
/** Скільки напрямів показуємо на телефоні до натискання «Показати більше». */
const MOBILE_VISIBLE = 3;

export default function Directions() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="directions" className="relative bg-linen py-14 md:py-20 lg:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Напрями роботи</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 display text-balance text-[clamp(1.9rem,6.2vw,2.4rem)] lg:text-[clamp(2.1rem,2.7vw,2.9rem)]">
              П'ять зон відповідальності студії
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_0.68fr] lg:gap-12">
          <div>
            <ul className="border-t border-clay/25">
              {directions.map((direction, index) => {
                const hiddenOnMobile = !expanded && index >= MOBILE_VISIBLE;

                return (
                  <Reveal
                    as="li"
                    key={direction.id}
                    delay={index * 0.04}
                    className={cn(hiddenOnMobile && "hidden lg:block")}
                  >
                    <div
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      tabIndex={0}
                      className={cn(
                        "group relative block border-b border-clay/25 py-6 outline-none transition-colors duration-500 md:py-7",
                        active === index ? "lg:bg-porcelain/70" : "lg:bg-transparent",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-0 h-px bg-wine transition-all duration-700 ease-silk",
                          active === index ? "w-full" : "w-0",
                        )}
                      />

                      <div className="flex items-start gap-4 lg:px-5">
                        <div className="min-w-0 flex-1">
                          <h3 className="display text-xl text-ink transition-colors duration-500 group-hover:text-wine md:text-2xl">
                            {direction.title}
                          </h3>
                          <p className="mt-2 max-w-md text-pretty leading-relaxed text-taupe">
                            {direction.text}
                          </p>
                          <p className="mt-3 label text-clay/70">{direction.detail}</p>
                        </div>

                        {/* Мобільне прев'ю — щоб секція не була просто списком */}
                        <Frame
                          tex={textures[index]}
                          ornament={false}
                          className="h-[4.5rem] w-[4.5rem] shrink-0 lg:hidden"
                          sizes="72px"
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            {/* Решта напрямів на телефоні розкривається кнопкою */}
            {!expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="group mt-5 flex min-h-[54px] w-full items-center justify-center gap-3 border border-clay/40 px-6 label text-ink transition-colors duration-500 ease-silk hover:border-wine hover:text-wine lg:hidden"
              >
                Показати більше
                <span className="flex items-center gap-1" aria-hidden>
                  <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-9" />
                </span>
                <span className="label text-clay/60">
                  +{directions.length - MOBILE_VISIBLE}
                </span>
              </button>
            )}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: silk }}
                    className="absolute inset-0"
                  >
                    <Frame tex={textures[active]} className="absolute inset-0" sizes="28vw" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-clay/25 pt-3">
                <span className="font-display text-lg text-ink">{directions[active].title}</span>
                <span className="label text-clay/70">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(directions.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
