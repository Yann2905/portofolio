import "dotenv/config";
import mongoose from "mongoose";
import { projects as seedProjects } from "../lib/data";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    tagline: String,
    description: String,
    cover: String,
    gallery: [String],
    tags: [String],
    demoUrl: String,
    codeUrl: String,
    year: Number,
    role: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI manquant dans .env.local");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const Project =
    mongoose.models.Project || mongoose.model("Project", ProjectSchema);

  const count = await Project.countDocuments({});
  if (count > 0) {
    console.log(`⚠️  ${count} projets déjà présents. Suppression…`);
    await Project.deleteMany({});
  }

  const payload = seedProjects.map((p, i) => ({
    title: p.title,
    tagline: p.tagline,
    description: p.description,
    cover: p.cover,
    gallery: p.gallery,
    tags: p.tags,
    demoUrl: p.demoUrl,
    codeUrl: p.codeUrl,
    year: p.year,
    role: p.role,
    featured: i === 0,
    order: i,
  }));
  await Project.insertMany(payload);
  console.log(`✅ ${payload.length} projets insérés.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
