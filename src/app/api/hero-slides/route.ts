import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteFile, readJSON, writeJSON } from "@/lib/supabase";

const SLIDES_JSON_PATH = "hero-slides/slides.json";

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
    const data = await readJSON<Slide[]>(SLIDES_JSON_PATH);
    if (data && data.length > 0) return data;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_SLIDES;
}

async function saveSlides(slides: Slide[]) {
  await writeJSON(SLIDES_JSON_PATH, slides);
}

export async function GET() {
  const slides = await getSlides();
  return NextResponse.json(slides);
}

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
    const timestamp = Date.now();
    const url = await uploadImage("hero-images", `slide_${timestamp}`, file);

    const slides = await getSlides();
    slides.push({ src: url, alt });
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
      try { await deleteFile(extractStoragePath(removed.src)); } catch { /* ignore */ }
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
