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
import { ImageUploadField, MultiImageUploadField } from "@/components/admin/ImageUploadField";
import type { BookRecord } from "@/lib/books";

type BookFormState = {
  title: string;
  slug: string;
  authors: string;
  publisher: string;
  publicationYear: string;
  isbn: string;
  pages: string;
  pageLabel: string;
  language: string;
  category: string;
  description: string;
  longDescription: string;
  keywords: string;
  coverImage: string;
  coverAlt: string;
  previewImages: string[];
  price: string;
  availability: string;
  format: string;
  previewUrl: string;
  purchaseUrl: string;
  purchaseLabel: string;
  tableOfContents: string;
  highlights: string;
  status: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

function lines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function commaList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toFormState(book?: BookRecord): BookFormState {
  return {
    title: book?.title ?? "",
    slug: book?.slug ?? "",
    authors: book?.authors.join("\n") ?? "",
    publisher: book?.publisher ?? "PT Cognifera Education Academy",
    publicationYear: String(book?.publicationYear ?? new Date().getFullYear()),
    isbn: book?.isbn ?? "",
    pages: book?.pages ? String(book.pages) : "",
    pageLabel: book?.pageLabel ?? "",
    language: book?.language ?? "id",
    category: book?.category ?? "textbook",
    description: book?.description ?? "",
    longDescription: book?.longDescription?.join("\n") ?? "",
    keywords: book?.keywords.join(", ") ?? "",
    coverImage: book?.coverImage ?? "",
    coverAlt: book?.coverAlt ?? "",
    previewImages: book?.previewImages ?? [],
    price: book?.price ? String(book.price) : "",
    availability: book?.availability ?? "available",
    format: book?.format ?? "print",
    previewUrl: book?.previewUrl ?? "",
    purchaseUrl: book?.purchaseUrl ?? "",
    purchaseLabel: book?.purchaseLabel ?? "Tanya Buku Ini",
    tableOfContents: book?.tableOfContents?.join("\n") ?? "",
    highlights: book?.highlights?.join("\n") ?? "",
    status: book?.status ?? "published",
  };
}

export function BookForm({ book }: { book?: BookRecord }) {
  const router = useRouter();
  const [form, setForm] = useState<BookFormState>(() => toFormState(book));
  const [slugEdited, setSlugEdited] = useState(Boolean(book));
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof BookFormState>(key: K, value: BookFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      title: form.title,
      slug: form.slug,
      authors: lines(form.authors),
      publisher: form.publisher,
      publicationYear: Number(form.publicationYear),
      isbn: form.isbn,
      pages: Number(form.pages) || 0,
      pageLabel: form.pageLabel,
      language: form.language,
      category: form.category,
      description: form.description,
      longDescription: lines(form.longDescription),
      keywords: commaList(form.keywords),
      coverImage: form.coverImage,
      coverAlt: form.coverAlt,
      previewImages: form.previewImages,
      price: form.price ? Number(form.price) : undefined,
      availability: form.availability,
      format: form.format,
      previewUrl: form.previewUrl,
      purchaseUrl: form.purchaseUrl,
      purchaseLabel: form.purchaseLabel,
      tableOfContents: lines(form.tableOfContents),
      highlights: lines(form.highlights),
      status: form.status,
    };

    try {
      const response = await fetch(
        book ? `/api/admin/books/${book.id}` : "/api/admin/books",
        {
          method: book ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        toast.error(result?.message || "Gagal menyimpan buku.");
        setSubmitting(false);
        return;
      }

      toast.success(book ? "Buku diperbarui." : "Buku ditambahkan.");
      router.push("/admin/books");
      router.refresh();
    } catch {
      toast.error("Tidak dapat terhubung ke server.");
      setSubmitting(false);
    }
  };

  const fieldLabel = "text-xs uppercase tracking-wide text-gray-500";
  const inputClass = "rounded-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* Informasi utama */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
          Informasi Utama
        </h2>

        <div className="space-y-2">
          <Label className={fieldLabel}>Judul *</Label>
          <Input
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!slugEdited) set("slug", slugify(e.target.value));
            }}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Slug (URL) *</Label>
          <Input
            value={form.slug}
            onChange={(e) => {
              setSlugEdited(true);
              set("slug", slugify(e.target.value));
            }}
            required
            className={`${inputClass} font-mono text-xs`}
          />
          <p className="text-[11px] text-gray-400">
            /publications/books/{form.slug || "..."}
          </p>
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Penulis * (satu per baris)</Label>
          <Textarea
            value={form.authors}
            onChange={(e) => set("authors", e.target.value)}
            rows={3}
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={fieldLabel}>Penerbit</Label>
            <Input
              value={form.publisher}
              onChange={(e) => set("publisher", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Tahun Terbit *</Label>
            <Input
              type="number"
              value={form.publicationYear}
              onChange={(e) => set("publicationYear", e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>ISBN</Label>
            <Input
              value={form.isbn}
              onChange={(e) => set("isbn", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Jumlah Halaman</Label>
            <Input
              type="number"
              value={form.pages}
              onChange={(e) => set("pages", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label className={fieldLabel}>Label Halaman (mis. i-viii + 305 halaman)</Label>
            <Input
              value={form.pageLabel}
              onChange={(e) => set("pageLabel", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={fieldLabel}>Bahasa</Label>
            <Select value={form.language} onValueChange={(v) => set("language", v)}>
              <SelectTrigger className="rounded-none w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Kategori</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger className="rounded-none w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="textbook">Buku Teks</SelectItem>
                <SelectItem value="reference">Referensi</SelectItem>
                <SelectItem value="monograph">Monograf</SelectItem>
                <SelectItem value="proceedings">Prosiding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Deskripsi */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">Deskripsi</h2>

        <div className="space-y-2">
          <Label className={fieldLabel}>Deskripsi Singkat *</Label>
          <Textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Deskripsi Lengkap (satu paragraf per baris)</Label>
          <Textarea
            value={form.longDescription}
            onChange={(e) => set("longDescription", e.target.value)}
            rows={5}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Kata Kunci (pisahkan dengan koma)</Label>
          <Input
            value={form.keywords}
            onChange={(e) => set("keywords", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Highlights (satu per baris)</Label>
          <Textarea
            value={form.highlights}
            onChange={(e) => set("highlights", e.target.value)}
            rows={4}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Daftar Isi (satu bab per baris)</Label>
          <Textarea
            value={form.tableOfContents}
            onChange={(e) => set("tableOfContents", e.target.value)}
            rows={4}
            className={inputClass}
          />
        </div>
      </section>

      {/* Gambar */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">Gambar</h2>

        <div className="space-y-2">
          <Label className={fieldLabel}>Cover *</Label>
          <ImageUploadField
            folder="books"
            value={form.coverImage}
            onChange={(url) => set("coverImage", url)}
            label="Upload Cover"
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Alt Text Cover</Label>
          <Input
            value={form.coverAlt}
            onChange={(e) => set("coverAlt", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>Gambar Preview</Label>
          <MultiImageUploadField
            folder="books"
            values={form.previewImages}
            onChange={(urls) => set("previewImages", urls)}
          />
        </div>
      </section>

      {/* Penjualan & status */}
      <section className="bg-white border border-gray-200 p-6 space-y-5">
        <h2 className="text-sm font-bold text-gray-950 uppercase tracking-wide">
          Penjualan & Status
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={fieldLabel}>Harga (Rp, kosongkan jika hubungi kami)</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Ketersediaan</Label>
            <Select value={form.availability} onValueChange={(v) => set("availability", v)}>
              <SelectTrigger className="rounded-none w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="available">Tersedia</SelectItem>
                <SelectItem value="out-of-stock">Habis</SelectItem>
                <SelectItem value="pre-order">Pre-order</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Format</Label>
            <Select value={form.format} onValueChange={(v) => set("format", v)}>
              <SelectTrigger className="rounded-none w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="print">Cetak</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="both">Cetak & Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>Status</Label>
            <Select value={form.status} onValueChange={(v) => set("status", v)}>
              <SelectTrigger className="rounded-none w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="published">Terbit</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className={fieldLabel}>URL Pembelian (kosongkan untuk tombol WhatsApp)</Label>
          <Input
            value={form.purchaseUrl}
            onChange={(e) => set("purchaseUrl", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={fieldLabel}>Label Tombol Beli</Label>
            <Input
              value={form.purchaseLabel}
              onChange={(e) => set("purchaseLabel", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <Label className={fieldLabel}>URL Preview (PDF/e-book)</Label>
            <Input
              value={form.previewUrl}
              onChange={(e) => set("previewUrl", e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={submitting || !form.coverImage}
          className="rounded-none bg-primary hover:bg-primary/90 px-8"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : book ? (
            "Simpan Perubahan"
          ) : (
            "Tambah Buku"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-none"
          onClick={() => router.push("/admin/books")}
          disabled={submitting}
        >
          Batal
        </Button>
        {!form.coverImage && (
          <p className="text-xs text-amber-600">Upload cover dulu sebelum menyimpan.</p>
        )}
      </div>
    </form>
  );
}
