import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") redirect("/admin/login");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouveau projet</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">
        Ajoutez un projet au portfolio
      </p>
      <ProjectForm />
    </div>
  );
}
