import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 label transition-colors duration-500 ease-silk";

const styles: Record<Variant, string> = {
  solid: "bg-wine text-porcelain",
  outline: "border border-clay/45 text-ink hover:text-porcelain",
  ghost: "text-ink hover:text-wine px-0 py-2",
};

/** Кнопка із заливкою, що виїжджає знизу — тиха, але помітна мікровзаємодія. */
export default function Button({
  href,
  children,
  variant = "solid",
  className,
  external,
}: ButtonProps) {
  const inner = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-silk group-hover:scale-y-100",
            variant === "solid" ? "bg-ink" : "bg-wine",
          )}
        />
      )}
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 h-px w-6 bg-current transition-all duration-500 ease-silk group-hover:w-9"
      />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, styles[variant], className)}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {inner}
    </Link>
  );
}
