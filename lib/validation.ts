import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  tagline: z.string().min(2).max(200),
  description: z.string().min(10),
  cover: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  tags: z.array(z.string().min(1)).default([]),
  demoUrl: z.string().url().optional().or(z.literal("")),
  codeUrl: z.string().url().optional().or(z.literal("")),
  year: z.number().int().min(2000).max(2100),
  role: z.string().min(2).max(120),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const messageSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(3).max(140),
  message: z.string().min(10).max(4000),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
