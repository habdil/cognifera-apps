import "server-only";

import { getSql } from "@/lib/neon";
import { BookData } from "@/types/publications";

export type BookRecord = BookData & {
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: Record<string, any>): BookRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    authors: row.authors ?? [],
    publisher: row.publisher ?? "",
    publicationYear: row.publication_year,
    isbn: row.isbn ?? "",
    pages: row.pages ?? 0,
    pageLabel: row.page_label ?? undefined,
    language: row.language,
    category: row.category,
    description: row.description ?? "",
    longDescription: row.long_description ?? undefined,
    keywords: row.keywords ?? [],
    coverImage: row.cover_image,
    coverAlt: row.cover_alt ?? undefined,
    previewImages: row.preview_images ?? undefined,
    price: row.price != null ? Number(row.price) : undefined,
    availability: row.availability,
    format: row.format,
    previewUrl: row.preview_url ?? undefined,
    purchaseUrl: row.purchase_url ?? undefined,
    purchaseLabel: row.purchase_label ?? undefined,
    tableOfContents: row.table_of_contents ?? undefined,
    highlights: row.highlights ?? undefined,
    status: row.status,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function listPublishedBooks(): Promise<BookRecord[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM books
    WHERE status = 'published'
    ORDER BY publication_year DESC, created_at DESC;
  `;
  return rows.map(mapRow);
}

export async function listAllBooks(): Promise<BookRecord[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM books
    ORDER BY created_at DESC;
  `;
  return rows.map(mapRow);
}

export async function getBookById(id: string): Promise<BookRecord | null> {
  if (!UUID_REGEX.test(id)) return null;
  const sql = getSql();
  const rows = await sql`SELECT * FROM books WHERE id = ${id} LIMIT 1;`;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

/** Finds a published book by slug, or by id as fallback. */
export async function getBookByParam(value: string): Promise<BookRecord | null> {
  const sql = getSql();
  const rows = UUID_REGEX.test(value)
    ? await sql`
        SELECT * FROM books
        WHERE status = 'published' AND (slug = ${value} OR id = ${value})
        LIMIT 1;
      `
    : await sql`
        SELECT * FROM books
        WHERE status = 'published' AND slug = ${value}
        LIMIT 1;
      `;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export async function getRelatedBooks(
  currentBook: BookData,
  limit = 6
): Promise<BookRecord[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM books
    WHERE status = 'published'
      AND id != ${currentBook.id}
      AND (category = ${currentBook.category} OR authors && ${currentBook.authors})
    ORDER BY publication_year DESC, created_at DESC
    LIMIT ${limit};
  `;
  return rows.map(mapRow);
}
