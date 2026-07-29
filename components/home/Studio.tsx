import Counter from "@/components/ui/Counter";
import Divider from "@/components/ui/Divider";
import Frame from "@/components/ui/Frame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { studio } from "@/content/site";

export default function Studio() {
  return (
    <section id="studio" className="relative bg-porcelain py-14 md:py-20 lg:py-24">
      <div className="shell">
        <Divider className="mb-12 md:mb-16" />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="group relative order-2 lg:order-1">
            <Frame
              src="/home/studio.jpg"
              alt="Салон Vira Decor"
              position="center"
              className="aspect-[4/3] w-full shadow-soft sm:aspect-[3/4]"
              sizes="(max-width: 1024px) 100vw, 38vw"
              quality={95}
            />
            {/* Головна цифра студії — акцент, а не просто підпис */}
            <div className="absolute -bottom-5 left-4 flex items-end gap-3 bg-porcelain px-5 py-4 shadow-soft md:left-6">
              <span className="font-display text-5xl font-light leading-none text-wine md:text-6xl">
                18
              </span>
              <span className="label pb-1.5 text-clay">
                років
                <br />
                досвіду
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionLabel>{studio.label}</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-5 display text-balance text-[clamp(1.9rem,6.2vw,2.4rem)] lg:text-[clamp(2.1rem,2.7vw,2.9rem)]">
                {studio.title}
              </h2>
            </Reveal>

            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-taupe md:text-lg">
              {studio.body.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.14 + index * 0.06}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.22}>
              <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-clay/20 pt-7 sm:grid-cols-3">
                {studio.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-light text-wine md:text-4xl">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="mt-1.5 block label text-clay/80">{stat.label}</span>
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
