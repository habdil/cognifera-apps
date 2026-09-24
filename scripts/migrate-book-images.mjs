// One-time migration: uploads legacy book images from public/ to Cloudinary
// and points the books table at the new URLs. Idempotent — rows whose images
// are already absolute URLs are skipped.
// Usage: node scripts/migrate-book-images.mjs
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { neon } from "@neondatabase/serverless";

try {
  process.loadEnvFile(".env");
} catch {
  // .env optional
}

const { DATABASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!DATABASE_URL || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Missing DATABASE_URL or CLOUDINARY_* env vars.");
  process.exit(1);
}

const MIME_BY_EXT = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

async function uploadLocalImage(publicPath) {
  const filePath = join("public", publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const bytes = readFileSync(filePath);
  const mime = MIME_BY_EXT[extname(filePath).toLowerCase()] ?? "image/jpeg";
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "cognifera/books";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", new Blob([bytes], { type: mime }));
  formData.append("api_key", CLOUDINARY_API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const result = await response.json();
  if (!response.ok || !result.secure_url) {
    throw new Error(`Upload failed for ${publicPath}: ${JSON.stringify(result.error ?? result)}`);
  }
  return result.secure_url;
}

const sql = neon(DATABASE_URL);
const books = await sql`SELECT id, slug, cover_image, preview_images FROM books;`;

for (const book of books) {
  const needsCover = book.cover_image?.startsWith("/");
  const localPreviews = (book.preview_images ?? []).filter((p) => p.startsWith("/"));

  if (!needsCover && localPreviews.length === 0) {
    console.log(`SKIP  ${book.slug} (sudah di Cloudinary)`);
    continue;
  }

  console.log(`MIGRATE ${book.slug} ...`);
  const urlMap = new Map();

  // Upload each unique local path once (cover often repeats in previews).
  const uniquePaths = [...new Set([
    ...(needsCover ? [book.cover_image] : []),
    ...localPreviews,
  ])];

  for (const path of uniquePaths) {
    const url = await uploadLocalImage(path);
    urlMap.set(path, url);
    console.log(`  ${path} -> ${url}`);
  }

  const newCover = urlMap.get(book.cover_image) ?? book.cover_image;
  const newPreviews = (book.preview_images ?? []).map((p) => urlMap.get(p) ?? p);

  await sql`
    UPDATE books SET
      cover_image = ${newCover},
      preview_images = ${newPreviews.length > 0 ? newPreviews : null},
      updated_at = NOW()
    WHERE id = ${book.id};
  `;
  console.log(`  DB updated.`);
}

console.log("Selesai.");
