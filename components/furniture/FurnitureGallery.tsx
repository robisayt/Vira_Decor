"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { FurnitureCategory } from "@/content/furniture";
import { silk } from "@/lib/motion";

/**
 * Галерея категорії — вирівняна по висоті ряду (justified).
 *
 * Кожен кадр займає ширину, пропорційну своїм розмірам, і ряд розтягується
 * на всю сітку — тому пропорції різні, а ряди рівні.
 *
 * MIN_AR обмежує лише крайній випадок: знімок 9:20 з телефона у справжніх
 * пропорціях дає 6–7 кадрів у ряду завширшки 150 px — це стрічка мініатюр.
 * Тому такі кадри показуються як 9:16 (обрізається по 10% зверху і знизу,
 * тобто стеля і підлога). Решта пропорцій не чіпається.
 */

/** Найвужча пропорція плитки. */
const MIN_AR = 0.56;

/**
 * Мінімальна щільність пікселів, за якої кадр ще виглядає різко.
 *
 * Кадр ніколи не розтягується ширше, ніж дозволяє його власна роздільність:
 * знімок 1280 px завширшки не показується ширшим за 853 CSS px. Якість
 * важливіша за розмір — краще менша плитка, але ідеально чітка. Вивільнене
 * місце в ряду забирають сусідні кадри, ряд лишається вирівняним.
 */
const SHARP_DPR = 1.5;

/** Ширина контенту всередині .shell на максимумі — стеля для однієї плитки. */
const SHELL_INNER = 1296;

function Placeholder({ index }: { index: number }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            index % 2 === 0
              ? "linear-gradient(150deg, #FEFEFE 0%, #F7F4F4 46%, #D6CCCD 100%)"
              : "linear-gradient(210deg, #F7F4F4 0%, #D6CCCD 58%, #B6A3A5 100%)",
        }}
      />
      <span aria-hidden className="absolute inset-0 window-light" />
      <Image
        src="/lace-light.png"
        alt=""
        width={475}
        height={1120}
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[62%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-30 mix-blend-overlay"
      />
      <span aria-hidden className="absolute inset-3 border border-porcelain/45 md:inset-4" />
    </>
  );
}

/** Розміри заглушок, поки в категорії немає фото. */
const PLACEHOLDER_SIZES = [
  { w: 1600, h: 1000 },
  { w: 900, h: 1200 },
  { w: 900, h: 1200 },
  { w: 1600, h: 1000 },
];

export default function FurnitureGallery({ category }: { category: FurnitureCategory }) {
  const reduce = useReducedMotion();
  const hasPhotos = category.photos.length > 0;
  const items = hasPhotos
    ? category.photos
    : Array.from({ length: category.placeholders ?? 4 }, (_, i) => ({
        src: undefined as string | undefined,
        ...PLACEHOLDER_SIZES[i % PLACEHOLDER_SIZES.length],
      }));

  return (
    <div className="justified-grid flex flex-wrap gap-3 md:gap-4">
      {items.map((item, index) => {
        const ar = Math.max(item.w / item.h, MIN_AR);
        /* Скільки CSS-пікселів завширшки цей файл витримує без мила. */
        const cap = Math.min(Math.round(item.w / SHARP_DPR), SHELL_INNER);

        return (
          <motion.figure
            key={item.src ?? `placeholder-${index}`}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, ease: silk, delay: (index % 4) * 0.06 }}
            className="justified-item group relative"
            style={{
              flexGrow: ar,
              flexBasis: `calc(var(--fj-row) * ${ar.toFixed(3)})`,
              maxWidth: `${cap}px`,
            }}
          >
            <div
              className="relative w-full overflow-hidden bg-linen"
              style={{ aspectRatio: `${ar}` }}
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={category.title}
                  fill
                  /* Точний розмір замість «34vw»: раніше на широкому екрані
                     плитка виходила ширшою за запитаний кадр, і браузер
                     доводив його масштабуванням — саме звідси було мило. */
                  sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${cap}px`}
                  quality={95}
                  className="object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.03]"
                />
              ) : (
                <Placeholder index={index} />
              )}

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 ease-silk group-hover:bg-ink/[0.05]"
              />
            </div>
          </motion.figure>
        );
      })}

      {/* Розпірки: не дають останньому ряду розтягнутися на всю ширину */}
      {items.length > 2 && (
        <>
          <i aria-hidden className="justified-filler" />
          <i aria-hidden className="justified-filler" />
          <i aria-hidden className="justified-filler" />
        </>
      )}
    </div>
  );
}
