import { NextResponse } from "next/server";
import { messageSchema } from "@/lib/validation";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Message } from "@/lib/models/Message";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = messageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    if (isDbConfigured()) {
      await connectDB();
      await Message.create(parsed.data);
    } else {
      console.log("[contact] (no DB) ", parsed.data);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
