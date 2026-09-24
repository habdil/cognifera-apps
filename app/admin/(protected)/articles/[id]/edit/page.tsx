import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-950 tracking-tight mb-8">Edit Artikel</h1>
      <ArticleForm article={article} />
    </div>
  );
}
