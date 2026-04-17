import { getProjects, getSkills } from "@/lib/data-service";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import ProjectsSection from "@/components/site/ProjectsSection";
import SkillsSection from "@/components/site/SkillsSection";
import AboutSection from "@/components/site/AboutSection";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
