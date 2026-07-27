import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Frame from "@/components/ui/Frame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Contact from "@/components/home/Contact";
import { getProject, projects } from "@/content/projects";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Проєкт не знайдено" };

  return {
    title: project.title,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { label: "Тип об'єкта", value: project.category },
    { label: "Площа", value: project.area },
    { label: "Локація", value: project.location },
    { label: "Рік", value: project.year },
    { label: "Статус", value: project.status },
  ];

  return (
    <>
      <section className="relative bg-porcelain pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <div className="shell">
          <Reveal>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 label text-clay transition-colors duration-500 hover:text-wine"
            >
              <span aria-hidden className="h-px w-8 bg-current transition-all duration-500 group-hover:w-4" />
              Усі проєкти
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <Reveal>
              <h1 className="display text-[clamp(2.4rem,9vw,3.4rem)] lg:text-[clamp(3rem,4.2vw,4.6rem)]">
                {project.title}
              </h1>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-taupe md:text-lg">
                {project.summary}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-clay/25 pt-6 sm:grid-cols-3 lg:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="label text-clay/70">{fact.label}</dt>
                    <dd className="mt-1.5 font-display text-lg text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-12 md:mt-16">
            <Frame
              src={project.cover}
              alt={project.title}
              tex={project.tex}
              className="aspect-[4/5] w-full shadow-soft sm:aspect-[16/10]"
              sizes="100vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-12 md:py-16">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionLabel>Про проєкт</SectionLabel>
            </Reveal>
            <div className="mt-7 space-y-5 text-pretty leading-relaxed text-taupe md:text-lg">
              {project.description.map((paragraph, i) => (
                <Reveal key={paragraph} delay={0.06 * i}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <Reveal>
              <span className="label text-clay/70">Обсяг робіт</span>
              <ul className="mt-5 border-t border-clay/25">
                {project.scope.map((item) => (
                  <li key={item} className="border-b border-clay/25 py-3.5 text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <span className="label text-clay/70">Палітра проєкту</span>
              <ul className="mt-5 flex flex-wrap gap-3">
                {project.palette.map((color) => (
                  <li key={color.hex} className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="h-8 w-8 border border-clay/25"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="label text-taupe">{color.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Галерея — коли з'являться фото, додайте src у content/projects.ts */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-linen py-12 md:py-16">
          <div className="shell">
            <Reveal>
              <SectionLabel>Галерея</SectionLabel>
            </Reveal>

            <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2">
              {project.gallery.map((shot, i) => (
                <Reveal
                  as="figure"
                  key={shot.caption}
                  delay={i * 0.06}
                  className={i % 3 === 0 ? "md:col-span-2" : undefined}
                >
                  <Frame
                    src={shot.src}
                    alt={shot.caption}
                    tex={shot.tex}
                    className={i % 3 === 0 ? "aspect-[16/9] w-full" : "aspect-[4/5] w-full"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <figcaption className="mt-3 label text-clay/70">{shot.caption}</figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-porcelain py-12 md:py-16">
        <div className="shell">
          <Divider className="mb-12 md:mb-16" />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="label text-clay/70">Наступний проєкт</span>
              <p className="mt-3 display text-[clamp(1.8rem,6vw,2.4rem)]">{next.title}</p>
            </div>
            <Button href={`/projects/${next.slug}`} variant="outline">
              Дивитись далі
            </Button>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
