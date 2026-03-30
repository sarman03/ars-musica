import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const MENTORS_JSON_PATH = "mentors/mentors.json";

const DEFAULT_MENTORS = [
  { name: "Navin Rai – Founder | Director | Drummer | Performer | Educator | Producer | Recording Artist", description: "He is also an accomplished drummer and percussionist, Navin performs with well-known rock bands such as Squarez Attached and Esmond Lama. He is regularly invited for collaborations and special sessions with leading bands and artists across the NCR music scene, earning him respect as both a performer and a collaborator.", imageSrc: "/mentors/mentor_1.jpeg", imageAlt: "Navin Rai playing drums" },
  { name: "Rosemary Deosa \u2013 Co-Founder | Vocal Instructor | Singer | Performer | Songwriter | Composer", description: "Rosemary Deosa is a passionate and accomplished vocalist, performer, and music educator with over 11 years of experience in teaching and live performance. As the Co-Founder of Ars Musica Academy, she plays a vital role in shaping the academy\u2019s artistic vision, nurturing a culture that is student-focused, expressive, and rooted in musical excellence.", imageSrc: "/mentors/mentor_5.jpeg", imageAlt: "Rosemary Deosa performing" },
  { name: "Ranjan Dewan – Guitar Educator | Performer", description: "Ranjan Dewan is a dedicated guitar educator and performer originally from Darjeeling, with over two decades of experience in teaching and performing music. He holds an ATCL certification in Western Classical Guitar from Trinity College London, which laid the foundation for his strong musical training and technical expertise.", imageSrc: "/mentors/mentor_3.jpeg", imageAlt: "Ranjan Dewan with guitar" },
  { name: "Aro Phungshok \u2013 Piano Instructor | Educator", description: "Aro Phungshok is a passionate and dedicated piano teacher with a strong commitment to nurturing musical talent and inspiring students through the art of piano. With a warm and encouraging teaching approach, she focuses on helping students develop not only strong technical skills but also confidence, creativity, and a deep appreciation for music.", imageSrc: "/mentors/mentor_2.jpeg", imageAlt: "Aro Phungshok at piano" },
  { name: "Bonita Solomon \u2013 Piano & Music Theory Instructor | Pianist | Vocalist", description: "Bonita Solomon is a passionate musician and dedicated educator with over 18 years of experience in music performance and teaching. A trained pianist and vocalist, Bonita holds certifications from Trinity College London, UK, and has completed Grade 5 in Music Theory from ABRSM, reflecting her strong academic grounding in music.", imageSrc: "/mentors/mentor_4.jpeg", imageAlt: "Bonita Solomon" },
  { name: "Ahao Gachui – Guitar Instructor | Performer | Educator", description: "Ahao Gachui is a passionate music educator with over 25 years of experience, specializing in guitar. He holds a Grade 8 Guitar Certification from Trinity College London. With extensive experience performing in gospel and contemporary bands, Ahao brings real-world musical insight into his teaching. He currently serves as Music Director at New Life Church, Gurgaon.", imageSrc: "/mentors/mentor_6.jpg", imageAlt: "Ahao Gachui playing guitar" },
];

interface Mentor {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

async function getMentors(): Promise<Mentor[]> {
  try {
    const { blobs } = await list({ prefix: MENTORS_JSON_PATH });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      return await res.json();
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_MENTORS;
}

async function saveMentors(mentors: Mentor[]) {
  const { blobs } = await list({ prefix: MENTORS_JSON_PATH });
  for (const blob of blobs) {
    await del(blob.url);
  }
  await put(MENTORS_JSON_PATH, JSON.stringify(mentors), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export const dynamic = "force-dynamic";

export async function GET() {
  const mentors = await getMentors();
  return NextResponse.json(mentors, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const name = (formData.get("name") as string) || "New Mentor";
  const description = (formData.get("description") as string) || "";
  const imageAlt = (formData.get("imageAlt") as string) || name;

  if (!file) {
    return NextResponse.json({ error: "Image file is required" }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const ext = file.name.split(".").pop() || "jpeg";
    const blob = await put(`mentor-images/mentor_${timestamp}.${ext}`, file, { access: "public", addRandomSuffix: false });

    const mentors = await getMentors();
    mentors.push({ name, description, imageSrc: blob.url, imageAlt });
    await saveMentors(mentors);

    return NextResponse.json({ success: true, mentors });
  } catch (error) {
    console.error("Mentor upload error:", error);
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
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const imageAlt = formData.get("imageAlt") as string | null;
    const file = formData.get("file") as File | null;

    const mentors = await getMentors();

    if (isNaN(index) || index < 0 || index >= mentors.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    if (name !== null) mentors[index].name = name;
    if (description !== null) mentors[index].description = description;
    if (imageAlt !== null) mentors[index].imageAlt = imageAlt;

    if (file && file.type.startsWith("image/")) {
      const oldSrc = mentors[index].imageSrc;
      if (oldSrc.includes("blob.vercel-storage.com")) {
        try { await del(oldSrc); } catch { /* ignore */ }
      }
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "jpeg";
      const blob = await put(`mentor-images/mentor_${timestamp}.${ext}`, file, { access: "public", addRandomSuffix: false });
      mentors[index].imageSrc = blob.url;
    }

    await saveMentors(mentors);
    return NextResponse.json({ success: true, mentors });
  } catch (error) {
    console.error("Mentor update error:", error);
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
    const mentors = await getMentors();

    if (index < 0 || index >= mentors.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    const removed = mentors[index];
    if (removed.imageSrc.includes("blob.vercel-storage.com")) {
      try { await del(removed.imageSrc); } catch { /* ignore */ }
    }

    mentors.splice(index, 1);
    await saveMentors(mentors);

    return NextResponse.json({ success: true, mentors });
  } catch (error) {
    console.error("Mentor delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
