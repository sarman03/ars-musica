import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

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
    const { blobs } = await list({ prefix: COURSES_JSON_PATH });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      return await res.json();
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_COURSES;
}

async function saveCourses(courses: Course[]) {
  const { blobs } = await list({ prefix: COURSES_JSON_PATH });
  for (const blob of blobs) {
    await del(blob.url);
  }
  await put(COURSES_JSON_PATH, JSON.stringify(courses), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
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
    const ext = file.name.split(".").pop() || "jpeg";
    const blobPath = `course-images/course_${timestamp}.${ext}`;
    const blob = await put(blobPath, file, { access: "public", addRandomSuffix: false });

    const courses = await getCourses();
    courses.push({ title, description, imageSrc: blob.url, imageAlt });
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
      if (oldSrc.includes("blob.vercel-storage.com")) {
        try { await del(oldSrc); } catch { /* ignore */ }
      }
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "jpeg";
      const blob = await put(`course-images/course_${timestamp}.${ext}`, file, { access: "public", addRandomSuffix: false });
      courses[index].imageSrc = blob.url;
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
    if (removed.imageSrc.includes("blob.vercel-storage.com")) {
      try { await del(removed.imageSrc); } catch { /* ignore */ }
    }

    courses.splice(index, 1);
    await saveCourses(courses);

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Course delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
