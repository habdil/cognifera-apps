"use client";

import { useState } from "react";
import { Search, Filter, ExternalLink, Download, Users, Calendar, Tag, Settings } from "lucide-react";
import { mockResearchJournals } from "@/mock-data/publications";
import { ResearchJournalData } from "@/types/publications";
import { AdvancedSearch, AdvancedSearchFilters } from "./AdvancedSearch";

export const ResearchJournalsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year" | "citations" | "title">("year");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedSearchFilters | null>(null);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "computer-science", label: "Computer Science" },
    { id: "engineering", label: "Engineering" },
    { id: "mathematics", label: "Mathematics" },
    { id: "physics", label: "Physics" },
    { id: "other", label: "Other" }
  ];

  // Advanced search handler
  const handleAdvancedSearch = (filters: AdvancedSearchFilters) => {
    setAdvancedFilters(filters);
    setSearchQuery(""); // Clear basic search when using advanced search
  };

  const clearAdvancedSearch = () => {
    setAdvancedFilters(null);
  };

  // Enhanced filtering logic
  const filteredJournals = mockResearchJournals
    .filter((journal) => {
      // Basic search logic
      if (!advancedFilters && searchQuery) {
        const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          journal.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          journal.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (!matchesSearch) return false;
      }

      // Advanced search logic
      if (advancedFilters && advancedFilters.searchTerms.length > 0) {
        const matchesAdvancedSearch = advancedFilters.searchTerms.every((searchTerm, index) => {
          if (!searchTerm.term.trim()) return true;

          let fieldMatches = false;
          const term = searchTerm.term.toLowerCase();

          switch (searchTerm.field) {
            case 'all':
              fieldMatches = journal.title.toLowerCase().includes(term) ||
                journal.abstract.toLowerCase().includes(term) ||
                journal.authors.some(author => author.toLowerCase().includes(term)) ||
                journal.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
                journal.journal.toLowerCase().includes(term) ||
                Boolean(journal.doi && journal.doi.toLowerCase().includes(term));
              break;
            case 'title':
              fieldMatches = journal.title.toLowerCase().includes(term);
              break;
            case 'abstract':
              fieldMatches = journal.abstract.toLowerCase().includes(term);
              break;
            case 'authors':
              fieldMatches = journal.authors.some(author => author.toLowerCase().includes(term));
              break;
            case 'keywords':
              fieldMatches = journal.keywords.some(keyword => keyword.toLowerCase().includes(term));
              break;
            case 'journal':
              fieldMatches = journal.journal.toLowerCase().includes(term);
              break;
            case 'doi':
              fieldMatches = journal.doi ? journal.doi.toLowerCase().includes(term) : false;
              break;
          }

          // Apply boolean operator logic (simplified)
          if (index === 0) return fieldMatches;
          
          switch (searchTerm.operator) {
            case 'AND':
              return fieldMatches;
            case 'OR':
              return fieldMatches;
            case 'NOT':
              return !fieldMatches;
            default:
              return fieldMatches;
          }
        });

        if (!matchesAdvancedSearch) return false;
      }

      // Category filter
      const matchesCategory = selectedCategory === "all" || journal.category === selectedCategory;
      if (!matchesCategory) return false;

      // Date filters from advanced search
      if (advancedFilters) {
        if (advancedFilters.publicationYearFrom && journal.year < parseInt(advancedFilters.publicationYearFrom)) {
          return false;
        }
        if (advancedFilters.publicationYearTo && journal.year > parseInt(advancedFilters.publicationYearTo)) {
          return false;
        }
        // Note: Date added filter would require additional data field
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "citations":
          return b.citationCount - a.citationCount;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--color-foreground)] mb-4">
          Research Journals
        </h2>
        <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
          Discover our peer-reviewed academic publications contributing to scientific knowledge across various disciplines.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)]" />
              <input
                type="text"
                placeholder={advancedFilters ? "Advanced search is active" : "Search by title, authors, or keywords..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={!!advancedFilters}
                className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>

            {/* Advanced Search Button */}
            <button
              onClick={() => setIsAdvancedSearchOpen(true)}
              className={`flex items-center gap-2 px-6 py-3 border rounded-lg font-medium transition-colors ${
                advancedFilters 
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
              }`}
            >
              <Settings className="h-5 w-5" />
              Advanced Search
            </button>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[200px]"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "year" | "citations" | "title")}
                className="px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[150px]"
              >
                <option value="year">Sort by Year</option>
                <option value="citations">Sort by Citations</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>

          {/* Active Advanced Search Display */}
          {advancedFilters && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800 mb-2">Active Advanced Search:</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    {advancedFilters.searchTerms.map((term, index) => (
                      <div key={term.id}>
                        {index > 0 && <span className="font-medium">{term.operator} </span>}
                        <span className="font-medium">{term.field}:</span> "{term.term}"
                      </div>
                    ))}
                    {(advancedFilters.publicationYearFrom || advancedFilters.publicationYearTo) && (
                      <div>
                        <span className="font-medium">Publication Year:</span>{' '}
                        {advancedFilters.publicationYearFrom || '∞'} - {advancedFilters.publicationYearTo || '∞'}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={clearAdvancedSearch}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-[var(--color-muted-foreground)]">
        Found {filteredJournals.length} publication{filteredJournals.length !== 1 ? 's' : ''}
      </div>

      {/* Journal List */}
      <div className="grid gap-6">
        {filteredJournals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>

      {filteredJournals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[var(--color-muted-foreground)] text-lg">
            No publications found matching your criteria.
          </div>
        </div>
      )}

      {/* Advanced Search Modal */}
      <AdvancedSearch
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={handleAdvancedSearch}
      />
    </div>
  );
};

const JournalCard = ({ journal }: { journal: ResearchJournalData }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or links
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
      return;
    }
    window.location.href = `/publications/${journal.id}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow cursor-pointer"
         onClick={handleCardClick}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {/* Title and Open Access Badge */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-[var(--color-foreground)] leading-tight hover:text-[var(--color-primary)] transition-colors">
              <a href={`/publications/${journal.id}`}>
                {journal.title}
              </a>
            </h3>
            {journal.isOpenAccess && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                Open Access
              </span>
            )}
          </div>

          {/* Authors */}
          <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
            <Users className="h-4 w-4" />
            <span>{journal.authors.join(", ")}</span>
          </div>

          {/* Journal Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{journal.journal} ({journal.year})</span>
            </div>
            {journal.volume && journal.issue && (
              <span>Vol. {journal.volume}, Issue {journal.issue}</span>
            )}
            {journal.pages && (
              <span>pp. {journal.pages}</span>
            )}
            <span>{journal.citationCount} citations</span>
          </div>

          {/* Abstract */}
          <p className="text-[var(--color-muted-foreground)] leading-relaxed">
            {journal.abstract}
          </p>

          {/* Keywords */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            {journal.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded-md text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* DOI */}
          {journal.doi && (
            <div className="text-sm text-[var(--color-muted-foreground)]">
              DOI: {journal.doi}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex lg:flex-col gap-3 lg:w-40">
          {journal.pdfUrl && (
            <a
              href={journal.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          )}
          <a
            href={`/publications/${journal.id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--color-border)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            View Online
          </a>
        </div>
      </div>
    </div>
  );
};