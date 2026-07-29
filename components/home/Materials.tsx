import Divider from "@/components/ui/Divider";
import Frame from "@/components/ui/Frame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { materials } from "@/content/site";

const BOX: Record<string, string> = {
  square: "aspect-square",
  tall: "aspect-[4/5]",
  wide: "aspect-[16/10]",
};

export default function Materials() {
  return (
    <section className="relative overflow-hidden bg-porcelain py-14 md:py-20 lg:py-24">
      <div className="shell">
        <Divider className="mb-12 md:mb-16" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <SectionLabel>{materials.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-balance text-[clamp(1.9rem,6.2vw,2.4rem)] lg:text-[clamp(2.1rem,2.7vw,2.9rem)]">
                {materials.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-pretty leading-relaxed text-taupe">{materials.lead}</p>
          </Reveal>
        </div>

        {/* Сітка мудбордів: перший кадр ширший, решта у три колонки. */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 md:grid-cols-4 md:gap-6">
          {materials.items.map((item, index) => (
            <Reveal
              as="figure"
              key={item.src}
              delay={index * 0.07}
            >
              <div className="group relative">
                <Frame
                  src={item.src}
                  alt={item.caption}
                  className={`${BOX[item.ratio] ?? BOX.tall} w-full`}
                  position="center"
                  /* Мудборди вертикальніші за рамку 4:5, тому object-cover
                     масштабує їх по висоті: запит має бути на ~20% ширший за
                     саму плитку, інакше кадр добивається масштабуванням. */
                  sizes="(max-width: 768px) 62vw, 30vw"
                  quality={95}
                />
              </div>
              <figcaption className="mt-3 label text-clay/75">{item.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
