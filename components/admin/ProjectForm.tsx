"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, Save, Upload, X } from "lucide-react";

interface ProjectFormData {
  _id?: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
  gallery: string[];
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  year: number;
  role: string;
  featured: boolean;
  order: number;
}

const empty: ProjectFormData = {
  title: "",
  tagline: "",
  description: "",
  cover: "",
  gallery: [],
  tags: [],
  demoUrl: "",
  codeUrl: "",
  year: new Date().getFullYear(),
  role: "",
  featured: false,
  order: 0,
};

async function uploadToCloudinary(file: File): Promise<string> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) {
    throw new Error("Cloudinary non configuré (.env.local)");
  }
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body: fd }
  );
  if (!res.ok) throw new Error("Upload échoué");
  const data = await res.json();
  return data.secure_url as string;
}

export default function ProjectForm({
  initial,
}: {
  initial?: Partial<ProjectFormData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>({ ...empty, ...initial });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<"cover" | "gallery" | null>(null);

  const update = <K extends keyof ProjectFormData>(
    k: K,
    v: ProjectFormData[K]
  ) => setForm((f) => ({ ...f, [k]: v }));

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("cover");
    try {
      const url = await uploadToCloudinary(file);
      update("cover", url);
      toast.success("Image uploadée");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(null);
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading("gallery");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadToCloudinary(file));
      }
      update("gallery", [...form.gallery, ...urls]);
      toast.success(`${urls.length} image(s) uploadée(s)`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(null);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (!form.tags.includes(t)) update("tags", [...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (t: string) =>
    update(
      "tags",
      form.tags.filter((x) => x !== t)
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      demoUrl: form.demoUrl || undefined,
      codeUrl: form.codeUrl || undefined,
    };
    const url = initial?._id ? `/api/projects/${initial._id}` : "/api/projects";
    const method = initial?._id ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      toast.success(initial?._id ? "Projet mis à jour" : "Projet créé");
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Erreur");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5">
      <Row>
        <Input
          label="Titre"
          value={form.title}
          onChange={(v) => update("title", v)}
          required
        />
        <Input
          label="Année"
          type="number"
          value={String(form.year)}
          onChange={(v) => update("year", parseInt(v) || 0)}
          required
        />
      </Row>

      <Input
        label="Tagline"
        value={form.tagline}
        onChange={(v) => update("tagline", v)}
        required
      />

      <Input
        label="Rôle"
        value={form.role}
        onChange={(v) => update("role", v)}
        placeholder="Ex: Lead Developer"
        required
      />

      <Textarea
        label="Description"
        value={form.description}
        onChange={(v) => update("description", v)}
        rows={5}
        required
      />

      {/* Cover upload */}
      <div>
        <Label>Image de couverture</Label>
        <div className="mt-1 flex items-center gap-3">
          {form.cover && (
            <div className="relative h-20 w-32 overflow-hidden rounded-xl border border-white/10">
              <Image src={form.cover} alt="cover" fill className="object-cover" />
            </div>
          )}
          <label className="tap flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 hover:bg-white/10">
            {uploading === "cover" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {form.cover ? "Changer" : "Uploader"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </label>
          <Input
            label=""
            value={form.cover}
            onChange={(v) => update("cover", v)}
            placeholder="ou coller une URL…"
          />
        </div>
      </div>

      {/* Gallery */}
      <div>
        <Label>Galerie</Label>
        <div className="mt-1 flex flex-wrap items-start gap-2">
          {form.gallery.map((url, i) => (
            <div
              key={i}
              className="group relative h-20 w-28 overflow-hidden rounded-xl border border-white/10"
            >
              <Image src={url} alt={`img ${i}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() =>
                  update(
                    "gallery",
                    form.gallery.filter((_, j) => j !== i)
                  )
                }
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
          <label className="tap flex h-20 w-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-white/20 text-white/50 hover:bg-white/5">
            {uploading === "gallery" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleGalleryUpload}
            />
          </label>
        </div>
      </div>

      {/* Tags */}
      <div>
        <Label>Tags (technos)</Label>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {form.tags.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[10px] font-medium text-brand-soft"
            >
              {t}
              <button
                type="button"
                onClick={() => removeTag(t)}
                className="text-white/60 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Next.js, TypeScript…"
            className="flex-1 rounded-xl border border-white/10 bg-bg-card/60 px-3 py-2 text-xs text-white outline-none focus:border-brand/60"
          />
          <button
            type="button"
            onClick={addTag}
            className="tap rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
          >
            Ajouter
          </button>
        </div>
      </div>

      <Row>
        <Input
          label="URL démo"
          value={form.demoUrl}
          onChange={(v) => update("demoUrl", v)}
          placeholder="https://…"
        />
        <Input
          label="URL code"
          value={form.codeUrl}
          onChange={(v) => update("codeUrl", v)}
          placeholder="https://github.com/…"
        />
      </Row>

      <Row>
        <label className="flex items-center gap-2 text-xs text-white/70">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          Projet mis en avant
        </label>
        <Input
          label="Ordre d'affichage"
          type="number"
          value={String(form.order)}
          onChange={(v) => update("order", parseInt(v) || 0)}
        />
      </Row>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="tap flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-glow px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {initial?._id ? "Enregistrer" : "Créer le projet"}
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

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] uppercase tracking-wider text-white/40">
      {children}
    </span>
  );
}
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      {label && <Label>{label}</Label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-xl border border-white/10 bg-bg-card/60 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        className="mt-1 w-full rounded-xl border border-white/10 bg-bg-card/60 px-4 py-2.5 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
