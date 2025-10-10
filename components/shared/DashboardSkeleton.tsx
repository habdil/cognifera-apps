import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen bg-[var(--color-muted)]">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-[var(--color-background)] border-r border-[var(--color-border)] flex flex-col">
        {/* Logo Skeleton */}
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-center">
          <Skeleton className="h-10 w-24" />
        </div>

        {/* User Info Skeleton */}
        <div className="p-4 border-b border-[var(--color-border)]">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Navigation Skeleton */}
        <nav className="flex-1 p-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </nav>

        {/* Logout Skeleton */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)] space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-[var(--color-background)] p-6 rounded-lg border border-[var(--color-border)] space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
