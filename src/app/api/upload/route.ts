import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export async function POST(req: NextRequest) {
  // Check auth
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const targetPath = formData.get("path") as string | null;

  if (!file || !targetPath) {
    return NextResponse.json({ error: "File and path are required" }, { status: 400 });
  }

  // Validate that the uploaded file is an image
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  // Prevent path traversal
  if (targetPath.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    // Delete any existing blob for this path (to avoid accumulating old versions)
    const existing = await list({ prefix: `images${targetPath}` });
    for (const blob of existing.blobs) {
      await del(blob.url);
    }

    // Upload to Vercel Blob
    const blob = await put(`images${targetPath}`, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ success: true, path: targetPath, url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
