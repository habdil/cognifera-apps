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

export type BookInput = Omit<BookData, "id"> & { status: "draft" | "published" };

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const sql = getSql();
  const rows = excludeId
    ? await sql`SELECT 1 FROM books WHERE slug = ${slug} AND id != ${excludeId} LIMIT 1;`
    : await sql`SELECT 1 FROM books WHERE slug = ${slug} LIMIT 1;`;
  return rows.length > 0;
}

export async function createBook(input: BookInput): Promise<BookRecord> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO books (
      slug, title, authors, publisher, publication_year, isbn, pages, page_label,
      language, category, description, long_description, keywords,
      cover_image, cover_alt, preview_images, price, availability, format,
      preview_url, purchase_url, purchase_label, table_of_contents, highlights, status
    ) VALUES (
      ${input.slug}, ${input.title}, ${input.authors}, ${input.publisher},
      ${input.publicationYear}, ${input.isbn}, ${input.pages}, ${input.pageLabel ?? null},
      ${input.language}, ${input.category}, ${input.description},
      ${input.longDescription ?? null}, ${input.keywords},
      ${input.coverImage}, ${input.coverAlt ?? null}, ${input.previewImages ?? null},
      ${input.price ?? null}, ${input.availability}, ${input.format},
      ${input.previewUrl ?? null}, ${input.purchaseUrl ?? null},
      ${input.purchaseLabel ?? null}, ${input.tableOfContents ?? null},
      ${input.highlights ?? null}, ${input.status}
    )
    RETURNING *;
  `;
  return mapRow(rows[0]);
}

export async function updateBook(id: string, input: BookInput): Promise<BookRecord | null> {
  const sql = getSql();
  const rows = await sql`
    UPDATE books SET
      slug = ${input.slug},
      title = ${input.title},
      authors = ${input.authors},
      publisher = ${input.publisher},
      publication_year = ${input.publicationYear},
      isbn = ${input.isbn},
      pages = ${input.pages},
      page_label = ${input.pageLabel ?? null},
      language = ${input.language},
      category = ${input.category},
      description = ${input.description},
      long_description = ${input.longDescription ?? null},
      keywords = ${input.keywords},
      cover_image = ${input.coverImage},
      cover_alt = ${input.coverAlt ?? null},
      preview_images = ${input.previewImages ?? null},
      price = ${input.price ?? null},
      availability = ${input.availability},
      format = ${input.format},
      preview_url = ${input.previewUrl ?? null},
      purchase_url = ${input.purchaseUrl ?? null},
      purchase_label = ${input.purchaseLabel ?? null},
      table_of_contents = ${input.tableOfContents ?? null},
      highlights = ${input.highlights ?? null},
      status = ${input.status},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export async function deleteBook(id: string): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`DELETE FROM books WHERE id = ${id} RETURNING id;`;
  return rows.length > 0;
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
