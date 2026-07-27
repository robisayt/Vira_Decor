import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Розділювач секцій: волосяна лінія з мереживним медальйоном —
 * той самий прийом, що й під логотипом.
 */
export default function Divider({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <div className={cn("flex items-center gap-5 md:gap-7", className)} aria-hidden>
      <span className={cn("h-px flex-1", variant === "light" ? "bg-porcelain/25" : "hairline")} />
      <Image
        src={variant === "light" ? "/medallion-light.png" : "/medallion.png"}
        alt=""
        width={143}
        height={173}
        className={cn("h-9 w-auto md:h-11", variant === "light" ? "opacity-70" : "opacity-55")}
      />
      <span className={cn("h-px flex-1", variant === "light" ? "bg-porcelain/25" : "hairline")} />
    </div>
  );
}
