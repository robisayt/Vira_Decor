"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { contactList, nav, site } from "@/content/site";
import { silk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-silk",
        scrolled && !open
          ? "border-b border-clay/15 bg-porcelain/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={site.name} className="relative z-10 shrink-0">
          <Image
            src="/logo.png"
            alt={`${site.name} — ${site.tagline}`}
            width={1136}
            height={599}
            priority
            className={cn(
              "w-auto transition-all duration-700 ease-silk",
              scrolled ? "h-8 md:h-9" : "h-9 md:h-12",
              open && "opacity-0",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative label text-ink/70 transition-colors duration-500 hover:text-wine"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-wine transition-all duration-500 ease-silk group-hover:w-full" />
            </Link>
          ))}
          <a
            href={contactList[3].href}
            className="label border border-clay/40 px-5 py-3 text-ink transition-colors duration-500 hover:border-wine hover:text-wine"
          >
            {contactList[3].value}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="relative block h-3 w-7">
            <span
              className={cn(
                "absolute left-0 block h-px w-full transition-all duration-500 ease-silk",
                open ? "top-1.5 rotate-45 bg-porcelain" : "top-0 bg-ink",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px transition-all duration-500 ease-silk",
                open ? "top-1.5 w-full -rotate-45 bg-porcelain" : "top-3 w-4 bg-ink",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: silk }}
            className="fixed inset-0 -z-10 bg-ink lg:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pb-10 pt-[var(--header-h)]">
              <nav className="mt-10 flex flex-col">
                {nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + index * 0.07, duration: 0.6, ease: silk }}
                    className="border-b border-porcelain/10"
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline justify-between py-5 font-display text-4xl font-light text-porcelain"
                    >
                      {item.label}
                      <span className="label text-porcelain/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="flex flex-col gap-3"
              >
                <Image
                  src="/medallion-light.png"
                  alt=""
                  width={143}
                  height={173}
                  className="mb-4 h-10 w-auto opacity-60"
                />
                {contactList.map((contact) => (
                  <a
                    key={contact.href}
                    href={contact.href}
                    className="flex items-center justify-between border-b border-porcelain/10 py-3 text-porcelain/80"
                  >
                    <span className="label text-porcelain/40">{contact.label}</span>
                    <span className="font-display text-lg">{contact.value}</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
