import Image from "next/image";
import { cn } from "@/lib/utils";

type FrameProps = {
  /** Коли з'явиться фото — просто передайте src, розмітка не зміниться. */
  src?: string;
  alt?: string;
  tex?: string;
  className?: string;
  /** Ледь помітне мереживо поверх заглушки. */
  ornament?: boolean;
  sizes?: string;
  priority?: boolean;
};

/**
 * Універсальний візуальний слот.
 * Без src показує шарувату текстуру з палітри бренду — сайт ніколи не виглядає порожнім.
 */
export default function Frame({
  src,
  alt = "",
  tex = "tex-1",
  className,
  ornament = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: FrameProps) {
  return (
    <div className={cn("relative overflow-hidden grain isolate", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]",
              tex,
            )}
          />
          {ornament && (
            <Image
              src="/lace-light.png"
              alt=""
              width={475}
              height={1120}
              aria-hidden
              className="absolute -right-6 top-1/2 h-[78%] w-auto -translate-y-1/2 opacity-25 mix-blend-overlay"
            />
          )}
        </>
      )}
      <div className="pointer-events-none absolute inset-0 window-light" aria-hidden />
    </div>
  );
}
