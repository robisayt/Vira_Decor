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

export default function Directions() {
  const [active, setActive] = useState(0);

  return (
    <section id="directions" className="relative bg-linen py-20 md:py-28 lg:py-36">
      <div className="shell">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Напрями роботи</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 display text-balance text-[clamp(2rem,6.4vw,2.6rem)] lg:text-[clamp(2.4rem,3.2vw,3.4rem)]">
              П&apos;ять зон відповідальності студії
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
          <ul className="border-t border-clay/25">
            {directions.map((direction, index) => (
              <Reveal as="li" key={direction.id} delay={index * 0.05}>
                <div
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  tabIndex={0}
                  className={cn(
                    "group relative block border-b border-clay/25 py-7 outline-none transition-colors duration-500 md:py-8",
                    active === index ? "lg:bg-porcelain/70" : "lg:bg-transparent",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 h-px bg-wine transition-all duration-700 ease-silk",
                      active === index ? "w-full lg:w-full" : "w-0",
                    )}
                  />

                  <div className="flex items-start gap-5 lg:px-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="display text-2xl text-ink transition-colors duration-500 group-hover:text-wine md:text-3xl">
                        {direction.title}
                      </h3>
                      <p className="mt-3 max-w-md text-pretty leading-relaxed text-taupe">
                        {direction.text}
                      </p>
                      <p className="mt-4 label text-clay/70">{direction.detail}</p>
                    </div>

                    {/* Мобільне прев'ю — щоб секція не була просто списком */}
                    <Frame
                      tex={textures[index]}
                      ornament={false}
                      className="h-20 w-20 shrink-0 lg:hidden"
                      sizes="80px"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

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
                    <Frame
                      tex={textures[active]}
                      className="absolute inset-0"
                      sizes="30vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-baseline justify-between border-t border-clay/25 pt-4">
                <span className="font-display text-xl text-ink">
                  {directions[active].title}
                </span>
                <span className="label text-clay/70">
                  {String(active + 1).padStart(2, "0")} / {String(directions.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
