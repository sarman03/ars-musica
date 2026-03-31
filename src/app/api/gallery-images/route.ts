import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteFile, readJSON, writeJSON } from "@/lib/supabase";

const GALLERY_JSON_PATH = "gallery-images/gallery.json";

const DEFAULT_IMAGES = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate" },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums" },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor" },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation" },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums" },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing" },
];

interface GalleryImage {
  src: string;
  alt: string;
}

async function getImages(): Promise<GalleryImage[]> {
  try {
    const data = await readJSON<GalleryImage[]>(GALLERY_JSON_PATH);
    if (data && data.length > 0) return data;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_IMAGES;
}

async function saveImages(images: GalleryImage[]) {
  await writeJSON(GALLERY_JSON_PATH, images);
}

export async function GET() {
  const images = await getImages();
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || "Gallery image";

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const url = await uploadImage("gallery-uploads", `gallery_${timestamp}`, file);

    const images = await getImages();
    images.push({ src: url, alt });
    await saveImages(images);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Gallery upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { index } = await req.json();
    const images = await getImages();

    if (index < 0 || index >= images.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const removed = images[index];
    if (removed.src.includes("supabase.co")) {
      try { await deleteFile(extractStoragePath(removed.src)); } catch { /* ignore */ }
    }

    images.splice(index, 1);
    await saveImages(images);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

function extractStoragePath(url: string): string {
  const marker = "/object/public/assets/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length);
}
