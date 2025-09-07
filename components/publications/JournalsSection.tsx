"use client";

import { useState } from "react";
import { Search, Filter, ExternalLink, Download, Users, Calendar, Tag, Settings, MapPin, Heart, Target } from "lucide-react";
import { mockResearchJournals, mockCommunityServiceJournals } from "@/mock-data/publications";
import { ResearchJournalData, CommunityServiceJournalData } from "@/types/publications";
import { AdvancedSearch, AdvancedSearchFilters } from "./AdvancedSearch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type JournalType = ResearchJournalData | CommunityServiceJournalData;

export const JournalsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
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

  const types = [
    { id: "all", label: "All Types" },
    { id: "research", label: "Research Journals" },
    { id: "community", label: "Community Service" }
  ];

  // Advanced search handler
  const handleAdvancedSearch = (filters: AdvancedSearchFilters) => {
    setAdvancedFilters(filters);
    setSearchQuery(""); // Clear basic search when using advanced search
  };

  const clearAdvancedSearch = () => {
    setAdvancedFilters(null);
  };

  // Combine both journal types
  const allJournals: (JournalType & { type: 'research' | 'community' })[] = [
    ...mockResearchJournals.map(journal => ({ ...journal, type: 'research' as const })),
    ...mockCommunityServiceJournals.map(journal => ({ ...journal, type: 'community' as const }))
  ];

  // Enhanced filtering logic
  const filteredJournals = allJournals
    .filter((journal) => {
      // Type filter
      if (selectedType !== "all" && journal.type !== selectedType) return false;

      // Basic search logic
      if (!advancedFilters && searchQuery) {
        const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          journal.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          journal.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Additional search fields for community service journals
        if (journal.type === 'community') {
          const communityJournal = journal as CommunityServiceJournalData & { type: 'community' };
          const communityMatches = communityJournal.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
            communityJournal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            communityJournal.beneficiaries.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
          
          if (!matchesSearch && !communityMatches) return false;
        } else {
          if (!matchesSearch) return false;
        }
      }

      // Advanced search logic (primarily for research journals)
      if (advancedFilters && advancedFilters.searchTerms.length > 0 && journal.type === 'research') {
        const researchJournal = journal as ResearchJournalData;
        const matchesAdvancedSearch = advancedFilters.searchTerms.every((searchTerm, index) => {
          if (!searchTerm.term.trim()) return true;

          let fieldMatches = false;
          const term = searchTerm.term.toLowerCase();

          switch (searchTerm.field) {
            case 'all':
              fieldMatches = researchJournal.title.toLowerCase().includes(term) ||
                researchJournal.abstract.toLowerCase().includes(term) ||
                researchJournal.authors.some(author => author.toLowerCase().includes(term)) ||
                researchJournal.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
                researchJournal.journal.toLowerCase().includes(term) ||
                Boolean(researchJournal.doi && researchJournal.doi.toLowerCase().includes(term));
              break;
            case 'title':
              fieldMatches = researchJournal.title.toLowerCase().includes(term);
              break;
            case 'abstract':
              fieldMatches = researchJournal.abstract.toLowerCase().includes(term);
              break;
            case 'authors':
              fieldMatches = researchJournal.authors.some(author => author.toLowerCase().includes(term));
              break;
            case 'keywords':
              fieldMatches = researchJournal.keywords.some(keyword => keyword.toLowerCase().includes(term));
              break;
            case 'journal':
              fieldMatches = researchJournal.journal.toLowerCase().includes(term);
              break;
            case 'doi':
              fieldMatches = researchJournal.doi ? researchJournal.doi.toLowerCase().includes(term) : false;
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

      // Category filter (only for research journals)
      if (journal.type === 'research') {
        const researchJournal = journal as ResearchJournalData;
        const matchesCategory = selectedCategory === "all" || researchJournal.category === selectedCategory;
        if (!matchesCategory) return false;
      }

      // Date filters from advanced search
      if (advancedFilters) {
        if (advancedFilters.publicationYearFrom && journal.year < parseInt(advancedFilters.publicationYearFrom)) {
          return false;
        }
        if (advancedFilters.publicationYearTo && journal.year > parseInt(advancedFilters.publicationYearTo)) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "citations":
          // Only research journals have citation count
          if (a.type === 'research' && b.type === 'research') {
            return (b as ResearchJournalData).citationCount - (a as ResearchJournalData).citationCount;
          }
          // Fallback to year for community journals or mixed sorting
          return b.year - a.year;
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
          Journals
        </h2>
        <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
          Discover our comprehensive collection of research publications and community service journals that contribute to scientific knowledge and community development.
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
                placeholder={advancedFilters ? "Advanced search is active" : "Search by title, authors, keywords, community, or location..."}
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

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] z-10" />
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="pl-10 pr-8 py-6 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="border-none">
                  {types.map((type) => (
                    <SelectItem className="bg-white hover:bg-gray-100 border-none" key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter (only show for research or all) */}
            {(selectedType === "all" || selectedType === "research") && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)] z-10" />
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="pl-10 pr-8 py-6 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[200px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="border-none">
                    {categories.map((category) => (
                      <SelectItem className="bg-white hover:bg-gray-100 border-none" key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort */}
            <div className="relative">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as "year" | "citations" | "title")}
              >
                <SelectTrigger className="px-4 py-6 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[150px]">
                  <SelectValue placeholder="Sort by Year" />
                </SelectTrigger>
                <SelectContent className="border-none">
                  <SelectItem className="bg-white hover:bg-gray-100 border-none" value="year">Sort by Year</SelectItem>
                  <SelectItem className="bg-white hover:bg-gray-100 border-none" value="citations">Sort by Citations</SelectItem>
                  <SelectItem className="bg-white hover:bg-gray-100 border-none" value="title">Sort by Title</SelectItem>
                </SelectContent>
              </Select>
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
          journal.type === 'research' ? (
            <ResearchJournalCard key={journal.id} journal={journal as ResearchJournalData} />
          ) : (
            <CommunityServiceCard key={journal.id} journal={journal as CommunityServiceJournalData} />
          )
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

const ResearchJournalCard = ({ journal }: { journal: ResearchJournalData }) => {
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
          {/* Title and Badges */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-[var(--color-foreground)] leading-tight hover:text-[var(--color-primary)] transition-colors">
              <a href={`/publications/${journal.id}`}>
                {journal.title}
              </a>
            </h3>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                Research
              </span>
              {journal.isOpenAccess && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  Open Access
                </span>
              )}
            </div>
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

const CommunityServiceCard = ({ journal }: { journal: CommunityServiceJournalData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {/* Title with Community Service Badge */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-[var(--color-foreground)] leading-tight">
              {journal.title}
            </h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
              <Heart className="h-3 w-3" />
              Community Service
            </span>
          </div>

          {/* Authors */}
          <div className="flex items-center gap-2 text-[var(--color-muted-foreground)]">
            <Users className="h-4 w-4" />
            <span>{journal.authors.join(", ")}</span>
          </div>

          {/* Location and Community */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{journal.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{journal.community}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{journal.journal} ({journal.year})</span>
            </div>
          </div>

          {/* Abstract */}
          <p className="text-[var(--color-muted-foreground)] leading-relaxed">
            {journal.abstract}
          </p>

          {/* Impact Description */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Community Impact</h4>
            <p className="text-green-700 text-sm">
              {journal.impactDescription}
            </p>
          </div>

          {/* Beneficiaries */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Beneficiaries:</h4>
            <div className="flex flex-wrap gap-2">
              {journal.beneficiaries.map((beneficiary, index) => (
                <span
                  key={index}
                  className="bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {beneficiary}
                </span>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {journal.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded-md text-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>

          {/* Journal Details */}
          <div className="text-sm text-[var(--color-muted-foreground)] space-y-1">
            {journal.volume && journal.issue && (
              <div>Vol. {journal.volume}, Issue {journal.issue}</div>
            )}
            {journal.pages && (
              <div>Pages: {journal.pages}</div>
            )}
            <div>Published: {new Date(journal.publicationDate).toLocaleDateString('id-ID', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
          </div>
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
        </div>
      </div>
    </div>
  );
};