"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Divider from "@/components/ui/Divider";
import Picture from "@/components/ui/Picture";
import { contactList, nav, site } from "@/content/site";
import { silk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const lockedY = useRef(0);

  const isHome = pathname === "/";
  /** На головній великий логотип живе в hero, тож у меню знак з'являється при скролі. */
  const showMark = scrolled || !isHome || open;

  useMotionValueEvent(scrollY, "change", (value) => {
    if (!open) setScrolled(value > 80);
  });

  useEffect(() => setOpen(false), [pathname]);

  /**
   * Блокування прокрутки під відкритим меню.
   * overflow: hidden на body в iOS Safari не працює — сторінка все одно тягнеться,
   * тому фіксуємо body і повертаємо позицію після закриття.
   */
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const y = window.scrollY;
    lockedY.current = y;

    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    return () => {
      Object.assign(body.style, prev);
      window.scrollTo(0, y);
    };
  }, [open]);

  const scrollToHash = useCallback(
    (hash: string) => {
      const target = document.getElementById(hash.replace("#", ""));
      if (!target) return;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce],
  );

  /** Якірні пункти меню: спершу знімаємо блокування, потім плавно ведемо до секції. */
  const handleNav = (event: React.MouseEvent, href: string) => {
    const [path, hash] = href.split("#");
    const targetPath = path === "" ? "/" : path.replace(/\/$/, "") || "/";

    if (!hash) {
      setOpen(false);
      return;
    }

    if (pathname === targetPath) {
      event.preventDefault();
      setOpen(false);
      // чекаємо, поки body повернеться в нормальний стан
      window.setTimeout(() => scrollToHash(hash), open ? 140 : 0);
      return;
    }

    setOpen(false); // перехід на іншу сторінку — хеш підхопить ефект нижче
  };

  /** Перехід за якорем із іншої сторінки (напр. /projects → /#contact). */
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash;
    const timer = window.setTimeout(() => scrollToHash(id), 300);
    return () => window.clearTimeout(timer);
  }, [pathname, scrollToHash]);

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
        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center md:h-16 md:w-16">
          <AnimatePresence>
            {showMark && (
              <motion.div
                initial={{ opacity: 0, scale: 0.84 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.84 }}
                transition={{ duration: 0.6, ease: silk }}
              >
                <Link href="/" aria-label={site.name} className="block">
                  <Picture
                    src={open ? "/mark-light.png" : "/mark.png"}
                    srcMobile={open ? "/mark-light-sm.png" : "/mark-sm.png"}
                    alt={`${site.name} — ${site.tagline}`}
                    width={256}
                    height={256}
                    priority
                    className="h-14 w-14 md:h-16 md:w-16"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleNav(event, item.href)}
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

        {/* Кнопка меню — без плашки, тільки лінії і підпис */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          className="group relative z-10 -mr-2 flex min-h-[52px] items-center gap-3 px-2 lg:hidden"
        >
          <span className="relative block h-2.5 w-7">
            <span
              className={cn(
                "absolute left-0 block h-px w-full transition-all duration-500 ease-silk",
                open ? "top-1 rotate-45 bg-porcelain" : "top-0 bg-ink",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px transition-all duration-500 ease-silk",
                open ? "top-1 w-full -rotate-45 bg-porcelain" : "top-2.5 w-4 bg-wine",
              )}
            />
          </span>
          <span
            className={cn(
              "relative label transition-colors duration-500",
              open ? "text-porcelain" : "text-ink",
            )}
          >
            {open ? "Закрити" : "Меню"}
            <span
              aria-hidden
              className={cn(
                "absolute -bottom-1.5 left-0 h-px w-full origin-left transition-all duration-500 ease-silk",
                open ? "bg-porcelain/40" : "bg-clay/45 group-hover:bg-wine",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: silk }}
            className="fixed inset-0 -z-10 overflow-y-auto overscroll-contain bg-ink lg:hidden"
          >
            <Image
              src="/lace-light.png"
              alt=""
              width={475}
              height={1120}
              aria-hidden
              className="pointer-events-none absolute -right-14 top-[18%] h-[56vh] w-auto opacity-[0.08]"
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
                      onClick={(event) => handleNav(event, item.href)}
                      className="flex min-h-[64px] items-center justify-between py-4 font-display text-[2.1rem] font-light leading-none text-porcelain"
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
