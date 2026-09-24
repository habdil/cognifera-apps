import { BookInput } from "@/lib/books";

const LANGUAGES = new Set(["id", "en"]);
const CATEGORIES = new Set(["textbook", "reference", "monograph", "proceedings"]);
const AVAILABILITIES = new Set(["available", "out-of-stock", "pre-order"]);
const FORMATS = new Set(["print", "digital", "both"]);
const STATUSES = new Set(["draft", "published"]);

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringArray(value: any): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function optionalStringArray(value: any): string[] | undefined {
  const parsed = stringArray(value);
  return parsed.length > 0 ? parsed : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function optionalString(value: any): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function parseBookInput(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
): { input: BookInput; error: null } | { input: null; error: string } {
  const title = optionalString(body?.title);
  const slug = optionalString(body?.slug)?.toLowerCase();
  const coverImage = optionalString(body?.coverImage);
  const authors = stringArray(body?.authors);
  const publicationYear = Number(body?.publicationYear);

  if (!title) return { input: null, error: "Judul wajib diisi." };
  if (!slug || !SLUG_REGEX.test(slug)) {
    return { input: null, error: "Slug wajib diisi (huruf kecil, angka, tanda hubung)." };
  }
  if (authors.length === 0) return { input: null, error: "Minimal satu penulis." };
  if (!Number.isInteger(publicationYear) || publicationYear < 1900 || publicationYear > 2100) {
    return { input: null, error: "Tahun terbit tidak valid." };
  }
  if (!coverImage) return { input: null, error: "Cover buku wajib diunggah." };

  const language = optionalString(body?.language) ?? "id";
  const category = optionalString(body?.category) ?? "textbook";
  const availability = optionalString(body?.availability) ?? "available";
  const format = optionalString(body?.format) ?? "print";
  const status = optionalString(body?.status) ?? "draft";

  if (!LANGUAGES.has(language)) return { input: null, error: "Bahasa tidak valid." };
  if (!CATEGORIES.has(category)) return { input: null, error: "Kategori tidak valid." };
  if (!AVAILABILITIES.has(availability)) {
    return { input: null, error: "Ketersediaan tidak valid." };
  }
  if (!FORMATS.has(format)) return { input: null, error: "Format tidak valid." };
  if (!STATUSES.has(status)) return { input: null, error: "Status tidak valid." };

  const priceNumber = Number(body?.price);
  const pagesNumber = Number(body?.pages);

  return {
    input: {
      slug,
      title,
      authors,
      publisher: optionalString(body?.publisher) ?? "",
      publicationYear,
      isbn: optionalString(body?.isbn) ?? "",
      pages: Number.isInteger(pagesNumber) && pagesNumber > 0 ? pagesNumber : 0,
      pageLabel: optionalString(body?.pageLabel),
      language: language as BookInput["language"],
      category: category as BookInput["category"],
      description: optionalString(body?.description) ?? "",
      longDescription: optionalStringArray(body?.longDescription),
      keywords: stringArray(body?.keywords),
      coverImage,
      coverAlt: optionalString(body?.coverAlt),
      previewImages: optionalStringArray(body?.previewImages),
      price: Number.isFinite(priceNumber) && priceNumber > 0 ? priceNumber : undefined,
      availability: availability as BookInput["availability"],
      format: format as BookInput["format"],
      previewUrl: optionalString(body?.previewUrl),
      purchaseUrl: optionalString(body?.purchaseUrl),
      purchaseLabel: optionalString(body?.purchaseLabel),
      tableOfContents: optionalStringArray(body?.tableOfContents),
      highlights: optionalStringArray(body?.highlights),
      status: status as BookInput["status"],
    },
    error: null,
  };
}
