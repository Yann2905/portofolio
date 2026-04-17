"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

type Category = "Frontend" | "Backend" | "Mobile" | "DevOps" | "Design";

interface SkillFormData {
  _id?: string;
  name: string;
  level: number;
  category: Category;
  order: number;
}

const empty: SkillFormData = {
  name: "",
  level: 80,
  category: "Frontend",
  order: 0,
};

const categories: Category[] = [
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Design",
];

export default function SkillForm({
  initial,
}: {
  initial?: Partial<SkillFormData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<SkillFormData>({ ...empty, ...initial });
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof SkillFormData>(k: K, v: SkillFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = initial?._id ? `/api/skills/${initial._id}` : "/api/skills";
    const method = initial?._id ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        level: form.level,
        category: form.category,
        order: form.order,
      }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success(initial?._id ? "Compétence mise à jour" : "Compétence créée");
      router.push("/admin/skills");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Erreur");
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-2xl space-y-5">
      <label className="block">
        <span className="block text-[10px] uppercase tracking-wider text-white/40">
          Nom
        </span>
        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
          placeholder="Ex: React / Next.js"
          className="mt-1 w-full rounded-xl border border-white/10 bg-bg-card/60 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <label className="block">
        <span className="block text-[10px] uppercase tracking-wider text-white/40">
          Catégorie
        </span>
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value as Category)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-bg-card/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand/60"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-bg-card text-white">
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block text-[10px] uppercase tracking-wider text-white/40">
          Niveau : {form.level}%
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={form.level}
          onChange={(e) => update("level", parseInt(e.target.value))}
          className="mt-2 w-full accent-brand"
        />
      </label>

      <label className="block">
        <span className="block text-[10px] uppercase tracking-wider text-white/40">
          Ordre d&apos;affichage
        </span>
        <input
          type="number"
          value={form.order}
          onChange={(e) => update("order", parseInt(e.target.value) || 0)}
          className="mt-1 w-full rounded-xl border border-white/10 bg-bg-card/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand/60"
        />
      </label>

      <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="tap flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {initial?._id ? "Enregistrer" : "Créer"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="tap rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
