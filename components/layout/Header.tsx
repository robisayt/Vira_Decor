"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Divider from "@/components/ui/Divider";
import { contactList, nav, site } from "@/content/site";
import { silk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const isHome = pathname === "/";
  /** На головній великий логотип живе в hero, тож у меню знак з'являється при скролі. */
  const showMark = scrolled || !isHome || open;

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 80));

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
          ? "border-b border-clay/15 bg-porcelain/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Компактний круглий знак — з'являється при скролі */}
        <AnimatePresence>
          {showMark && (
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.82 }}
              transition={{ duration: 0.6, ease: silk }}
              className="relative z-10 shrink-0"
            >
              <Link href="/" aria-label={site.name} className="block">
                <Image
                  src={open ? "/mark-light.png" : "/mark.png"}
                  alt={`${site.name} — ${site.tagline}`}
                  width={1160}
                  height={1160}
                  priority
                  className="h-12 w-12 md:h-14 md:w-14"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Порожній розпірник, поки знак прихований */}
        {!showMark && <span aria-hidden className="h-12 w-12" />}

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

        {/* Кнопка меню — велика, з рамкою і підписом */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          className={cn(
            "relative z-10 flex min-h-[52px] items-center gap-3 border px-4 transition-colors duration-500 ease-silk lg:hidden",
            open
              ? "border-porcelain/40 bg-transparent"
              : "border-clay/40 bg-porcelain/70 backdrop-blur-sm",
          )}
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 block h-px w-full transition-all duration-500 ease-silk",
                open ? "top-1.5 rotate-45 bg-porcelain" : "top-0 bg-ink",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px transition-all duration-500 ease-silk",
                open ? "top-1.5 w-full -rotate-45 bg-porcelain" : "top-3 w-3.5 bg-ink",
              )}
            />
          </span>
          <span className={cn("label", open ? "text-porcelain" : "text-ink")}>
            {open ? "Закрити" : "Меню"}
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
            className="fixed inset-0 -z-10 overflow-y-auto bg-ink lg:hidden"
          >
            <Image
              src="/lace-light.png"
              alt=""
              width={756}
              height={1782}
              aria-hidden
              className="pointer-events-none absolute -right-16 top-1/4 h-[52vh] w-auto opacity-[0.07]"
            />

            <div className="shell relative flex min-h-full flex-col justify-between pb-10 pt-[calc(var(--header-h)+1.5rem)]">
              <nav className="flex flex-col">
                {nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + index * 0.06, duration: 0.6, ease: silk }}
                    className="border-b border-porcelain/10"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-5 font-display text-[2rem] font-light leading-none text-porcelain"
                    >
                      {item.label}
                      <span aria-hidden className="h-px w-8 bg-porcelain/30" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="mt-10"
              >
                <Divider variant="light" size="sm" className="mb-8" />

                <div className="flex flex-col gap-3">
                  {contactList.map((contact) => (
                    <a
                      key={contact.href}
                      href={contact.href}
                      className="flex min-h-[52px] items-center justify-between border-b border-porcelain/10 py-3"
                    >
                      <span className="label text-porcelain/40">{contact.label}</span>
                      <span className="font-display text-lg text-porcelain/90">
                        {contact.value}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
