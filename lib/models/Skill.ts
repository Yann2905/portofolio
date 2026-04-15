import mongoose, { Schema, Model } from "mongoose";

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "DevOps"
  | "Design";

export interface ISkill {
  _id: string;
  name: string;
  level: number;
  category: SkillCategory;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Mobile", "DevOps", "Design"],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SkillSchema.index({ order: 1, createdAt: -1 });

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
