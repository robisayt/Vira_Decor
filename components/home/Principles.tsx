import Image from "next/image";
import Divider from "@/components/ui/Divider";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { principles } from "@/content/site";

export default function Principles() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-porcelain md:py-28 lg:py-36">
      <Image
        src="/ornament-light.png"
        alt=""
        width={180}
        height={480}
        aria-hidden
        className="pointer-events-none absolute -left-12 top-1/2 h-[70%] w-auto -translate-y-1/2 opacity-[0.07] lg:left-[6%]"
      />

      <div className="shell relative">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel variant="light">{principles.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 display text-balance text-[clamp(2rem,6.4vw,2.6rem)] lg:text-[clamp(2.4rem,3.2vw,3.4rem)]">
              {principles.title}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden border border-porcelain/10 bg-porcelain/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {principles.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 0.05}
              className="group relative bg-ink p-7 transition-colors duration-700 hover:bg-wine md:p-9"
            >
              <span
                aria-hidden
                className="block h-px w-8 bg-porcelain/30 transition-all duration-700 ease-silk group-hover:w-16 group-hover:bg-porcelain/70"
              />
              <h3 className="mt-6 font-display text-2xl font-light">{item.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-porcelain/55 transition-colors duration-700 group-hover:text-porcelain/80">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ul>

        <Divider variant="light" className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}
