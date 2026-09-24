import "server-only";

import { getSql } from "@/lib/neon";
import { ArticleData } from "@/lib/articles-shared";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: Record<string, any>): ArticleData {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    contentHtml: row.content_html ?? "",
    coverImage: row.cover_image ?? undefined,
    category: row.category,
    tags: row.tags ?? [],
    status: row.status,
    publishedAt: row.published_at ? new Date(row.published_at) : null,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function listPublishedArticles(options?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<{ articles: ArticleData[]; total: number }> {
  const sql = getSql();
  const limit = options?.limit ?? 9;
  const offset = options?.offset ?? 0;
  const category = options?.category ?? null;

  const rows = await sql`
    SELECT * FROM articles
    WHERE status = 'published'
      AND (${category}::text IS NULL OR category = ${category})
    ORDER BY published_at DESC
    LIMIT ${limit} OFFSET ${offset};
  `;

  const countRows = await sql`
    SELECT COUNT(*)::int AS total FROM articles
    WHERE status = 'published'
      AND (${category}::text IS NULL OR category = ${category});
  `;

  return { articles: rows.map(mapRow), total: countRows[0]?.total ?? 0 };
}

export async function getPublishedArticleBySlug(
  slug: string
): Promise<ArticleData | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM articles
    WHERE status = 'published' AND slug = ${slug}
    LIMIT 1;
  `;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export async function getRelatedArticles(
  article: ArticleData,
  limit = 3
): Promise<ArticleData[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM articles
    WHERE status = 'published' AND id != ${article.id}
    ORDER BY (category = ${article.category}) DESC, published_at DESC
    LIMIT ${limit};
  `;
  return rows.map(mapRow);
}

export async function listAllArticles(): Promise<ArticleData[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM articles
    ORDER BY COALESCE(published_at, created_at) DESC;
  `;
  return rows.map(mapRow);
}

export async function getArticleById(id: string): Promise<ArticleData | null> {
  const sql = getSql();
  const rows = await sql`SELECT * FROM articles WHERE id = ${id} LIMIT 1;`;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export type ArticleInput = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImage?: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
};

export async function isArticleSlugTaken(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const sql = getSql();
  const rows = excludeId
    ? await sql`SELECT 1 FROM articles WHERE slug = ${slug} AND id != ${excludeId} LIMIT 1;`
    : await sql`SELECT 1 FROM articles WHERE slug = ${slug} LIMIT 1;`;
  return rows.length > 0;
}

export async function createArticle(input: ArticleInput): Promise<ArticleData> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO articles (
      slug, title, excerpt, content_html, cover_image, category, tags, status,
      published_at
    ) VALUES (
      ${input.slug}, ${input.title}, ${input.excerpt}, ${input.contentHtml},
      ${input.coverImage ?? null}, ${input.category}, ${input.tags}, ${input.status},
      ${input.status === "published" ? new Date().toISOString() : null}
    )
    RETURNING *;
  `;
  return mapRow(rows[0]);
}

export async function updateArticle(
  id: string,
  input: ArticleInput
): Promise<ArticleData | null> {
  const sql = getSql();
  // Publishing for the first time stamps published_at; re-publishing keeps it.
  const rows = await sql`
    UPDATE articles SET
      slug = ${input.slug},
      title = ${input.title},
      excerpt = ${input.excerpt},
      content_html = ${input.contentHtml},
      cover_image = ${input.coverImage ?? null},
      category = ${input.category},
      tags = ${input.tags},
      status = ${input.status},
      published_at = CASE
        WHEN ${input.status} = 'published' THEN COALESCE(published_at, NOW())
        ELSE published_at
      END,
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`DELETE FROM articles WHERE id = ${id} RETURNING id;`;
  return rows.length > 0;
}
