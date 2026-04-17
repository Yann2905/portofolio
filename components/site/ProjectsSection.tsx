"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Sélection"
            title={
              <>
                Des produits livrés,
                <br />
                <span className="text-gradient-brand">en production.</span>
              </>
            }
            description="Quelques réalisations récentes : SaaS, fintech, marketplace et plateformes pédagogiques. Du design system à la mise en prod."
          />
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10"
          >
            Discuter d&apos;un projet <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-12">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              className={
                i === 0
                  ? "lg:col-span-7"
                  : i === 1
                    ? "lg:col-span-5"
                    : i === 2
                      ? "lg:col-span-5"
                      : "lg:col-span-7"
              }
              priority={i < 2}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  className = "",
  priority = false,
  index,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  index: number;
}) {
  const href = project.demoUrl && project.demoUrl !== "#" ? project.demoUrl : undefined;
  const Tag = href ? "a" : "div";
  const tagProps = href
    ? { href, target: "_blank", rel: "noreferrer noopener" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Tag
        {...tagProps}
        className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-bg-card/50 transition-all hover:border-white/20 hover:shadow-glow"
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/30 to-transparent" />
          <div className="absolute right-4 top-4 flex items-center gap-2">
            {project.codeUrl && project.codeUrl !== "#" && (
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-bg-card/70 text-white/80 backdrop-blur">
                <Github className="h-4 w-4" />
              </span>
            )}
            {href && (
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white text-bg-card transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="relative p-5 sm:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {project.year}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>{project.role}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-white/60">{project.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          {(project.demoUrl || project.codeUrl) && (
            <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
              {href && (
                <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-brand-soft">
                  <ExternalLink className="h-3.5 w-3.5" /> Voir la démo
                </span>
              )}
              {project.codeUrl && project.codeUrl !== "#" && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="h-3.5 w-3.5" /> Code source
                </a>
              )}
            </div>
          )}
        </div>
      </Tag>
    </motion.div>
  );
}
