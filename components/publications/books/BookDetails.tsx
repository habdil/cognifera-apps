"use client";

import Link from "next/link";
import { Share2, ExternalLink, FileText, MessageCircle } from "lucide-react";
import { BookData } from "@/types/publications";
import { formatBookPrice } from "@/lib/books";

interface BookDetailsProps {
  book: BookData;
  inquiryUrl: string;
}

export function BookDetails({ book, inquiryUrl }: BookDetailsProps) {
  const handleShare = async () => {
    const sharePayload = {
      title: book.title,
      text: book.description,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(sharePayload);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="lg:col-span-2 space-y-8">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-[var(--color-muted)] px-3 py-1 text-[var(--color-muted-foreground)] capitalize">
            {book.category.replace("-", " ")}
          </span>
          <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-[var(--color-primary)] uppercase">
            {book.language}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            {book.format === "both"
              ? "Print & Digital"
              : book.format === "digital"
                ? "Digital"
                : "Print"}
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-[var(--color-foreground)]">
          {book.title}
        </h1>
        <p className="mb-4 text-base text-[var(--color-muted-foreground)]">
          {book.authors.join(", ")}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
          >
            <Share2 className="h-4 w-4" />
            Bagikan
          </button>

          {book.previewUrl && (
            <Link
              href={book.previewUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
            >
              <FileText className="h-4 w-4" />
              Lihat Preview
            </Link>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--color-muted-foreground)]">Harga</p>
            <div className="text-3xl font-bold text-[var(--color-primary)]">
              {book.price ? formatBookPrice(book.price) : "Hubungi Kami"}
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm text-[var(--color-muted-foreground)]">
            {book.availability === "available"
              ? "Tersedia"
              : book.availability === "pre-order"
                ? "Pre-order"
                : "Kosong"}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {book.purchaseUrl ? (
            <Link
              href={book.purchaseUrl}
              target="_blank"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-medium text-[var(--color-primary-foreground)] hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              {book.purchaseLabel ?? "Beli Buku"}
            </Link>
          ) : (
            <Link
              href={inquiryUrl}
              target="_blank"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-medium text-[var(--color-primary-foreground)] hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              {book.purchaseLabel ?? "Tanya Buku Ini"}
            </Link>
          )}

          <Link
            href={inquiryUrl}
            target="_blank"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-5 py-3 font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
          >
            <MessageCircle className="h-4 w-4" />
            Hubungi Admin
          </Link>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xl font-bold text-[var(--color-foreground)]">
          Deskripsi
        </h3>
        <div className="space-y-4 text-[var(--color-foreground)]">
          <p className="leading-relaxed">{book.description}</p>
          {book.longDescription?.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-[var(--color-muted-foreground)]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {book.highlights?.length ? (
        <div>
          <h3 className="mb-3 text-xl font-bold text-[var(--color-foreground)]">
            Highlight
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {book.highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {book.tableOfContents?.length ? (
        <div>
          <h3 className="mb-3 text-xl font-bold text-[var(--color-foreground)]">
            Daftar Isi
          </h3>
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <ol className="space-y-3 text-sm text-[var(--color-foreground)]">
              {book.tableOfContents.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-semibold text-[var(--color-primary)]">
                    {index + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      <div>
        <h3 className="mb-4 text-xl font-bold text-[var(--color-foreground)]">
          Informasi Buku
        </h3>

        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-[var(--color-border)] bg-white p-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                Bahasa
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.language === "id" ? "Indonesia" : "English"}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                Penerbit
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.publisher}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                Penulis
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.authors.join(", ")}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                ISBN
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.isbn}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                Tahun
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.publicationYear}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                Halaman
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.pageLabel ?? (book.pages > 0 ? `${book.pages} halaman` : "Akan diperbarui")}
              </span>
            </div>
            <div className="flex">
              <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                Format
              </span>
              <span className="font-medium text-[var(--color-foreground)]">
                {book.format === "both"
                  ? "Print & Digital"
                  : book.format === "digital"
                    ? "Digital"
                    : "Print"}
              </span>
            </div>
            {book.keywords.length > 0 ? (
              <div className="flex">
                <span className="w-28 text-sm text-[var(--color-muted-foreground)]">
                  Keyword
                </span>
                <span className="font-medium text-[var(--color-foreground)]">
                  {book.keywords.join(", ")}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
