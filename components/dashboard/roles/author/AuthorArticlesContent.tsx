import { memo } from 'react';

export const AuthorArticlesContent = memo(() => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">My Articles</h1>
        <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          New Article
        </button>
      </div>

      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
        <h3 className="font-medium text-[var(--color-foreground)] mb-4">Recent Articles</h3>
        <div className="space-y-3">
          {[
            'Getting Started with Next.js',
            'Advanced React Patterns',
            'Building Scalable APIs'
          ].map((title, i) => (
            <div key={i} className="flex justify-between items-center p-3 hover:bg-[var(--color-muted)] rounded-lg transition-colors">
              <span className="text-[var(--color-foreground)]">{title}</span>
              <span className="text-sm text-[var(--color-muted-foreground)]">Published</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

AuthorArticlesContent.displayName = 'AuthorArticlesContent';