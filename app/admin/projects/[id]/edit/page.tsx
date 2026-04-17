import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  if (!isDbConfigured()) notFound();

  await connectDB();
  const doc = await Project.findById(params.id).lean();
  if (!doc) notFound();

  const d = doc as unknown as {
    _id: unknown;
    title: string;
    tagline: string;
    description: string;
    cover: string;
    gallery: string[];
    tags: string[];
    demoUrl?: string;
    codeUrl?: string;
    year: number;
    role: string;
    featured: boolean;
    order: number;
  };

  const initial = {
    _id: String(d._id),
    title: d.title,
    tagline: d.tagline,
    description: d.description,
    cover: d.cover,
    gallery: d.gallery ?? [],
    tags: d.tags ?? [],
    demoUrl: d.demoUrl ?? "",
    codeUrl: d.codeUrl ?? "",
    year: d.year,
    role: d.role,
    featured: d.featured ?? false,
    order: d.order ?? 0,
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Modifier le projet</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">{initial.title}</p>
      <ProjectForm initial={initial} />
    </div>
  );
}
