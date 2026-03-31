import { NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile, readJSON, writeJSON, getPublicUrl } from "@/lib/supabase";

const VIDEOS_JSON_PATH = "gallery-videos/videos.json";

const DEFAULT_VIDEOS = [
  { src: getPublicUrl("gallery-videos/VID-20230718-WA0002_1.mp4"), title: "Performance 1" },
  { src: getPublicUrl("gallery-videos/VID-20230718-WA0002_2.mp4"), title: "Performance 2" },
  { src: getPublicUrl("gallery-videos/IMG_1865.mp4"), title: "Performance 3" },
];

interface GalleryVideo {
  src: string;
  title: string;
}

async function getVideos(): Promise<GalleryVideo[]> {
  try {
    const data = await readJSON<GalleryVideo[]>(VIDEOS_JSON_PATH);
    if (data && data.length > 0) return data;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_VIDEOS;
}

async function saveVideos(videos: GalleryVideo[]) {
  await writeJSON(VIDEOS_JSON_PATH, videos);
}

export async function GET() {
  const videos = await getVideos();
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || "Video";

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!file.type.startsWith("video/") && !file.name.toLowerCase().endsWith(".mov")) {
    return NextResponse.json({ error: "Only video files are allowed" }, { status: 400 });
  }

  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB
  if (file.size > MAX_VIDEO_SIZE) {
    return NextResponse.json(
      { error: "Video file is too large. Please compress it to under 50 MB before uploading." },
      { status: 400 }
    );
  }

  try {
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "mp4";
    const path = `gallery-videos/video_${timestamp}.${ext}`;
    const url = await uploadFile(path, file, file.type || "video/mp4");

    const videos = await getVideos();
    videos.push({ src: url, title });
    await saveVideos(videos);

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("Video upload error:", error);
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
    const videos = await getVideos();

    if (index < 0 || index >= videos.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const removed = videos[index];
    if (removed.src.includes("supabase.co")) {
      try { await deleteFile(extractStoragePath(removed.src)); } catch { /* ignore */ }
    }

    videos.splice(index, 1);
    await saveVideos(videos);

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("Video delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

function extractStoragePath(url: string): string {
  const marker = "/object/public/assets/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length);
}
