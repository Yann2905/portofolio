import mongoose, { Schema, Model } from "mongoose";

export interface IConfig {
  _id: string;
  key: string;
  theme: "dark" | "light";
  updatedAt: Date;
  createdAt: Date;
}

const ConfigSchema = new Schema<IConfig>(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    theme: { type: String, enum: ["dark", "light"], default: "dark" },
  },
  { timestamps: true }
);

export const Config: Model<IConfig> =
  mongoose.models.Config || mongoose.model<IConfig>("Config", ConfigSchema);
