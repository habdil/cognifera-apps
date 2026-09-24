import { ArticleInput } from "@/lib/articles";
import { ARTICLE_CATEGORIES } from "@/lib/articles-shared";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CATEGORY_VALUES = new Set<string>(ARTICLE_CATEGORIES.map((c) => c.value));

export function parseArticleInput(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
): { input: ArticleInput; error: null } | { input: null; error: string } {
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const slug =
    typeof body?.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const contentHtml =
    typeof body?.contentHtml === "string" ? body.contentHtml : "";
  const status = body?.status === "published" ? "published" : "draft";
  const category =
    typeof body?.category === "string" && CATEGORY_VALUES.has(body.category)
      ? body.category
      : "company";

  if (!title) return { input: null, error: "Judul wajib diisi." };
  if (!slug || !SLUG_REGEX.test(slug)) {
    return { input: null, error: "Slug wajib diisi (huruf kecil, angka, tanda hubung)." };
  }
  if (status === "published" && contentHtml.replace(/<[^>]*>/g, "").trim().length === 0) {
    return { input: null, error: "Konten tidak boleh kosong saat dipublikasikan." };
  }

  const tags = Array.isArray(body?.tags)
    ? body.tags
        .filter((tag: unknown): tag is string => typeof tag === "string")
        .map((tag: string) => tag.trim())
        .filter(Boolean)
    : [];

  return {
    input: {
      slug,
      title,
      excerpt: typeof body?.excerpt === "string" ? body.excerpt.trim() : "",
      contentHtml,
      coverImage:
        typeof body?.coverImage === "string" && body.coverImage.trim()
          ? body.coverImage.trim()
          : undefined,
      category,
      tags,
      status,
    },
    error: null,
  };
}
