import { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface ArticleStatsCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  colorClass: string;
}

export const ArticleStatsCard = memo(({ icon: Icon, value, label, colorClass }: ArticleStatsCardProps) => {
  return (
    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-[var(--color-foreground)]">{value}</p>
          <p className="text-sm text-[var(--color-muted-foreground)]">{label}</p>
        </div>
      </div>
    </div>
  );
});

ArticleStatsCard.displayName = 'ArticleStatsCard';
