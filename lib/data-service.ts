import { connectDB, isDbConfigured } from "./db";
import { Project } from "./models/Project";
import { Skill } from "./models/Skill";
import { Config } from "./models/Config";
import { projects as seedProjects, skills as seedSkills } from "./data";
import type { Project as ProjectType, Skill as SkillType } from "./types";

function toPlainProject(doc: {
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
}): ProjectType {
  return {
    id: String(doc._id),
    title: doc.title,
    tagline: doc.tagline,
    description: doc.description,
    cover: doc.cover,
    gallery: doc.gallery ?? [],
    tags: doc.tags ?? [],
    demoUrl: doc.demoUrl || undefined,
    codeUrl: doc.codeUrl || undefined,
    year: doc.year,
    role: doc.role,
  };
}

export async function getProjects(): Promise<ProjectType[]> {
  if (!isDbConfigured()) return seedProjects;
  try {
    await connectDB();
    const docs = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    if (docs.length === 0) return seedProjects;
    return docs.map((d) => toPlainProject(d as unknown as Parameters<typeof toPlainProject>[0]));
  } catch (e) {
    console.error("[getProjects] falling back to seed:", e);
    return seedProjects;
  }
}

export async function getSkills(): Promise<SkillType[]> {
  if (!isDbConfigured()) return seedSkills;
  try {
    await connectDB();
    const docs = await Skill.find({}).sort({ order: 1, createdAt: -1 }).lean();
    if (docs.length === 0) return seedSkills;
    return docs.map((d) => ({
      name: d.name,
      level: d.level,
      category: d.category as SkillType["category"],
    }));
  } catch (e) {
    console.error("[getSkills] falling back to seed:", e);
    return seedSkills;
  }
}

export async function getTheme(): Promise<"dark" | "light"> {
  if (!isDbConfigured()) return "dark";
  try {
    await connectDB();
    const doc = await Config.findOne({ key: "site" }).lean();
    return (doc?.theme as "dark" | "light") || "dark";
  } catch (e) {
    console.error("[getTheme] falling back to dark:", e);
    return "dark";
  }
}
