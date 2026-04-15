import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Skill } from "@/lib/models/Skill";
import { skillSchema } from "@/lib/validation";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(skills);
  } catch (e) {
    console.error("[GET /api/skills]", e);
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
    const parsed = skillSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }
    await connectDB();
    const created = await Skill.create(parsed.data);
    revalidatePath("/");
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error("[POST /api/skills]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
