import { ContentImage } from "@/components/shared/ContentImage";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { listAllBooks } from "@/lib/books";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBooksPage() {
  const books = await listAllBooks();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Buku</h1>
          <p className="text-sm text-gray-500 mt-1">{books.length} buku di katalog</p>
        </div>
        <Link
          href="/admin/books/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Buku
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="border border-gray-200 bg-white py-20 text-center">
          <p className="text-sm text-gray-400">Belum ada buku. Tambahkan buku pertama Anda.</p>
        </div>
      ) : (
        <div className="border border-gray-200 bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11px] uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">Buku</th>
                <th className="px-4 py-3 font-medium">Tahun</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-gray-100 last:border-0 hover:bg-[#FAFAF8]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-14 bg-gray-50 border border-gray-100 shrink-0">
                        <ContentImage
                          src={book.coverImage}
                          alt={book.coverAlt ?? book.title}
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-950 line-clamp-1">{book.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">
                          {book.authors.join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{book.publicationYear}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{book.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-medium border px-2 py-0.5 tracking-wide ${
                        book.status === "published"
                          ? "text-green-700 border-green-200 bg-green-50"
                          : "text-amber-700 border-amber-200 bg-amber-50"
                      }`}
                    >
                      {book.status === "published" ? "Terbit" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/books/${book.id}/edit`}
                        className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-3 py-1.5 text-xs font-medium transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/books/${book.id}`}
                        label={`buku "${book.title}"`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
