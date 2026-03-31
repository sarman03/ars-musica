import { NextRequest, NextResponse } from "next/server";
import { compressAndUpload } from "@/lib/supabase";

export async function POST(req: NextRequest) {
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

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  if (targetPath.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    // Keep the original path so the override key matches exactly
    const storagePath = `images${targetPath}`;
    const url = await compressAndUpload(storagePath, file);

    return NextResponse.json({ success: true, path: targetPath, url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
