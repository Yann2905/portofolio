import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SkillForm from "@/components/admin/SkillForm";

export const dynamic = "force-dynamic";

export default async function NewSkillPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouvelle compétence</h1>
      <p className="mt-1 mb-6 text-sm text-white/50">
        Ajouter une compétence au portfolio
      </p>
      <SkillForm />
    </div>
  );
}
