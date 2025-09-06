"use client";

import React from "react";
import Link from "next/link";
import JournalHeader from "./JournalHeader";
import JournalFooter from "./JournalFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Download,
  ExternalLink,
  Calendar,
  User,
  Eye,
  FileText,
  Share2,
  Clock,
  Globe
} from "lucide-react";
import { mockResearchJournals } from "@/mock-data/publications";
import { createJournalIssues } from "@/mock-data/journal";

export default function JournalCurrentLayout() {
  const issues = createJournalIssues(mockResearchJournals);
  const currentIssue = issues.find(issue => issue.isCurrentIssue);
  const currentIssueArticles = currentIssue?.articles || mockResearchJournals;
  
  const issueInfo = {
    volume: currentIssue?.volume || "1",
    number: currentIssue?.number || "4",
    year: currentIssue?.year || "2024",
    title: currentIssue?.title || "Educational Technology & Applied Sciences",
    publishDate: currentIssue?.publishDate || "December 2024",
    description: currentIssue?.description || "This issue focuses on the latest developments in educational technology, applied mathematics, and interdisciplinary research in science education.",
    totalArticles: currentIssueArticles.length,
    totalPages: currentIssue?.pageCount || 156,
    doi: "10.25139/cj.v1i4.2024"
  };

  return (
    <div className="min-h-screen bg-white">
      <JournalHeader activeItem="current" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Issue Cover & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Issue Cover */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-full h-80 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mb-4 shadow-lg">
                      <div className="text-white text-center p-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-xl mb-2">Cognifera Journal</h3>
                        <div className="space-y-1 text-sm">
                          <p>Volume {issueInfo.volume}, Number {issueInfo.number}</p>
                          <p>{issueInfo.year}</p>
                          <p className="text-xs opacity-90 mt-3">{issueInfo.title}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                        <Download className="w-4 h-4 mr-2" />
                        Download Issue
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Issue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issue Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Issue Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-muted-foreground)]">Published:</span>
                      <span className="font-medium text-[var(--color-foreground)]">{issueInfo.publishDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-muted-foreground)]">Articles:</span>
                      <span className="font-medium text-[var(--color-foreground)]">{issueInfo.totalArticles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-muted-foreground)]">Pages:</span>
                      <span className="font-medium text-[var(--color-foreground)]">{issueInfo.totalPages}</span>
                    </div>
                    <div className="pt-2 border-t border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-muted-foreground)]">DOI:</p>
                      <p className="text-xs font-mono text-[var(--color-primary)]">{issueInfo.doi}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Browse Issues</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/journal/archives" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Previous Issues
                  </Link>
                  <Link href="/journal/submit" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Submit to Next Issue
                  </Link>
                  <Link href="/journal/about" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    About Journal
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Issue Header */}
            <div>
              <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
                Vol {issueInfo.volume}, No {issueInfo.number} ({issueInfo.year})
              </h1>
              <h2 className="text-2xl text-[var(--color-primary)] mb-4">{issueInfo.title}</h2>
              <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                {issueInfo.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Published: {issueInfo.publishDate}
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {issueInfo.totalArticles} Articles
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Open Access
                </div>
              </div>
            </div>

            {/* Articles in This Issue */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                  <FileText className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                  Articles in This Issue
                </CardTitle>
                <p className="text-[var(--color-muted-foreground)]">
                  {issueInfo.totalArticles} articles published in this issue
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {currentIssueArticles.map((article, index) => (
                  <div key={article.id} className="border-b border-[var(--color-border)] last:border-b-0 pb-6 last:pb-0">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Article Number */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-20 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-xs font-medium">Article</div>
                            <div className="text-lg font-bold">{index + 1}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Article Details */}
                      <div className="flex-1 space-y-4">
                        {/* Title and Authors */}
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors mb-2">
                            <Link href={`/publications/${article.id}`} className="hover:underline">
                              {article.title}
                            </Link>
                          </h3>
                          <div className="flex items-center text-[var(--color-muted-foreground)] mb-2">
                            <User className="w-4 h-4 mr-1" />
                            <span className="text-sm">{article.authors.join(", ")}</span>
                          </div>
                        </div>
                        
                        {/* Abstract */}
                        <p className="text-[var(--color-muted-foreground)] leading-relaxed line-clamp-3">
                          {article.abstract}
                        </p>
                        
                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2">
                          {article.keywords.slice(0, 4).map((keyword: string) => (
                            <span 
                              key={keyword}
                              className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                          {article.keywords.length > 4 && (
                            <span className="text-xs text-[var(--color-muted-foreground)]">
                              +{article.keywords.length - 4} more
                            </span>
                          )}
                        </div>
                        
                        {/* Article Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-muted-foreground)]">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(article.publicationDate).toLocaleDateString('id-ID', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.fullTextViews || 0} views
                          </div>
                          <div className="flex items-center">
                            <span className="w-4 h-4 mr-1 text-center">📄</span>
                            {article.category}
                          </div>
                          {article.isOpenAccess && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Open Access
                            </span>
                          )}
                        </div>
                        
                        {/* Article Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Link href={`/publications/${article.id}`}>
                            <Button size="sm" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                              Read Full Text
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download PDF
                          </Button>
                          {article.doi && (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              DOI
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Issue Statistics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[var(--color-foreground)]">Issue Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--color-primary)]">{issueInfo.totalArticles}</div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Total Articles</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--color-primary)]">{issueInfo.totalPages}</div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Total Pages</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--color-primary)]">
                      {currentIssueArticles.filter(article => article.isOpenAccess).length}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Open Access</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div className="text-2xl font-bold text-[var(--color-primary)]">
                      {currentIssueArticles.reduce((sum, article) => sum + (article.fullTextViews || 0), 0)}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Total Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-0 shadow-lg bg-[var(--color-muted)]">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                  Interested in Publishing with Us?
                </h3>
                <p className="text-[var(--color-muted-foreground)] mb-6">
                  Submit your research to be part of our next issue. We welcome high-quality research 
                  in educational technology, computer science, and applied mathematics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/journal/submit">
                    <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                      Submit Your Article
                    </Button>
                  </Link>
                  <Link href="/journal/editorial">
                    <Button variant="outline">
                      View Guidelines
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <JournalFooter />
    </div>
  );
}