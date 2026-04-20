import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteFile, readJSON, writeJSON } from "@/lib/supabase";

const SLIDES_JSON_PATH = "hero-slides/slides.json";

const DEFAULT_SLIDES = [
  { src: "/hero/AAAArs.png", alt: "Ars Musica Academy", displayMode: "fill-box" as const },
  { src: "/hero/coming soon.png", alt: "Summer Camp Coming Soon", displayMode: "fill-box" as const },
];

type DisplayMode = "fill-box" | "show-full-image";

interface Slide {
  src: string;
  alt: string;
  displayMode: DisplayMode;
}

function normalizeDisplayMode(value: unknown): DisplayMode {
  return value === "show-full-image" ? "show-full-image" : "fill-box";
}

async function getSlides(): Promise<Slide[]> {
  const data = await readJSON<unknown>(SLIDES_JSON_PATH);
  if (data === null) {
    await saveSlides(DEFAULT_SLIDES);
    return [...DEFAULT_SLIDES];
  }
  if (!Array.isArray(data)) {
    throw new Error("Invalid hero slides data format");
  }

  return data
    .filter(
      (item): item is { src: string; alt: string; displayMode?: unknown } =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as { src?: unknown }).src === "string" &&
        typeof (item as { alt?: unknown }).alt === "string"
    )
    .map((slide) => ({
      src: slide.src,
      alt: slide.alt,
      displayMode: normalizeDisplayMode(slide.displayMode),
    }));
}

async function saveSlides(slides: Slide[]) {
  await writeJSON(SLIDES_JSON_PATH, slides);
}

export async function GET() {
  try {
    const slides = await getSlides();
    return NextResponse.json(slides);
  } catch (error) {
    console.error("Hero slides fetch error:", error);
    return NextResponse.json({ error: "Failed to load hero slides" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || "Hero slide";
  const displayMode = normalizeDisplayMode(formData.get("displayMode"));

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const url = await uploadImage("hero-images", `slide_${timestamp}`, file);

    const slides = await getSlides();
    slides.push({ src: url, alt, displayMode });
    await saveSlides(slides);

    return NextResponse.json({ success: true, slides });
  } catch (error) {
    console.error("Hero slide upload error:", error);
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
    const slides = await getSlides();

    if (index < 0 || index >= slides.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const removed = slides[index];
    if (removed.src.includes("supabase.co")) {
      await deleteFile(extractStoragePath(removed.src));
    }

    slides.splice(index, 1);
    await saveSlides(slides);

    return NextResponse.json({ success: true, slides });
  } catch (error) {
    console.error("Hero slide delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

function extractStoragePath(url: string): string {
  const marker = "/object/public/assets/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length);
}
