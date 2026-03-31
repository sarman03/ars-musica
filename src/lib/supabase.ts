import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BUCKET = "assets";

export function getPublicUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function compressImage(buffer: Buffer): Promise<{ data: Buffer; contentType: string; ext: string }> {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const width = metadata.width || 0;

  let pipeline = image;
  if (width > 1920) {
    pipeline = pipeline.resize(1920, undefined, { withoutEnlargement: true });
  }

  const data = await pipeline.webp({ quality: 80 }).toBuffer();
  return { data, contentType: "image/webp", ext: "webp" };
}

export async function uploadFile(
  path: string,
  file: File | Buffer | ArrayBuffer,
  contentType?: string
): Promise<string> {
  const body = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, body, {
      contentType: contentType || "application/octet-stream",
      upsert: true,
    });
  if (error) throw error;
  return getPublicUrl(path);
}

export async function uploadImage(
  basePath: string,
  fileName: string,
  file: File
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const compressed = await compressImage(buffer);
  const name = fileName.replace(/\.[^.]+$/, "") + "." + compressed.ext;
  const path = `${basePath}/${name}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, compressed.data, {
      contentType: compressed.contentType,
      upsert: true,
    });
  if (error) throw error;
  return getPublicUrl(path);
}

export async function compressAndUpload(path: string, file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const compressed = await compressImage(buffer);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, compressed.data, {
      contentType: compressed.contentType,
      upsert: true,
    });
  if (error) throw error;
  return getPublicUrl(path);
}

export async function deleteFile(path: string): Promise<void> {
  await supabase.storage.from(BUCKET).remove([path]);
}

export async function readJSON<T>(path: string): Promise<T | null> {
  const { data, error } = await supabase.storage.from(BUCKET).download(path);
  if (error || !data) return null;
  const text = await data.text();
  return JSON.parse(text) as T;
}

export async function writeJSON(path: string, obj: unknown): Promise<void> {
  const body = Buffer.from(JSON.stringify(obj));
  await supabase.storage.from(BUCKET).upload(path, body, {
    contentType: "application/json",
    upsert: true,
  });
}

export async function listFiles(prefix: string): Promise<string[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix);
  if (error || !data) return [];

  const results: string[] = [];
  for (const item of data) {
    if (!item.name) continue;
    const fullPath = `${prefix}/${item.name}`;
    if (item.id) {
      // It's a file
      results.push(fullPath);
    } else {
      // It's a folder — recurse
      const nested = await listFiles(fullPath);
      results.push(...nested);
    }
  }
  return results;
}
