import type { Metadata } from "next";
import Image from "next/image";
import Divider from "@/components/ui/Divider";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Contact from "@/components/home/Contact";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Проєкти",
  description:
    "Портфоліо студії Vira Decor: квартири, будинки та окремі кімнати — планування, дизайн, візуалізація та меблі під розмір.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-porcelain pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+3.5rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 70% at 82% -20%, #D6CCCD 0%, rgba(254,254,254,0) 62%)",
          }}
        />
        <Image
          src="/lace.png"
          alt=""
          width={756}
          height={1782}
          aria-hidden
          className="pointer-events-none absolute -right-10 top-10 h-[46vh] w-auto opacity-[0.1] md:right-[6%]"
        />

        <div className="shell relative">
          <Reveal>
            <SectionLabel>Портфоліо · {String(projects.length).padStart(2, "0")} кейсів</SectionLabel>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 display text-[clamp(2.6rem,10vw,3.6rem)] lg:text-[clamp(3.4rem,4.6vw,5.2rem)]">
              Проєкти студії
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-lg text-pretty leading-relaxed text-taupe md:text-lg">
              Квартири, будинки й окремі кімнати. У кожному кейсі — планування, дизайн,
              візуалізація та меблі, виготовлені під розмір простору.
            </p>
          </Reveal>

          <Divider className="mt-10 md:mt-14" />
        </div>
      </section>

      <section className="bg-porcelain pb-14 pt-10 md:pb-20 md:pt-12">
        <div className="shell">
          <ProjectsGrid />
        </div>
      </section>

      <Contact />
    </>
  );
}
