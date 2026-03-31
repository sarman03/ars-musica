import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteFile, readJSON, writeJSON } from "@/lib/supabase";

const AFFILIATIONS_JSON_PATH = "affiliations/affiliations.json";

const DEFAULT_AFFILIATIONS = [
  { src: "/affiliation/abrsm.png", alt: "ABRSM" },
  { src: "/affiliation/trinity.png", alt: "Trinity College London" },
  { src: "/affiliation/rockschool.png", alt: "Rockschool" },
  { src: "/affiliation/trinity2.png", alt: "Trinity College London Registered" },
];

interface Affiliation {
  src: string;
  alt: string;
}

async function getAffiliations(): Promise<Affiliation[]> {
  try {
    const data = await readJSON<Affiliation[]>(AFFILIATIONS_JSON_PATH);
    if (data && data.length > 0) return data;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_AFFILIATIONS;
}

async function saveAffiliations(affiliations: Affiliation[]) {
  await writeJSON(AFFILIATIONS_JSON_PATH, affiliations);
}

export async function GET() {
  const affiliations = await getAffiliations();
  return NextResponse.json(affiliations);
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || "Affiliation";

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const url = await uploadImage("affiliation-images", `affiliation_${timestamp}`, file);

    const affiliations = await getAffiliations();
    affiliations.push({ src: url, alt });
    await saveAffiliations(affiliations);

    return NextResponse.json({ success: true, affiliations });
  } catch (error) {
    console.error("Affiliation upload error:", error);
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
    const affiliations = await getAffiliations();

    if (index < 0 || index >= affiliations.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const removed = affiliations[index];
    if (removed.src.includes("supabase.co")) {
      try { await deleteFile(extractStoragePath(removed.src)); } catch { /* ignore */ }
    }

    affiliations.splice(index, 1);
    await saveAffiliations(affiliations);

    return NextResponse.json({ success: true, affiliations });
  } catch (error) {
    console.error("Affiliation delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

function extractStoragePath(url: string): string {
  const marker = "/object/public/assets/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length);
}
