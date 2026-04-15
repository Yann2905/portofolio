import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { projectSchema } from "@/lib/validation";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json(projects);
  } catch (e) {
    console.error("[GET /api/projects]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }
    await connectDB();
    const created = await Project.create(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("[POST /api/projects]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
