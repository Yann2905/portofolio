import mongoose, { Schema, Model } from "mongoose";

export interface IProject {
  _id: string;
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
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    gallery: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    demoUrl: { type: String },
    codeUrl: { type: String },
    year: { type: Number, required: true },
    role: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ order: 1, createdAt: -1 });

export const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
