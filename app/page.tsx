import Hero from "@/components/home/Hero";
import Studio from "@/components/home/Studio";
import Directions from "@/components/home/Directions";
import Materials from "@/components/home/Materials";
import Selected from "@/components/home/Selected";
import Contact from "@/components/home/Contact";

/**
 * Головна сторінка.
 * Порядок секцій можна змінювати — кожна секція самодостатня.
 *
 * Тимчасово вимкнено (файли залишились у components/home/, повернути одним рядком,
 * коли з'являться фото та відгуки):
 *   <Principles />  — «Чому нам довіряють»
 *   <Result />      — «Як виглядає результат» / «До / Після»
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Studio />
      <Directions />
      <Materials />
      <Selected />
      <Contact />
    </>
  );
}
