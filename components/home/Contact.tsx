import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { contactList, cta } from "@/content/site";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-wine py-20 text-porcelain md:py-28 lg:py-36">
      <Image
        src="/lace-light.png"
        alt=""
        width={756}
        height={1782}
        aria-hidden
        className="pointer-events-none absolute right-[-3rem] top-1/2 h-[85%] w-auto -translate-y-1/2 opacity-[0.09] md:right-[6%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 12% 0%, rgba(214,204,205,0.24), rgba(96,36,44,0) 62%)",
        }}
      />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel variant="light">{cta.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 display text-balance text-[clamp(2.1rem,7.4vw,2.8rem)] lg:text-[clamp(2.4rem,3.2vw,3.4rem)]">
                {cta.title}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-porcelain/70 md:text-lg">
                {cta.lead}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button
                href={cta.action.href}
                external
                className="mt-8 w-full bg-porcelain sm:w-auto text-ink hover:text-porcelain"
              >
                {cta.action.label}
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <ul className="border-t border-porcelain/20">
              {contactList.map((contact) => (
                <li key={contact.href}>
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 border-b border-porcelain/20 py-6 transition-colors duration-500"
                  >
                    <span className="label text-porcelain/45">{contact.label}</span>
                    <span className="font-display text-xl transition-transform duration-500 ease-silk group-hover:-translate-x-1 md:text-2xl">
                      {contact.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
