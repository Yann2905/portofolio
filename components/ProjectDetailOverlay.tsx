"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useApp } from "@/lib/store";
import type { Project } from "@/lib/types";

export default function ProjectDetailOverlay({
  projects,
}: {
  projects: Project[];
}) {
  const selected = useApp((s) => s.selectedProjectId);
  const select = useApp((s) => s.selectProject);
  const project = projects.find((p) => p.id === selected);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="phone-scroll absolute inset-x-0 top-8 bottom-[86px] z-10 overflow-y-auto bg-bg"
        >
          <motion.div layoutId={`card-${project.id}`} className="relative">
            <motion.div
              layoutId={`cover-${project.id}`}
              className="relative h-56 w-full"
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="380px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
              <button
                onClick={() => select(null)}
                className="tap absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur"
              >
                <ArrowLeft className="h-4 w-4 text-white" />
              </button>
            </motion.div>

            <motion.div layoutId={`body-${project.id}`} className="px-5 pt-4">
              <div className="text-[10px] uppercase tracking-widest text-brand-soft">
                {project.year} · {project.role}
              </div>
              <h3 className="font-display mt-1 text-2xl font-bold text-white">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-white/60">{project.tagline}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-5 pb-8 pt-4"
            >
              <p className="text-sm leading-relaxed text-white/75">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[10px] font-medium text-brand-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.gallery.length > 1 && (
                <div className="phone-scroll mt-5 flex gap-3 overflow-x-auto">
                  {project.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        fill
                        sizes="192px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="tap flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-5 py-3.5 text-sm font-semibold text-white shadow-glow"
                  >
                    Voir la démo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="tap flex items-center justify-between rounded-2xl border border-white/10 bg-bg-card px-5 py-3.5 text-sm font-semibold text-white/90"
                  >
                    Code source
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
