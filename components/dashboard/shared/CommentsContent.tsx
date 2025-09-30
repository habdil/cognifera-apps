import { memo } from 'react';

export const CommentsContent = memo(() => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Comments</h1>

      <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-6">
        <h3 className="font-medium text-[var(--color-foreground)] mb-4">Recent Comments</h3>
        <div className="space-y-4">
          {[
            { author: 'John Doe', comment: 'Great article! Very helpful.', article: 'Getting Started with Next.js' },
            { author: 'Jane Smith', comment: 'Thanks for sharing this.', article: 'Advanced React Patterns' },
            { author: 'Bob Johnson', comment: 'Could you add more examples?', article: 'Building Scalable APIs' }
          ].map((item, i) => (
            <div key={i} className="border border-[var(--color-border)] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-[var(--color-foreground)]">{item.author}</span>
                <span className="text-sm text-[var(--color-muted-foreground)]">2 hours ago</span>
              </div>
              <p className="text-[var(--color-foreground)] mb-2">{item.comment}</p>
              <p className="text-sm text-[var(--color-muted-foreground)]">On: {item.article}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CommentsContent.displayName = 'CommentsContent';