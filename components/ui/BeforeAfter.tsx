"use client";

import { useCallback, useRef, useState } from "react";
import Frame from "@/components/ui/Frame";
import { cn } from "@/lib/utils";

type BeforeAfterProps = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeTex?: string;
  afterTex?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

/**
 * Порівняння «до / після»: тягніть ручку, клавіші ← → теж працюють.
 * Коли з'являться фото — передайте beforeSrc / afterSrc.
 */
export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeTex = "tex-2",
  afterTex = "tex-1",
  beforeLabel = "До",
  afterLabel = "Після",
  className,
}: BeforeAfterProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);

  const move = useCallback((clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    setDragging(true);
    move(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging) return;
    move(event.clientX);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "group relative select-none overflow-hidden bg-linen touch-none",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Frame src={afterSrc} tex={afterTex} ornament={false} className="absolute inset-0" />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Frame src={beforeSrc} tex={beforeTex} ornament={false} className="absolute inset-0" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 bg-porcelain/85 px-3 py-1.5 label text-ink md:left-6 md:top-6">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 bg-wine px-3 py-1.5 label text-porcelain md:right-6 md:top-6">
        {afterLabel}
      </span>

      <div
        className="absolute inset-y-0 w-px bg-porcelain/90"
        style={{ left: `${position}%` }}
        aria-hidden
      />

      <button
        type="button"
        role="slider"
        aria-label="Порівняння до і після"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-porcelain/70 bg-porcelain/25 backdrop-blur-sm transition-transform duration-300 ease-silk hover:scale-105 md:h-14 md:w-14"
        style={{ left: `${position}%` }}
      >
        <span className="flex items-center gap-1.5 text-porcelain" aria-hidden>
          <span className="block h-3 w-px bg-current" />
          <span className="block h-5 w-px bg-current" />
          <span className="block h-3 w-px bg-current" />
        </span>
      </button>
    </div>
  );
}
