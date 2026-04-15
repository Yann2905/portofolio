"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { useApp } from "@/lib/store";

export default function ProjectsScreen({ projects }: { projects: Project[] }) {
  const select = useApp((s) => s.selectProject);

  return (
    <div className="min-h-full">
      <div className="px-5 pt-4">
        <div className="text-[11px] uppercase tracking-widest text-brand-soft">
          Portfolio
        </div>
        <h2 className="font-display mt-1 text-2xl font-bold text-white">
          Projets sélectionnés
        </h2>
        <p className="mt-1 text-xs text-white/50">
          {projects.length} projets · Tapez pour explorer
        </p>
      </div>

      <div className="mt-5 space-y-3 px-5 pb-6">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            layoutId={`card-${p.id}`}
            onClick={() => select(p.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="tap group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-bg-card text-left"
          >
            <motion.div
              layoutId={`cover-${p.id}`}
              className="relative h-36 w-full overflow-hidden"
            >
              <Image
                src={p.cover}
                alt={p.title}
                fill
                sizes="380px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/40 to-transparent" />
              <div className="absolute bottom-2 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                {p.year} · {p.role}
              </div>
            </motion.div>
            <motion.div layoutId={`body-${p.id}`} className="p-4">
              <h3 className="font-display text-base font-bold text-white">
                {p.title}
              </h3>
              <p className="mt-0.5 text-xs text-white/60">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
