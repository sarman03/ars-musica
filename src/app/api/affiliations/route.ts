import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

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
    const { blobs } = await list({ prefix: AFFILIATIONS_JSON_PATH });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      return await res.json();
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_AFFILIATIONS;
}

async function saveAffiliations(affiliations: Affiliation[]) {
  const { blobs } = await list({ prefix: AFFILIATIONS_JSON_PATH });
  for (const blob of blobs) {
    await del(blob.url);
  }
  await put(AFFILIATIONS_JSON_PATH, JSON.stringify(affiliations), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
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
    const ext = file.name.split(".").pop() || "png";
    const blobPath = `affiliation-images/affiliation_${timestamp}.${ext}`;

    const blob = await put(blobPath, file, {
      access: "public",
      addRandomSuffix: false,
    });

    const affiliations = await getAffiliations();
    affiliations.push({ src: blob.url, alt });
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
    if (removed.src.includes("blob.vercel-storage.com")) {
      try {
        await del(removed.src);
      } catch {
        // ignore delete errors for blob cleanup
      }
    }

    affiliations.splice(index, 1);
    await saveAffiliations(affiliations);

    return NextResponse.json({ success: true, affiliations });
  } catch (error) {
    console.error("Affiliation delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
