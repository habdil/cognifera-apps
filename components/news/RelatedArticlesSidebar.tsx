import { PublicArticle } from "@/lib/api/public-articles";
import { RelatedArticleCard } from "./RelatedArticleCard";

interface RelatedArticlesSidebarProps {
  articles: PublicArticle[];
  formatDate: (date: string) => string;
  getCategoryColor: (category: PublicArticle['category']) => string;
}

export function RelatedArticlesSidebar({
  articles,
  formatDate,
  getCategoryColor
}: RelatedArticlesSidebarProps) {
  if (articles.length === 0) return null;

  return (
    <div className="w-80 hidden lg:block">
      {/* Ad Space */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="text-4xl mb-3">📢</div>
          <p className="text-sm text-gray-600 font-medium">Advertisement Space</p>
          <p className="text-xs text-gray-500 mt-2">Your ad could be here</p>
        </div>
      </div>

      {/* Related News in Sidebar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Artikel Terkait</h3>
        <div className="space-y-4">
          {articles.map((article) => (
            <RelatedArticleCard
              key={article.id}
              article={article}
              variant="sidebar"
              formatDate={formatDate}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>

      {/* Another Ad Space */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mt-6">
        <div className="text-center">
          <div className="text-3xl mb-3">🎯</div>
          <p className="text-sm text-gray-700 font-medium">Sponsored Content</p>
          <p className="text-xs text-gray-600 mt-2">Premium placement available</p>
        </div>
      </div>
    </div>
  );
}
