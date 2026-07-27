import Hero from "@/components/home/Hero";
import Studio from "@/components/home/Studio";
import Directions from "@/components/home/Directions";
import Materials from "@/components/home/Materials";
import Principles from "@/components/home/Principles";
import Result from "@/components/home/Result";
import Selected from "@/components/home/Selected";
import Contact from "@/components/home/Contact";

/**
 * Головна сторінка.
 * Порядок секцій можна змінювати — кожна секція самодостатня.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Studio />
      <Directions />
      <Materials />
      <Principles />
      <Result />
      <Selected />
      <Contact />
    </>
  );
}
