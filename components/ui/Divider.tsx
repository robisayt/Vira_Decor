import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Фірмовий розділювач: лінія — кружево — лінія.
 * Той самий прийом, що й під написом STUDIO DESIGN у логотипі.
 */
export default function Divider({
  className,
  variant = "dark",
  size = "md",
}: {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md";
}) {
  return (
    <div className={cn("flex items-center gap-5 md:gap-8", className)} aria-hidden>
      <span className={cn("h-px flex-1", variant === "light" ? "bg-porcelain/25" : "hairline")} />
      <Image
        src={variant === "light" ? "/lace-h-light.png" : "/lace-h.png"}
        alt=""
        width={1782}
        height={756}
        className={cn(
          "w-auto",
          size === "sm" ? "h-6 md:h-7" : "h-8 md:h-11",
          variant === "light" ? "opacity-70" : "opacity-60",
        )}
      />
      <span className={cn("h-px flex-1", variant === "light" ? "bg-porcelain/25" : "hairline")} />
    </div>
  );
}
