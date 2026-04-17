import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  let projects: {
    _id: string;
    title: string;
    tagline: string;
    cover: string;
    year: number;
    tags: string[];
  }[] = [];
  let dbError: string | null = null;

  if (isDbConfigured()) {
    try {
      await connectDB();
      const docs = await Project.find({})
        .sort({ order: 1, createdAt: -1 })
        .lean();
      projects = docs.map((d) => ({
        _id: String(d._id),
        title: d.title,
        tagline: d.tagline,
        cover: d.cover,
        year: d.year,
        tags: d.tags ?? [],
      }));
    } catch (e) {
      console.error("[admin projects list]", e);
      dbError = (e as Error).message || "Erreur de connexion à la base";
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Projets</h1>
          <p className="mt-1 text-sm text-white/50">{projects.length} projets</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="tap inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-4 py-2.5 text-sm font-semibold text-white shadow-glow sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Nouveau projet
        </Link>
      </div>

      {dbError && (
        <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          <strong>Erreur MongoDB.</strong>{" "}
          <span className="opacity-80">{dbError}</span>
        </div>
      )}

      {projects.length === 0 && !dbError ? (
        <div className="rounded-2xl border border-white/10 bg-bg-card p-10 text-center text-sm text-white/50">
          Aucun projet. Cliquez sur <strong>Nouveau projet</strong> pour
          commencer.
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-bg-card p-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-24">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">
                  {p.title}{" "}
                  <span className="text-[10px] text-white/40">· {p.year}</span>
                </div>
                <div className="truncate text-xs text-white/50">{p.tagline}</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:flex-shrink-0">
                <Link
                  href={`/admin/projects/${p._id}/edit`}
                  className="tap flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-white/80 hover:bg-white/10 sm:flex-none"
                >
                  Modifier
                </Link>
                <DeleteProjectButton id={p._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
