import { connectDB, isDbConfigured } from "./db";
import { Project } from "./models/Project";
import { projects as seedProjects } from "./data";
import type { Project as ProjectType } from "./types";

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
