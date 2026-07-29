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
  /**
   * Якість оптимізованого зображення. Дефолт Next — 75, для фото інтер'єрів
   * цього мало: зникає дрібна фактура. Тут 95 — як у галереях меблів,
   * щоб різкість була однаковою на всьому сайті.
   */
  quality?: number;
  /** object-position для точного кадрування (напр. "left bottom"). */
  position?: string;
};

/**
 * Універсальний візуальний слот.
 * Без src показує шарувату текстуру з палітри бренду — сайт ніколи не виглядає порожнім.
 *
 * ВАЖЛИВО щодо позиціонування.
 * cn() — це простий join, він НЕ вирішує конфлікти Tailwind-класів. Якщо додати
 * власний `relative` і водночас отримати ззовні `absolute inset-0`, у класі
 * опиняться обидва. У CSS Tailwind `.relative` іде після `.absolute`, тому
 * перемагає `relative`: inset-0 перестає діяти, блок втрачає висоту, і фото з
 * `fill` зникає — саме це сталося з карткою Hero на ПК. Тому `relative`
 * додається лише тоді, коли ззовні не передали власний клас позиціонування.
 */
const POSITION = /(^|\s)(absolute|fixed|sticky|static|relative)(\s|$)/;

export default function Frame({
  src,
  alt = "",
  tex = "tex-1",
  className,
  ornament = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 95,
  position,
}: FrameProps) {
  const positioned = POSITION.test(className ?? "");

  return (
    <div
      className={cn(
        !positioned && "relative",
        "overflow-hidden grain isolate",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          style={position ? { objectPosition: position } : undefined}
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
