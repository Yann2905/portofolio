import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Skill } from "@/lib/models/Skill";
import DeleteSkillButton from "@/components/admin/DeleteSkillButton";

export const dynamic = "force-dynamic";

export default async function SkillsAdminPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  let skills: {
    _id: string;
    name: string;
    level: number;
    category: string;
    order: number;
  }[] = [];
  let dbError: string | null = null;

  if (isDbConfigured()) {
    try {
      await connectDB();
      const docs = await Skill.find({}).sort({ order: 1, createdAt: -1 }).lean();
      skills = docs.map((d) => ({
        _id: String(d._id),
        name: d.name,
        level: d.level,
        category: d.category,
        order: d.order ?? 0,
      }));
    } catch (e) {
      console.error("[admin skills list]", e);
      dbError = (e as Error).message || "Erreur de connexion à la base";
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Compétences</h1>
          <p className="mt-1 text-sm text-white/50">
            {skills.length} compétence(s)
          </p>
        </div>
        <Link
          href="/admin/skills/new"
          className="tap flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
        >
          <Plus className="h-4 w-4" />
          Nouvelle
        </Link>
      </div>

      {dbError && (
        <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          <strong>Erreur MongoDB.</strong>{" "}
          <span className="opacity-80">{dbError}</span>
        </div>
      )}

      {skills.length === 0 && !dbError ? (
        <div className="rounded-2xl border border-white/10 bg-bg-card p-10 text-center text-sm text-white/50">
          Aucune compétence. Cliquez sur <strong>Nouvelle</strong> pour
          commencer.
        </div>
      ) : (
        <div className="grid gap-3">
          {skills.map((s) => (
            <div
              key={s._id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-bg-card p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-semibold text-white">
                    {s.name}
                  </div>
                  <span className="text-[10px] font-medium text-brand-soft">
                    {s.level}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
                <div className="mt-1.5 text-[9px] uppercase tracking-wider text-white/40">
                  {s.category}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:flex-shrink-0">
                <Link
                  href={`/admin/skills/${s._id}/edit`}
                  className="tap flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-medium text-white/80 hover:bg-white/10 sm:flex-none"
                >
                  Modifier
                </Link>
                <DeleteSkillButton id={s._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
