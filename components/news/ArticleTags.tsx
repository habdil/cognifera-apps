import Link from "next/link";

interface ArticleTagsProps {
  tags: string[];
}

export function ArticleTags({ tags }: ArticleTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/#news?tag=${tag}`}
            className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-100 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
