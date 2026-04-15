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

  if (isDbConfigured()) {
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
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Projets</h1>
          <p className="mt-1 text-sm text-white/50">{projects.length} projets</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="tap flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <Plus className="h-4 w-4" />
          Nouveau projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-bg-card p-10 text-center text-sm text-white/50">
          Aucun projet. Cliquez sur <strong>Nouveau projet</strong> pour
          commencer.
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-3"
            >
              <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="96px"
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
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${p._id}/edit`}
                  className="tap rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
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
