import { memo } from 'react';

export const AuthorCreateContent = memo(() => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Create Content</h1>

      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Title</label>
            <input
              id="title"
              type="text"
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
              placeholder="Enter content title..."
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">Content</label>
            <textarea
              id="content"
              rows={10}
              className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)]"
              placeholder="Write your content..."
            />
          </div>
          <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
});

AuthorCreateContent.displayName = 'AuthorCreateContent';