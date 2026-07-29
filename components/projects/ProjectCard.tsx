import Link from "next/link";
import Frame from "@/components/ui/Frame";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  /** Велика картка на десктопі — для перших кейсів у сітці. */
  wide?: boolean;
  /**
   * Ширина плитки для next/image. Передається лише там, де картка займає
   * більше місця, ніж у звичайній сітці (наприклад, md:col-span-2 на головній).
   */
  sizes?: string;
  className?: string;
};

/**
 * Чому sizes більший за саму плитку.
 *
 * Обкладинки кейсів горизонтальні (16:9 … 3:2), а рамка вертикальна (4:5).
 * object-cover масштабує кадр по ВИСОТІ, тому картинці треба бути приблизно
 * в 1,5 раза ширшою за плитку — інакше браузер тягне те, що прийшло, і
 * зображення м'якшає. Раніше тут стояла ширина самої плитки (33vw), звідси
 * й було мило на обраних роботах.
 */
const COVER_SIZES = "(max-width: 640px) 150vw, (max-width: 1024px) 75vw, 50vw";
const COVER_SIZES_WIDE = "(max-width: 1024px) 100vw, 60vw";

export default function ProjectCard({
  project,
  wide = false,
  sizes,
  className,
}: ProjectCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/projects/${project.slug}`} className="block outline-none">
        <div className="relative overflow-hidden">
          <Frame
            src={project.cover}
            alt={project.title}
            tex={project.tex}
            className={cn("w-full", wide ? "aspect-[16/11]" : "aspect-[4/5]")}
            sizes={sizes ?? (wide ? COVER_SIZES_WIDE : COVER_SIZES)}
            quality={95}
          />

          {/* Затемнення і підпис, що виїжджає */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 ease-silk group-hover:bg-ink/25"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-700 ease-silk group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
            <span className="inline-flex items-center gap-3 bg-porcelain px-5 py-3 label text-ink">
              Переглянути
              <span aria-hidden className="h-px w-6 bg-wine" />
            </span>
          </div>

          <span className="absolute left-0 top-0 bg-porcelain/90 px-4 py-2 label text-clay backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5 border-t border-clay/25 pt-4">
          <div className="min-w-0">
            <h3 className="display text-2xl text-ink transition-colors duration-500 group-hover:text-wine md:text-[1.75rem]">
              {project.title}
            </h3>
            <p className="mt-2 text-pretty leading-relaxed text-taupe">{project.summary}</p>
          </div>
          <span className="shrink-0 text-right">
            <span className="block label text-clay/80">{project.area}</span>
            <span className="mt-1 block label text-clay/50">{project.year}</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
