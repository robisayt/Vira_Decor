import Picture from "@/components/ui/Picture";
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
    <div className={cn("flex items-center gap-4 md:gap-8", className)} aria-hidden>
      <span className={cn("h-px flex-1", variant === "light" ? "bg-porcelain/25" : "hairline")} />
      <Picture
        src={variant === "light" ? "/lace-h-light-sm.png" : "/lace-h-sm.png"}
        alt=""
        width={448}
        height={190}
        className={cn(
          "w-auto",
          size === "sm" ? "h-9 md:h-8" : "h-12 md:h-12",
          variant === "light" ? "opacity-75" : "opacity-65",
        )}
      />
      <span className={cn("h-px flex-1", variant === "light" ? "bg-porcelain/25" : "hairline")} />
    </div>
  );
}
