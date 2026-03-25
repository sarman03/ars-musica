const HEIC_TYPES = ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"];

function isHeicFile(file: File): boolean {
  if (HEIC_TYPES.includes(file.type)) return true;
  const ext = file.name.toLowerCase().split(".").pop();
  return ext === "heic" || ext === "heif";
}

export async function convertIfHeic(file: File): Promise<Blob> {
  if (!isHeicFile(file)) return file;

  const heic2any = (await import("heic2any")).default;

  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });

  // heic2any can return a Blob or Blob[]
  return Array.isArray(converted) ? converted[0] : converted;
}
