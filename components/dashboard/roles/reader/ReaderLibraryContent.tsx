import { memo } from 'react';

export const ReaderLibraryContent = memo(() => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">My Library</h1>
      </div>

      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
        <h3 className="font-medium text-[var(--color-foreground)] mb-4">Recently Read</h3>
        <div className="space-y-3">
          {[
            'Getting Started with Next.js',
            'Advanced React Patterns',
            'Building Scalable APIs'
          ].map((title, i) => (
            <div key={i} className="flex justify-between items-center p-3 hover:bg-[var(--color-muted)] rounded-lg transition-colors">
              <span className="text-[var(--color-foreground)]">{title}</span>
              <span className="text-sm text-[var(--color-muted-foreground)]">Read</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
        <h3 className="font-medium text-[var(--color-foreground)] mb-4">Bookmarked Articles</h3>
        <div className="space-y-3">
          {[
            'TypeScript Best Practices',
            'Modern CSS Techniques',
            'Database Optimization'
          ].map((title, i) => (
            <div key={i} className="flex justify-between items-center p-3 hover:bg-[var(--color-muted)] rounded-lg transition-colors">
              <span className="text-[var(--color-foreground)]">{title}</span>
              <span className="text-sm text-[var(--color-muted-foreground)]">Bookmarked</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ReaderLibraryContent.displayName = 'ReaderLibraryContent';