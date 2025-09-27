"use client";

import { BookOpen } from "lucide-react";
import { BookData } from "@/types/publications";

interface BookCoverProps {
  book: BookData;
}

export function BookCover({ book }: BookCoverProps) {
  return (
    <div className="space-y-4">
      {/* Main Cover */}
      <div className="aspect-[3/4] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg p-8 flex items-center justify-center">
        <div className="text-white text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <div className="text-lg font-bold mb-2">{book.title}</div>
          <div className="text-sm opacity-80">{book.authors[0]}</div>
        </div>
      </div>

      {/* Thumbnail previews */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((thumb) => (
          <div
            key={thumb}
            className="aspect-[3/4] bg-gray-100 rounded border-2 border-transparent hover:border-[var(--color-primary)] cursor-pointer transition-colors"
          >
            <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded flex items-center justify-center">
              <span className="text-xs text-[var(--color-muted-foreground)]">{thumb}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}