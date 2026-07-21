import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/supabase";

const REVIEWS_JSON_PATH = "reviews/reviews.json";

interface Review {
  reviewerName: string;
  rating: number;
  text: string;
  date?: string;
}

const DEFAULT_REVIEWS: Review[] = [];

async function getReviews(): Promise<Review[]> {
  try {
    const data = await readJSON<Review[]>(REVIEWS_JSON_PATH);
    if (data && data.length > 0) return data;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_REVIEWS;
}

async function saveReviews(reviews: Review[]) {
  await writeJSON(REVIEWS_JSON_PATH, reviews);
}

export const dynamic = "force-dynamic";

export async function GET() {
  const reviews = await getReviews();
  return NextResponse.json(reviews, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const reviewerName = (body.reviewerName as string) || "";
    const rating = Number(body.rating) || 5;
    const text = (body.text as string) || "";
    const date = (body.date as string) || "";

    if (!reviewerName.trim() || !text.trim()) {
      return NextResponse.json({ error: "Reviewer name and text are required" }, { status: 400 });
    }

    const reviews = await getReviews();
    reviews.push({ reviewerName, rating, text, date });
    await saveReviews(reviews);

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Review add error:", error);
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const index = Number(body.index);
    const reviews = await getReviews();

    if (isNaN(index) || index < 0 || index >= reviews.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    if (body.reviewerName !== undefined) reviews[index].reviewerName = body.reviewerName;
    if (body.rating !== undefined) reviews[index].rating = Number(body.rating);
    if (body.text !== undefined) reviews[index].text = body.text;
    if (body.date !== undefined) reviews[index].date = body.date;

    await saveReviews(reviews);
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Review update error:", error);
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
    const reviews = await getReviews();

    if (index < 0 || index >= reviews.length) {
      return NextResponse.json({ error: "Invalid index" }, { status: 400 });
    }

    reviews.splice(index, 1);
    await saveReviews(reviews);

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Review delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
