import type { Project, Skill } from "./types";

export const profile = {
  name: "Yann Aristide Telessie",
  shortName: "Yann Telessie",
  role: "Développeur Full Stack Web & Mobile",
  title: "Développeur Full Stack Web & Mobile",
  location: "Tazibouo, Daloa, Côte d'Ivoire",
  email: "yannaristidetelessie@gmail.com",
  phone: "+225 0575343846",
  website: "https://yannaristide.vercel.app/",
  tagline: "Je transforme des idées en produits digitaux performants.",
  bio: `Développeur Full Stack titulaire d'un BTS en Développement d'Applications.
Expérience en développement web et mobile avec Flutter, Next.js, Laravel et Supabase.
Concepteur de solutions SaaS et d'applications métier destinées à des utilisateurs réels dans les secteurs de la restauration, de l'éducation et des organisations religieuses.`,
  socials: {
    github: "https://github.com/Yann2905",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
  },
  stats: [
    { label: "Projets réalisés", value: "5+" },
    { label: "Années d'exp.", value: "2+" },
    { label: "Technologies", value: "12+" },
  ],
};

// Projets ajoutés via le panneau admin (un par un).
// Le site public lit la base de données ; cette liste sert de fallback quand la DB est vide.
export const projects: Project[] = [];

export const skills: Skill[] = [
  { name: "Next.js / React", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "JavaScript", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 85, category: "Frontend" },
  { name: "Laravel", level: 85, category: "Backend" },
  { name: "PHP", level: 85, category: "Backend" },
  { name: "Supabase", level: 85, category: "Backend" },
  { name: "MySQL / SQL", level: 80, category: "Backend" },
  { name: "Flutter", level: 80, category: "Mobile" },
  { name: "Dart", level: 80, category: "Mobile" },
  { name: "Git / GitHub", level: 85, category: "DevOps" },
  { name: "Cloudinary", level: 75, category: "DevOps" },
  { name: "FCM", level: 75, category: "DevOps" },
  { name: "Postman", level: 75, category: "DevOps" },
];
