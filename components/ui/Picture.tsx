/* eslint-disable @next/next/no-img-element */

import { cn } from "@/lib/utils";

type PictureProps = {
  /** Основний файл (desktop). */
  src: string;
  /** Окремий файл для телефонів — прорахований під малий розмір. */
  srcMobile?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  breakpoint?: number;
};

/**
 * Фірмові зображення (логотип, знак, кружево) віддаються як є, без перекодування.
 * next/image стискає їх у WebP і «з'їдає» волосяні лінії логотипа на малих розмірах,
 * тому тут навмисно звичайний <picture> з окремим файлом для мобільних.
 */
export default function Picture({
  src,
  srcMobile,
  alt,
  width,
  height,
  className,
  priority = false,
  breakpoint = 768,
}: PictureProps) {
  return (
    <picture>
      {srcMobile && (
        <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={srcMobile} />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(className)}
      />
    </picture>
  );
}
