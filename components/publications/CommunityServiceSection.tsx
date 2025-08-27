"use client";

import { useState } from "react";
import { Search, MapPin, Users, Calendar, Download, Heart, Target } from "lucide-react";
import { mockCommunityServiceJournals } from "@/mock-data/publications";
import { CommunityServiceJournalData } from "@/types/publications";

export const CommunityServiceSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"year" | "title">("year");

  const filteredJournals = mockCommunityServiceJournals
    .filter((journal) => {
      const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        journal.community.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        journal.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
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
          Community Service Journals
        </h2>
        <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
          Explore our community engagement initiatives and service publications that make a positive impact on local communities across Indonesia.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)]">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--color-muted-foreground)]" />
            <input
              type="text"
              placeholder="Search by title, authors, community, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "year" | "title")}
              className="px-4 py-3 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white min-w-[150px]"
            >
              <option value="year">Sort by Year</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-[var(--color-muted-foreground)]">
        Found {filteredJournals.length} community service publication{filteredJournals.length !== 1 ? 's' : ''}
      </div>

      {/* Journal List */}
      <div className="grid gap-6">
        {filteredJournals.map((journal) => (
          <CommunityServiceCard key={journal.id} journal={journal} />
        ))}
      </div>

      {filteredJournals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[var(--color-muted-foreground)] text-lg">
            No community service publications found matching your criteria.
          </div>
        </div>
      )}
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