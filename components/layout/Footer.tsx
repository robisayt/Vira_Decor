import Image from "next/image";
import Link from "next/link";
import { contactList, nav, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-porcelain">
      <Image
        src="/lace-light.png"
        alt=""
        width={756}
        height={1782}
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-16 h-[420px] w-auto opacity-[0.06] md:right-[8%] md:h-[560px]"
      />

      <div className="shell relative py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <Image
              src="/logo-light.png"
              alt={site.name}
              width={1136}
              height={599}
              className="h-11 w-auto md:h-14"
            />
            <p className="mt-7 max-w-sm text-pretty text-porcelain/60">
              Дизайн інтер'єру, планування, візуалізація та меблі власного виробництва.
              {" "}
              {site.city} і область, робота онлайн — по всій Україні.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <span className="label text-porcelain/35">Навігація</span>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-porcelain/75 transition-colors duration-500 hover:text-porcelain"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="label text-porcelain/35">Контакти</span>
              <ul className="mt-5 space-y-3">
                {contactList.map((contact) => (
                  <li key={contact.href}>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex flex-col"
                    >
                      <span className="label text-porcelain/30">{contact.label}</span>
                      <span className="text-porcelain/85 transition-colors duration-500 group-hover:text-porcelain">
                        {contact.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-porcelain/10 pt-7 text-porcelain/40 sm:flex-row sm:items-center sm:justify-between">
          <span className="label">
            © {new Date().getFullYear()} {site.name} · {site.tagline}
          </span>
          <span className="label">Створення інтер'єрів під ключ</span>
        </div>
      </div>
    </footer>
  );
}
