import { NextRequest, NextResponse } from "next/server";
import { uploadImage, deleteFile, readJSON, writeJSON } from "@/lib/supabase";

const COURSES_JSON_PATH = "courses/courses.json";

const DEFAULT_COURSES = [
  { title: "Drums", description: "Learn rhythm, timing, drum patterns, fills, and live performance skills. Our classes help students build strong groove and coordination.", imageSrc: "/about_cards/drums.jpeg", imageAlt: "Drum set close-up" },
  { title: "Guitar", description: "Acoustic and electric guitar training covering chords, strumming, scales, riffs, and popular songs for beginners to advanced learners.", imageSrc: "/about_cards/guitar.jpeg", imageAlt: "Person playing guitar" },
  { title: "Vocals", description: "Improve your singing with breathing techniques, pitch control, vocal exercises, and performance training.", imageSrc: "/about_cards/vocals.jpeg", imageAlt: "Young singer in recording studio" },
  { title: "Piano", description: "Learn piano fundamentals including scales, chords, melodies, and music reading with structured lessons.", imageSrc: "/about_cards/piano.jpeg", imageAlt: "Hands playing piano keys" },
  { title: "Keyboard", description: "Electronic keyboard training focusing on melodies, chord progressions, and accompaniment styles.", imageSrc: "/about_cards/keyboard.jpeg", imageAlt: "Person playing electronic keyboard" },
  { title: "Ukulele", description: "A fun and beginner-friendly instrument. Learn chords, strumming patterns, and play your favorite songs quickly.", imageSrc: "/about_cards/ukele.jpeg", imageAlt: "Teacher and student with ukulele" },
  { title: "Exam", description: "We prepare students for graded music exams from Trinity College London, Rockschool London, and ABRSM. These exams allow students to formally validate their skills as they progress.", imageSrc: "/exam.jpg", imageAlt: "Music producer at mixing console" },
  { title: "Online Classes", description: "We offer live, interactive online classes designed to provide the same structured learning experience as in-person sessions, with personalized guidance and regular feedback.", imageSrc: "/about_cards/class.jpeg", imageAlt: "Person attending online music class on laptop" },
];

interface Course {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

async function getCourses(): Promise<Course[]> {
  try {
    const data = await readJSON<Course[]>(COURSES_JSON_PATH);
    if (data && data.length > 0) return data;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_COURSES;
}

async function saveCourses(courses: Course[]) {
  await writeJSON(COURSES_JSON_PATH, courses);
}

export async function GET() {
  const courses = await getCourses();
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || "New Course";
  const description = (formData.get("description") as string) || "";
  const imageAlt = (formData.get("imageAlt") as string) || title;

  if (!file) {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const url = await uploadImage("course-images", `course_${timestamp}`, file);

    const courses = await getCourses();
    courses.push({ title, description, imageSrc: url, imageAlt });
    await saveCourses(courses);

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Course upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const index = parseInt(formData.get("index") as string, 10);
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const imageAlt = formData.get("imageAlt") as string | null;
    const file = formData.get("file") as File | null;

    const courses = await getCourses();

    if (isNaN(index) || index < 0 || index >= courses.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    if (title !== null) courses[index].title = title;
    if (description !== null) courses[index].description = description;
    if (imageAlt !== null) courses[index].imageAlt = imageAlt;

    if (file && file.type.startsWith("image/")) {
      const oldSrc = courses[index].imageSrc;
      if (oldSrc.includes("supabase.co")) {
        try { await deleteFile(extractStoragePath(oldSrc)); } catch { /* ignore */ }
      }
      const timestamp = Date.now();
      const url = await uploadImage("course-images", `course_${timestamp}`, file);
      courses[index].imageSrc = url;
    }

    await saveCourses(courses);
    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Course update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { index } = await req.json();
    const courses = await getCourses();

    if (index < 0 || index >= courses.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const removed = courses[index];
    if (removed.imageSrc.includes("supabase.co")) {
      try { await deleteFile(extractStoragePath(removed.imageSrc)); } catch { /* ignore */ }
    }

    courses.splice(index, 1);
    await saveCourses(courses);

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Course delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

function extractStoragePath(url: string): string {
  const marker = "/object/public/assets/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return url.slice(idx + marker.length);
}
