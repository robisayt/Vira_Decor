import Counter from "@/components/ui/Counter";
import Divider from "@/components/ui/Divider";
import Frame from "@/components/ui/Frame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { studio } from "@/content/site";

export default function Studio() {
  return (
    <section id="studio" className="relative bg-porcelain py-20 md:py-28 lg:py-36">
      <div className="shell">
        <Divider className="mb-16 md:mb-24" />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="group relative order-2 lg:order-1">
            <Frame
              tex="tex-4"
              className="aspect-[4/5] w-full shadow-soft"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div
              aria-hidden
              className="absolute -bottom-5 -right-5 hidden h-24 w-24 border border-clay/35 md:block"
            />
          </div>

          <div className="order-1 lg:order-2 lg:pt-6">
            <Reveal>
              <SectionLabel>{studio.label}</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-balance text-[clamp(2rem,6.4vw,2.6rem)] lg:text-[clamp(2.4rem,3.2vw,3.4rem)]">
                {studio.title}
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-pretty leading-relaxed text-taupe md:text-lg">
              {studio.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.14 + index * 0.06}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <dl className="mt-12 grid gap-8 border-t border-clay/20 pt-8 sm:grid-cols-3">
                {studio.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-4xl font-light text-wine md:text-5xl">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="mt-2 block label text-clay/80">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
