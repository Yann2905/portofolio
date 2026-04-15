import PhoneShell from "@/components/PhoneShell";
import DesktopDecor from "@/components/DesktopDecor";
import { getProjects, getSkills } from "@/lib/data-service";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div className="hidden min-h-[100dvh] items-center justify-center md:flex">
        <div className="flex items-center gap-10 px-8 lg:gap-20 xl:gap-28">
          <DesktopDecor side="left" />
          <PhoneShell projects={projects} skills={skills} />
          <DesktopDecor side="right" />
        </div>
      </div>

      <div className="fixed inset-0 md:hidden">
        <PhoneShell projects={projects} skills={skills} />
      </div>
    </main>
  );
}
