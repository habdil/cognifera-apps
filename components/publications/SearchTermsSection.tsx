"use client";

import { Plus, X } from "lucide-react";

interface SearchTerm {
  id: string;
  term: string;
  field: string;
  operator: string;
}

interface SearchTermsSectionProps {
  searchTerms: SearchTerm[];
  onAddTerm: () => void;
  onRemoveTerm: (id: string) => void;
  onUpdateTerm: (id: string, updates: Partial<SearchTerm>) => void;
}

export const SearchTermsSection = ({
  searchTerms,
  onAddTerm,
  onRemoveTerm,
  onUpdateTerm,
}: SearchTermsSectionProps) => {
  const metadataFields = [
    { value: 'all', label: 'All Metadata' },
    { value: 'title', label: 'Document Title' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'authors', label: 'Authors' },
    { value: 'keywords', label: 'Author Keywords' },
    { value: 'journal', label: 'Publication Title' },
    { value: 'doi', label: 'DOI' },
  ];

  const booleanOperators = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
    { value: 'NOT', label: 'NOT' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
        Search Terms and Fields
      </h3>
      
      {searchTerms.map((searchTerm, index) => (
        <div key={searchTerm.id} className="space-y-3">
          {index > 0 && (
            <div className="flex items-center gap-4">
              <select
                value={searchTerm.operator}
                onChange={(e) => onUpdateTerm(searchTerm.id, { operator: e.target.value })}
                className="px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[80px]"
              >
                {booleanOperators.map(op => (
                  <option key={op.value} value={op.value}>{op.label}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex gap-3 items-start">
            {/* Search Term Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter search term"
                value={searchTerm.term}
                onChange={(e) => onUpdateTerm(searchTerm.id, { term: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
            </div>

            {/* Field Selector */}
            <div className="w-48">
              <select
                value={searchTerm.field}
                onChange={(e) => onUpdateTerm(searchTerm.id, { field: e.target.value })}
                className="w-full px-3 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
              >
                {metadataFields.map(field => (
                  <option key={field.value} value={field.value}>{field.label}</option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {searchTerms.length > 1 && (
                <button
                  onClick={() => onRemoveTerm(searchTerm.id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove search term"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {index === searchTerms.length - 1 && (
                <button
                  onClick={onAddTerm}
                  className="p-3 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                  title="Add search term"
                >
                  <Plus className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};