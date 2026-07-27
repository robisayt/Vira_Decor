import { cn } from "@/lib/utils";

/** Ейбров секції: коротка лінія + трекінговий підпис. */
export default function SectionLabel({
  children,
  className,
  variant = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn("h-px w-8", variant === "light" ? "bg-porcelain/50" : "bg-clay/60")}
      />
      <span className={cn("label", variant === "light" ? "text-porcelain/70" : "text-clay")}>
        {children}
      </span>
    </span>
  );
}
