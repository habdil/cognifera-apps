"use client";

import { Calendar } from "lucide-react";

interface DateFilterSectionProps {
  dateType: 'added' | 'publication';
  publicationDateFrom: string;
  publicationDateTo: string;
  publicationYearFrom: string;
  publicationYearTo: string;
  onDateTypeChange: (type: 'added' | 'publication') => void;
  onPublicationDateFromChange: (date: string) => void;
  onPublicationDateToChange: (date: string) => void;
  onPublicationYearFromChange: (year: string) => void;
  onPublicationYearToChange: (year: string) => void;
}

export const DateFilterSection = ({
  dateType,
  publicationDateFrom,
  publicationDateTo,
  publicationYearFrom,
  publicationYearTo,
  onDateTypeChange,
  onPublicationDateFromChange,
  onPublicationDateToChange,
  onPublicationYearFromChange,
  onPublicationYearToChange,
}: DateFilterSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2 flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Publication Date
      </h3>

      {/* Date Type Selection */}
      <div className="space-y-3">
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="dateType"
              value="publication"
              checked={dateType === 'publication'}
              onChange={(e) => onDateTypeChange(e.target.value as 'publication')}
              className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <span className="text-[var(--color-foreground)]">Publication Year</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="dateType"
              value="added"
              checked={dateType === 'added'}
              onChange={(e) => onDateTypeChange(e.target.value as 'added')}
              className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <span className="text-[var(--color-foreground)]">Date Added to Database</span>
          </label>
        </div>

        {/* Date Range Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dateType === 'publication' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  From Year:
                </label>
                <input
                  type="number"
                  placeholder="1984"
                  min="1900"
                  max="2030"
                  value={publicationYearFrom}
                  onChange={(e) => onPublicationYearFromChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  To Year:
                </label>
                <input
                  type="number"
                  placeholder="2026"
                  min="1900"
                  max="2030"
                  value={publicationYearTo}
                  onChange={(e) => onPublicationYearToChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  From Date:
                </label>
                <input
                  type="date"
                  value={publicationDateFrom}
                  onChange={(e) => onPublicationDateFromChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  To Date:
                </label>
                <input
                  type="date"
                  value={publicationDateTo}
                  onChange={(e) => onPublicationDateToChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};