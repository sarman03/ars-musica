import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

  // Sanitize: only allow paths within /public and image extensions
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
  const ext = path.extname(targetPath).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Prevent path traversal
  const normalizedPath = path.normalize(targetPath);
  if (normalizedPath.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const publicDir = path.join(process.cwd(), "public");
  const fullPath = path.join(publicDir, normalizedPath);

  // Ensure the directory exists
  await mkdir(path.dirname(fullPath), { recursive: true });

  // Write the file
  const bytes = await file.arrayBuffer();
  await writeFile(fullPath, Buffer.from(bytes));

  return NextResponse.json({ success: true, path: targetPath });
}
