import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/projects/ProjectCard";
import { featuredProjects } from "@/content/projects";

export default function Selected() {
  return (
    <section className="relative bg-porcelain py-20 md:py-28 lg:py-36">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <SectionLabel>Обрані роботи</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-balance text-[clamp(2rem,6.4vw,2.6rem)] lg:text-[clamp(2.4rem,3.2vw,3.4rem)]">
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

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 0.08}
              className={index === 0 ? "md:col-span-2 lg:col-span-1" : undefined}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
