import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Config } from "@/lib/models/Config";
import { configSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const doc = await Config.findOne({ key: "site" }).lean();
    return NextResponse.json({ theme: doc?.theme || "dark" });
  } catch (e) {
    console.error("[GET /api/config]", e);
    return NextResponse.json({ theme: "dark" });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const parsed = configSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }
    await connectDB();

    const existing = await Config.findOne({ key: "site" });
    let theme: "dark" | "light";
    if (existing) {
      existing.theme = parsed.data.theme;
      await existing.save();
      theme = existing.theme;
    } else {
      const created = await Config.create({
        key: "site",
        theme: parsed.data.theme,
      });
      theme = created.theme;
    }

    try {
      revalidatePath("/", "layout");
      revalidatePath("/admin", "layout");
    } catch (re) {
      console.error("[revalidatePath]", re);
    }

    return NextResponse.json({ theme });
  } catch (e) {
    const msg = (e as Error).message || "Server error";
    console.error("[PUT /api/config]", e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
