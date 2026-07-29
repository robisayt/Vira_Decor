import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/home/Contact";
import FurnitureGallery from "@/components/furniture/FurnitureGallery";
import Divider from "@/components/ui/Divider";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { furnitureCategories, furnitureHero } from "@/content/furniture";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Меблі",
  description: `${furnitureHero.lead} ${site.name} — власне виробництво меблів під розмір простору.`,
};

export default function FurniturePage() {
  return (
    <>
      {/* Hero — без фото, тільки світло і фірмове кружево */}
      <section className="relative overflow-hidden bg-porcelain pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4.5rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 80% at 78% -18%, #D6CCCD 0%, rgba(214,204,205,0.4) 34%, rgba(254,254,254,0) 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(to top, rgba(145,115,113,0.12), rgba(254,254,254,0))",
          }}
        />
        <Image
          src="/lace.png"
          alt=""
          width={475}
          height={1120}
          aria-hidden
          className="pointer-events-none absolute -right-16 top-6 h-[48vh] w-auto opacity-[0.1] md:right-[6%] md:h-[62vh]"
        />

        <div className="shell relative pb-14 md:pb-20">
          <Reveal>
            <SectionLabel>{furnitureHero.eyebrow}</SectionLabel>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 display text-[clamp(3rem,15vw,4.5rem)] lg:text-[clamp(4rem,7vw,7rem)]">
              {furnitureHero.title}
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-taupe md:text-lg">
              {furnitureHero.lead}
            </p>
          </Reveal>

          {/* Швидкий перехід до категорії — лише назви, без описів */}
          <Reveal delay={0.2}>
            <nav className="no-scrollbar -mx-[var(--shell-x)] mt-10 flex gap-2 overflow-x-auto px-[var(--shell-x)] md:mx-0 md:flex-wrap md:px-0">
              {furnitureCategories.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="shrink-0 border border-clay/30 px-5 py-3 label text-taupe transition-colors duration-500 ease-silk hover:border-wine hover:text-wine"
                >
                  {category.title}
                </a>
              ))}
            </nav>
          </Reveal>

          <Divider className="mt-14 md:mt-20" />
        </div>
      </section>

      {/* Категорії */}
      {furnitureCategories.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          className={index % 2 === 0 ? "bg-porcelain py-12 md:py-16" : "bg-linen py-12 md:py-16"}
        >
          <div className="shell">
            <Reveal>
              <header className="flex items-end justify-between gap-6 border-b border-clay/25 pb-5">
                <h2 className="display text-[clamp(1.7rem,6vw,2.2rem)] lg:text-[clamp(2rem,2.6vw,2.7rem)]">
                  {category.title}
                </h2>
                <span className="label shrink-0 text-clay/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </header>
            </Reveal>

            <div className="mt-8 md:mt-10">
              <FurnitureGallery category={category} />
            </div>
          </div>
        </section>
      ))}

      <Contact />
    </>
  );
}
