import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center bg-porcelain pt-[var(--header-h)]">
      <Image
        src="/ornament.png"
        alt=""
        width={180}
        height={480}
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-1/2 h-[50vh] w-auto -translate-y-1/2 opacity-[0.09]"
      />
      <div className="shell relative">
        <span className="label text-clay">Сторінку не знайдено</span>
        <h1 className="mt-6 display text-[clamp(2.6rem,10vw,4rem)]">
          Тут поки порожній простір
        </h1>
        <p className="mt-6 max-w-md text-pretty leading-relaxed text-taupe">
          Схоже, сторінку перенесли або її ще не створено. Поверніться на головну або
          подивіться проєкти студії.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/">На головну</Button>
          <Button href="/projects" variant="outline">
            Дивитись проєкти
          </Button>
        </div>
        <Link href="/#contact" className="mt-10 inline-block label text-clay hover:text-wine">
          Або напишіть нам
        </Link>
      </div>
    </section>
  );
}
