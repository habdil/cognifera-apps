import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { listAllArticles } from "@/lib/articles";
import { getCategoryLabel } from "@/lib/articles-shared";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(value: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(value);
}

export default async function AdminArticlesPage() {
  const articles = await listAllArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Artikel</h1>
          <p className="text-sm text-gray-500 mt-1">{articles.length} artikel</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tulis Artikel
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="border border-gray-200 bg-white py-20 text-center">
          <p className="text-sm text-gray-400">
            Belum ada artikel. Tulis artikel pertama Anda.
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 bg-white overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11px] uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Terbit</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-[#FAFAF8]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-950 line-clamp-1">{article.title}</p>
                    <p className="text-xs text-gray-400 font-mono line-clamp-1">
                      /news/{article.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {getCategoryLabel(article.category)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[11px] font-medium border px-2 py-0.5 tracking-wide ${
                        article.status === "published"
                          ? "text-green-700 border-green-200 bg-green-50"
                          : "text-amber-700 border-amber-200 bg-amber-50"
                      }`}
                    >
                      {article.status === "published" ? "Terbit" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(article.publishedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-950 px-3 py-1.5 text-xs font-medium transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/articles/${article.id}`}
                        label={`artikel "${article.title}"`}
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
