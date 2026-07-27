import BeforeAfter from "@/components/ui/BeforeAfter";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { result } from "@/content/site";

export default function Result() {
  return (
    <section id="result" className="relative bg-linen py-14 md:py-20 lg:py-24">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel>{result.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-[clamp(2.2rem,7vw,3rem)] lg:text-[clamp(2.6rem,3.6vw,3.8rem)]">
                {result.title}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-taupe md:text-lg">
                {result.lead}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 border-t border-clay/25 pt-5 label text-clay/80">
                {result.caption}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <BeforeAfter
              className="aspect-[4/5] w-full shadow-soft sm:aspect-[4/3] lg:aspect-[5/4]"
              beforeLabel={result.before}
              afterLabel={result.after}
            />
            <p className="mt-4 label text-clay/70">
              Потягніть ручку — або скористайтесь клавішами ← →
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
