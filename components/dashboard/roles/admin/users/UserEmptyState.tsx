import { memo } from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserEmptyStateProps {
  onReset: () => void;
}

export const UserEmptyState = memo(({ onReset }: UserEmptyStateProps) => {
  return (
    <div className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] p-12 text-center">
      <Users className="w-12 h-12 text-[var(--color-muted-foreground)] mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
        Tidak ada user ditemukan
      </h3>
      <p className="text-[var(--color-muted-foreground)] mb-4">
        Coba ubah filter atau kata kunci pencarian Anda
      </p>
      <Button variant="outline" onClick={onReset}>
        Reset Filter
      </Button>
    </div>
  );
});

UserEmptyState.displayName = 'UserEmptyState';