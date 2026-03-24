import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const SLIDES_JSON_PATH = "hero-slides/slides.json";

// Default slides (used when no blob data exists yet)
const DEFAULT_SLIDES = [
  { src: "/hero/AAAArs.png", alt: "Ars Musica Academy" },
  { src: "/hero/coming soon.png", alt: "Summer Camp Coming Soon" },
];

interface Slide {
  src: string;
  alt: string;
}

async function getSlides(): Promise<Slide[]> {
  try {
    const { blobs } = await list({ prefix: SLIDES_JSON_PATH });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      return await res.json();
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_SLIDES;
}

async function saveSlides(slides: Slide[]) {
  // Delete existing
  const { blobs } = await list({ prefix: SLIDES_JSON_PATH });
  for (const blob of blobs) {
    await del(blob.url);
  }
  // Save new
  await put(SLIDES_JSON_PATH, JSON.stringify(slides), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

// GET — return current slides
export async function GET() {
  const slides = await getSlides();
  return NextResponse.json(slides);
}

// POST — add a new slide (upload image + add to list)
export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || "Hero slide";

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  try {
    // Upload image to blob
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpg";
    const blobPath = `hero-images/slide_${timestamp}.${ext}`;

    const blob = await put(blobPath, file, {
      access: "public",
      addRandomSuffix: false,
    });

    // Add to slides list
    const slides = await getSlides();
    slides.push({ src: blob.url, alt });
    await saveSlides(slides);

    return NextResponse.json({ success: true, slides });
  } catch (error) {
    console.error("Hero slide upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// DELETE — remove a slide by index
export async function DELETE(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { index } = await req.json();
    const slides = await getSlides();

    if (index < 0 || index >= slides.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    // If it's a blob URL, delete the blob too
    const removed = slides[index];
    if (removed.src.includes("blob.vercel-storage.com")) {
      try {
        await del(removed.src);
      } catch {
        // ignore delete errors for blob cleanup
      }
    }

    slides.splice(index, 1);
    await saveSlides(slides);

    return NextResponse.json({ success: true, slides });
  } catch (error) {
    console.error("Hero slide delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
