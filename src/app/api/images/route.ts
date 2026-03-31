import { NextResponse } from "next/server";
import { listFiles, getPublicUrl } from "@/lib/supabase";

export async function GET() {
  try {
    const files = await listFiles("images");

    const overrides: Record<string, string> = {};
    for (const filePath of files) {
      const originalPath = filePath.replace(/^images/, "");
      overrides[originalPath] = getPublicUrl(filePath);
    }

    return NextResponse.json(overrides);
  } catch {
    return NextResponse.json({});
  }
}
