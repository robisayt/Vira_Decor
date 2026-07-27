import Frame from "@/components/ui/Frame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { materials } from "@/content/site";

export default function Materials() {
  return (
    <section className="relative overflow-hidden bg-porcelain py-20 md:py-28 lg:py-36">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <SectionLabel>{materials.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-balance text-[clamp(2rem,6.4vw,2.6rem)] lg:text-[clamp(2.4rem,3.2vw,3.4rem)]">
                {materials.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-pretty leading-relaxed text-taupe">{materials.lead}</p>
          </Reveal>
        </div>
      </div>

      {/* Стрічка з горизонтальним скролом — на телефоні гортається пальцем */}
      <Reveal delay={0.1}>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--shell-x)] pb-4 md:mt-16 md:gap-6">
          {materials.items.map((item) => (
            <article
              key={item.name}
              className="group w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-[24vw]"
            >
              <Frame
                tex={item.tex}
                className="aspect-[3/4] w-full"
                sizes="(max-width: 640px) 74vw, (max-width: 1024px) 46vw, 24vw"
              />
              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-full border border-clay/30"
                  style={{ backgroundColor: item.swatch }}
                />
                <div className="min-w-0">
                  <h3 className="font-display text-lg text-ink">{item.name}</h3>
                  <p className="label mt-0.5 text-clay/70">{item.note}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
