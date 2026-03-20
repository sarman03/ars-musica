import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "images/" });

    // Build a map: original path -> blob URL
    // e.g. "images/about_cards/drums.jpeg" -> strip "images" prefix -> "/about_cards/drums.jpeg"
    const overrides: Record<string, string> = {};
    for (const blob of blobs) {
      const originalPath = blob.pathname.replace(/^images/, "");
      overrides[originalPath] = blob.url;
    }

    return NextResponse.json(overrides);
  } catch {
    return NextResponse.json({});
  }
}
