import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/projects/ProjectCard";
import { featuredProjects } from "@/content/projects";

export default function Selected() {
  return (
    <section className="relative bg-porcelain py-14 md:py-20 lg:py-24">
      <div className="shell">
        <Divider className="mb-12 md:mb-16" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <SectionLabel>Обрані роботи</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-balance text-[clamp(1.9rem,6.2vw,2.4rem)] lg:text-[clamp(2.1rem,2.7vw,2.9rem)]">
                Простори, які ми вже прожили разом із клієнтами
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Button href="/projects" variant="ghost" className="label text-clay">
              Усі проєкти
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 0.08}
              className={index === 0 ? "md:col-span-2 lg:col-span-1" : undefined}
            >
              {/* Перша картка на планшеті займає два стовпці — і про це треба
                  сказати next/image, інакше вона отримує кадр удвічі вужчий,
                  ніж потрібно, і виглядає м'якшою за сусідні. */}
              <ProjectCard
                project={project}
                sizes={
                  index === 0
                    ? "(max-width: 640px) 150vw, (max-width: 1024px) 150vw, 50vw"
                    : undefined
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
