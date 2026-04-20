import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteFile, readJSON, writeJSON } from "@/lib/supabase";

const GALLERY_JSON_PATH = "gallery-images/gallery.json";

const DEFAULT_IMAGES = [
  { src: "/gallery/gallery_1.jpeg", alt: "Student receiving certificate", displayMode: "fill-box" as const },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_3.jpeg", alt: "Student with music instructor", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_4.jpeg", alt: "Certificate presentation", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_5.jpeg", alt: "Student practicing drums", displayMode: "fill-box" as const },
  { src: "/gallery/gallery_last.jpg", alt: "Young singer performing", displayMode: "fill-box" as const },
];

type DisplayMode = "fill-box" | "show-full-image";

interface GalleryImage {
  src: string;
  alt: string;
  displayMode: DisplayMode;
}

function normalizeDisplayMode(value: unknown): DisplayMode {
  return value === "show-full-image" ? "show-full-image" : "fill-box";
}

async function getImages(): Promise<GalleryImage[]> {
  const data = await readJSON<unknown>(GALLERY_JSON_PATH);
  if (data === null) {
    await saveImages(DEFAULT_IMAGES);
    return [...DEFAULT_IMAGES];
  }
  if (!Array.isArray(data)) {
    throw new Error("Invalid gallery images data format");
  }

  return data
    .filter(
      (item): item is { src: string; alt: string; displayMode?: unknown } =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { src?: unknown }).src === "string" &&
        typeof (item as { alt?: unknown }).alt === "string"
    )
    .map((image) => ({
      src: image.src,
      alt: image.alt,
      displayMode: normalizeDisplayMode(image.displayMode),
    }));
}

async function saveImages(images: GalleryImage[]) {
  await writeJSON(GALLERY_JSON_PATH, images);
}

export async function GET() {
  try {
    const images = await getImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Gallery images fetch error:", error);
    return NextResponse.json({ error: "Failed to load gallery images" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || "Gallery image";
  const displayMode = normalizeDisplayMode(formData.get("displayMode"));

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
    images.push({ src: url, alt, displayMode });
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
      await deleteFile(extractStoragePath(removed.src));
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
