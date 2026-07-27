"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import { categories, projects } from "@/content/projects";
import { silk } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function ProjectsGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("Всі");

  const visible = useMemo(
    () => (active === "Всі" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div>
      {/* Фільтри: на телефоні гортаються горизонтально */}
      <div className="no-scrollbar -mx-[var(--shell-x)] flex gap-2 overflow-x-auto px-[var(--shell-x)] pb-1 md:mx-0 md:flex-wrap md:px-0">
        {categories.map((category) => {
          const count =
            category === "Всі"
              ? projects.length
              : projects.filter((p) => p.category === category).length;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              disabled={count === 0}
              className={cn(
                "shrink-0 border px-5 py-3 label transition-all duration-500 ease-silk",
                active === category
                  ? "border-wine bg-wine text-porcelain"
                  : "border-clay/30 text-taupe hover:border-clay/70 hover:text-ink",
                count === 0 && "cursor-not-allowed opacity-35 hover:border-clay/30",
              )}
            >
              {category}
              <span className="ml-2 opacity-50">{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: silk, delay: index * 0.04 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 border-t border-clay/25 pt-8 text-taupe">
          У цій категорії поки немає опублікованих кейсів. Оберіть іншу категорію або
          напишіть нам — покажемо роботи з архіву студії.
        </p>
      )}
    </div>
  );
}
