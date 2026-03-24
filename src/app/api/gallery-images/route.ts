import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

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
    const { blobs } = await list({ prefix: GALLERY_JSON_PATH });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      return await res.json();
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_IMAGES;
}

async function saveImages(images: GalleryImage[]) {
  const { blobs } = await list({ prefix: GALLERY_JSON_PATH });
  for (const blob of blobs) {
    await del(blob.url);
  }
  await put(GALLERY_JSON_PATH, JSON.stringify(images), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
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
    const ext = file.name.split(".").pop() || "jpg";
    const blobPath = `gallery-uploads/gallery_${timestamp}.${ext}`;

    const blob = await put(blobPath, file, {
      access: "public",
      addRandomSuffix: false,
    });

    const images = await getImages();
    images.push({ src: blob.url, alt });
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
    if (removed.src.includes("blob.vercel-storage.com")) {
      try {
        await del(removed.src);
      } catch {
        // ignore delete errors for blob cleanup
      }
    }

    images.splice(index, 1);
    await saveImages(images);

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
