import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const VIDEOS_JSON_PATH = "gallery-videos/videos.json";

const DEFAULT_VIDEOS = [
  { src: "https://c1tjfnbjayx7u69m.public.blob.vercel-storage.com/gallery-videos/VID-20230718-WA0002_1.mp4", title: "Performance 1" },
  { src: "https://c1tjfnbjayx7u69m.public.blob.vercel-storage.com/gallery-videos/VID-20230718-WA0002_2.mp4", title: "Performance 2" },
  { src: "https://c1tjfnbjayx7u69m.public.blob.vercel-storage.com/gallery-videos/IMG_1865.MOV", title: "Performance 3" },
];

interface GalleryVideo {
  src: string;
  title: string;
}

async function getVideos(): Promise<GalleryVideo[]> {
  try {
    const { blobs } = await list({ prefix: VIDEOS_JSON_PATH });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      return await res.json();
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_VIDEOS;
}

async function saveVideos(videos: GalleryVideo[]) {
  const { blobs } = await list({ prefix: VIDEOS_JSON_PATH });
  for (const blob of blobs) {
    await del(blob.url);
  }
  await put(VIDEOS_JSON_PATH, JSON.stringify(videos), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
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

  try {
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "mp4";
    const blobPath = `gallery-videos/video_${timestamp}.${ext}`;

    const blob = await put(blobPath, file, {
      access: "public",
      addRandomSuffix: false,
    });

    const videos = await getVideos();
    videos.push({ src: blob.url, title });
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
    if (removed.src.includes("blob.vercel-storage.com")) {
      try {
        await del(removed.src);
      } catch {
        // ignore delete errors for blob cleanup
      }
    }

    videos.splice(index, 1);
    await saveVideos(videos);

    return NextResponse.json({ success: true, videos });
  } catch (error) {
    console.error("Video delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
