export const ARTICLE_CATEGORIES = [
  { value: "company", label: "Berita Perusahaan" },
  { value: "research", label: "Riset & Publikasi" },
  { value: "announcement", label: "Pengumuman" },
  { value: "tips", label: "Tips & Panduan" },
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]["value"];

export function getCategoryLabel(value: string): string {
  return (
    ARTICLE_CATEGORIES.find((category) => category.value === value)?.label ?? value
  );
}

export interface ArticleData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImage?: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
