export type ScreenKey = "home" | "projects" | "skills" | "contact";

export interface Project {
  id: string;
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
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "Frontend" | "Backend" | "Mobile" | "DevOps" | "Design";
  icon?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
