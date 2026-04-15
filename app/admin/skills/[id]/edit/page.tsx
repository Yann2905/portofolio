import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Skill } from "@/lib/models/Skill";
import SkillForm from "@/components/admin/SkillForm";

export const dynamic = "force-dynamic";

export default async function EditSkillPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  if (!isDbConfigured()) notFound();

  await connectDB();
  const doc = await Skill.findById(params.id).lean();
  if (!doc) notFound();

  const d = doc as unknown as {
    _id: unknown;
    name: string;
    level: number;
    category: "Frontend" | "Backend" | "Mobile" | "DevOps" | "Design";
    order: number;
  };

  const initial = {
    _id: String(d._id),
    name: d.name,
    level: d.level,
    category: d.category,
    order: d.order ?? 0,
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Modifier la compétence</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">{initial.name}</p>
      <SkillForm initial={initial} />
    </div>
  );
}
