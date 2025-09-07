"use client";

import React, { useState } from "react";
import Link from "next/link";
import JournalSocialHeader from "./JournalSocialHeader";
import JournalSocialFooter from "./JournalSocialFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Download,
  ExternalLink,
  Calendar,
  FileText,
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  Eye,
  Users,
  Handshake,
  Globe,
  Target
} from "lucide-react";
import { mockCommunityServiceJournals } from "@/mock-data/publications";
import { createSocialJournalIssues } from "@/mock-data/journal";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialArchivesLayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const issues = createSocialJournalIssues(mockCommunityServiceJournals);
  const years = ["2024", "2023"];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === "all" || issue.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-white">
      <JournalSocialHeader activeItem="archives" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">Journal Archives</h1>
          <p className="text-lg text-[var(--color-muted-foreground)] max-w-3xl mx-auto">
            Browse through all published issues of Journal of Social Responsibility and Service. Access complete volumes of community service research, social responsibility studies, and social impact publications.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search issues by community focus or social impact theme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  style={{ '--color-primary': journalSocialConfig.colors.primary } as React.CSSProperties}
                />
              </div>
              
              {/* Year Filter */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-white border border-[var(--color-border)] rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  style={{ '--color-primary': journalSocialConfig.colors.primary } as React.CSSProperties}
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)] pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-[var(--color-muted)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues Count */}
        <div className="mb-8">
          <p className="text-[var(--color-muted-foreground)]">
            Showing {filteredIssues.length} of {issues.length} issues
            {selectedYear !== "all" && ` from ${selectedYear}`}
          </p>
        </div>

        {/* Issues Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredIssues.map((issue) => (
              <Card key={issue.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardContent className="p-0">
                  {/* Issue Cover */}
                  <div 
                    className="h-48 rounded-t-lg flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: issue.coverColor }}
                  >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="text-white text-center z-10 p-4">
                      {issue.isCurrentIssue && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                          Current Issue
                        </div>
                      )}
                      <Heart className="w-12 h-12 mx-auto mb-3 opacity-90" />
                      <h3 className="font-bold text-lg mb-1">Vol {issue.volume}, No {issue.number}</h3>
                      <p className="text-sm opacity-90">{issue.year}</p>
                    </div>
                  </div>
                  
                  {/* Issue Details */}
                  <div className="p-6">
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {issue.title}
                    </h4>
                    <p className="text-sm text-[var(--color-muted-foreground)] mb-4 line-clamp-3">
                      {issue.description}
                    </p>
                    
                    <div className="space-y-3">
                      {/* Issue Meta */}
                      <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {issue.publishDate}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {issue.articleCount} articles
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link 
                          href={issue.isCurrentIssue ? "/journal-social/current" : `/journal-social/archives/${issue.id}`} 
                          className="flex-1"
                        >
                          <Button 
                            size="sm" 
                            className="w-full text-white hover:opacity-90"
                            style={{ backgroundColor: journalSocialConfig.colors.primary }}
                          >
                            View Issue
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {filteredIssues.map((issue) => (
              <Card key={issue.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Issue Cover - Smaller in list view */}
                    <div 
                      className="w-full lg:w-32 h-32 lg:h-40 rounded-lg flex items-center justify-center relative flex-shrink-0"
                      style={{ backgroundColor: issue.coverColor }}
                    >
                      <div className="text-white text-center">
                        {issue.isCurrentIssue && (
                          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm px-1 py-0.5 rounded text-xs font-medium">
                            Current
                          </div>
                        )}
                        <Heart className="w-8 h-8 mx-auto mb-2 opacity-90" />
                        <div className="text-sm font-bold">Vol {issue.volume}, No {issue.number}</div>
                        <div className="text-xs opacity-90">{issue.year}</div>
                      </div>
                    </div>
                    
                    {/* Issue Details */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors mb-2">
                            {issue.title}
                          </h4>
                          <p className="text-[var(--color-muted-foreground)] mb-4 leading-relaxed">
                            {issue.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-muted-foreground)] mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {issue.publishDate}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {issue.articleCount} articles
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {issue.pageCount} pages
                        </div>
                        <div className="flex items-center">
                          <Handshake className="w-4 h-4 mr-1" />
                          Community Focus
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Link href={issue.isCurrentIssue ? "/journal-social/current" : `/journal-social/archives/${issue.id}`}>
                          <Button 
                            className="text-white hover:opacity-90"
                            style={{ backgroundColor: journalSocialConfig.colors.primary }}
                          >
                            View Full Issue
                          </Button>
                        </Link>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DOI
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-[var(--color-muted-foreground)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">No Issues Found</h3>
            <p className="text-[var(--color-muted-foreground)] mb-6">
              No issues match your current search criteria. Try adjusting your search terms or filters.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedYear("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Statistics */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-[var(--color-foreground)]">Archive Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  {issues.length}
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Total Issues</div>
              </div>
              <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  {issues.reduce((sum, issue) => sum + issue.articleCount, 0)}
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Community Research Articles</div>
              </div>
              <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  {issues.reduce((sum, issue) => sum + issue.pageCount, 0)}
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Total Pages</div>
              </div>
              <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  {years.length}
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Years Published</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Impact Summary */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-[var(--color-foreground)] flex items-center">
              <Target className="w-5 h-5 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
              Community Impact Through the Years
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Handshake className="w-8 h-8" style={{ color: journalSocialConfig.colors.primary }} />
                </div>
                <div 
                  className="text-xl font-bold mb-2"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  250K+
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">People Directly Served</div>
              </div>
              <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-8 h-8" style={{ color: journalSocialConfig.colors.primary }} />
                </div>
                <div 
                  className="text-xl font-bold mb-2"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  150+
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Communities Reached</div>
              </div>
              <div className="text-center p-4 border border-[var(--color-border)] rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8" style={{ color: journalSocialConfig.colors.primary }} />
                </div>
                <div 
                  className="text-xl font-bold mb-2"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  15+
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Partner Organizations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <JournalSocialFooter />
    </div>
  );
}