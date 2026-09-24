"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/editor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { processContentImages } from "@/lib/utils/image-processor";
import { ARTICLE_CATEGORIES, type ArticleData } from "@/lib/articles-shared";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

export function ArticleForm({ article }: { article?: ArticleData }) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(article));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [category, setCategory] = useState(article?.category ?? "company");
  const [tags, setTags] = useState(article?.tags.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(article?.coverImage ?? "");
  const [contentHtml, setContentHtml] = useState(article?.contentHtml ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);

  const handleSubmit = async (status: "draft" | "published") => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Judul dan slug wajib diisi.");
      return;
    }

    setSubmitting(true);
    try {
      // Embedded pasted/base64 images get uploaded to Cloudinary first.
      setProgress("Memproses gambar konten...");
      const processedHtml = await processContentImages(
        contentHtml,
        (current, total) => setProgress(`Upload gambar ${current}/${total}...`)
      );
      setContentHtml(processedHtml);

      setProgress("Menyimpan artikel...");
      const payload = {
        title,
        slug,
        excerpt,
        category,
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        coverImage,
        contentHtml: processedHtml,
        status,
      };

      const response = await fetch(
        article ? `/api/admin/articles/${article.id}` : "/api/admin/articles",
        {
          method: article ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        toast.error(result?.message || "Gagal menyimpan artikel.");
        setSubmitting(false);
        setProgress(null);
        return;
      }

      toast.success(
        status === "published" ? "Artikel dipublikasikan." : "Draft tersimpan."
      );
      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan.");
      setSubmitting(false);
      setProgress(null);
    }
  };

  const fieldLabel = "text-xs uppercase tracking-wide text-gray-500";

  return (
    <div className="space-y-6 max-w-4xl">
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <div className="space-y-2">
          <Label className={fieldLabel}>Judul *</Label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
            placeholder="Judul artikel"
            className="rounded-none text-lg font-semibold"
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Slug (URL) *</Label>
          <Input
            value={slug}
            onChange={(e) => {
              setSlugEdited(true);
              setSlug(slugify(e.target.value));
            }}
            className="rounded-none font-mono text-xs"
          />
          <p className="text-[11px] text-gray-400">/news/{slug || "..."}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={fieldLabel}>Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-none w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {ARTICLE_CATEGORIES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Tags (pisahkan dengan koma)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="riset, publikasi"
              className="rounded-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Ringkasan (excerpt)</Label>
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Ringkasan singkat untuk kartu berita dan SEO"
            className="rounded-none"
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Cover</Label>
          <ImageUploadField
            folder="articles"
            value={coverImage}
            onChange={setCoverImage}
            label="Upload Cover"
          />
        </div>
      </section>

      <section className="space-y-2">
        <Label className={fieldLabel}>Konten *</Label>
        <RichTextEditor
          content={contentHtml}
          onChange={setContentHtml}
          placeholder="Tulis artikel di sini..."
        />
      </section>

      <div className="flex items-center gap-3">
        <Button
          onClick={() => handleSubmit("published")}
          disabled={submitting}
          className="rounded-none bg-primary hover:bg-primary/90 px-8"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publikasikan"}
        </Button>
        <Button
          onClick={() => handleSubmit("draft")}
          disabled={submitting}
          variant="outline"
          className="rounded-none"
        >
          Simpan Draft
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="rounded-none"
          onClick={() => router.push("/admin/articles")}
          disabled={submitting}
        >
          Batal
        </Button>
        {progress && <p className="text-xs text-gray-500">{progress}</p>}
      </div>
    </div>
  );
}
