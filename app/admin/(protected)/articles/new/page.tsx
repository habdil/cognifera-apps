import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-950 tracking-tight mb-8">Tulis Artikel</h1>
      <ArticleForm />
    </div>
  );
}
