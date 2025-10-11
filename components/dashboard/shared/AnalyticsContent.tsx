import { memo } from 'react';

export const AnalyticsContent = memo(() => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
          <h3 className="font-medium text-[var(--color-foreground)] mb-4">Page Views</h3>
          <div className="h-48 flex items-center justify-center text-[var(--color-muted-foreground)]">
            Chart placeholder
          </div>
        </div>
        <div className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)]">
          <h3 className="font-medium text-[var(--color-foreground)] mb-4">User Engagement</h3>
          <div className="h-48 flex items-center justify-center text-[var(--color-muted-foreground)]">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
});

AnalyticsContent.displayName = 'AnalyticsContent';