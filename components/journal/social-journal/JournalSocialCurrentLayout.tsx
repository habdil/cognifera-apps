"use client";

import React from "react";
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
  Users,
  Eye,
  FileText,
  Share2,
  Globe,
  MapPin,
  Target,
  Handshake
} from "lucide-react";
import { mockCommunityServiceJournals } from "@/mock-data/publications";
import { createSocialJournalIssues } from "@/mock-data/journal";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialCurrentLayout() {
  const issues = createSocialJournalIssues(mockCommunityServiceJournals);
  const currentIssue = issues.find(issue => issue.isCurrentIssue);
  const currentIssueArticles = currentIssue?.articles || mockCommunityServiceJournals;
  
  const issueInfo = {
    volume: currentIssue?.volume || "1",
    number: currentIssue?.number || "2",
    year: currentIssue?.year || "2024",
    title: currentIssue?.title || "Community Resilience and Disaster Preparedness",
    publishDate: currentIssue?.publishDate || "December 2024",
    description: currentIssue?.description || "This issue focuses on community resilience building, disaster preparedness initiatives, and social responsibility in crisis management across Southeast Asian communities.",
    totalArticles: currentIssueArticles.length,
    totalPages: currentIssue?.pageCount || 142,
    doi: "10.25139/jsrs.v1i2.2024"
  };

  return (
    <div className="min-h-screen bg-white">
      <JournalSocialHeader activeItem="current" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Issue Cover & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Issue Cover */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div 
                      className="w-full h-80 rounded-lg flex items-center justify-center mb-4 shadow-lg"
                      style={{ backgroundColor: journalSocialConfig.colors.primary }}
                    >
                      <div className="text-white text-center p-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Journal of Social Responsibility & Service</h3>
                        <div className="space-y-1 text-sm">
                          <p>Volume {issueInfo.volume}, Number {issueInfo.number}</p>
                          <p>{issueInfo.year}</p>
                          <p className="text-xs opacity-90 mt-3">{issueInfo.title}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full text-white hover:opacity-90"
                        style={{ backgroundColor: journalSocialConfig.colors.primary }}
                      >
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
                      <p 
                        className="text-xs font-mono"
                        style={{ color: journalSocialConfig.colors.primary }}
                      >
                        {issueInfo.doi}
                      </p>
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
                  <Link href="/journal-social/archives" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Previous Issues
                  </Link>
                  <Link href="/journal-social/submit" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Submit to Next Issue
                  </Link>
                  <Link href="/journal-social/about" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
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
              <h2 
                className="text-2xl mb-4"
                style={{ color: journalSocialConfig.colors.primary }}
              >
                {issueInfo.title}
              </h2>
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
                  Community Access
                </div>
              </div>
            </div>

            {/* Articles in This Issue */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                  <FileText className="w-6 h-6 mr-3" style={{ color: journalSocialConfig.colors.primary }} />
                  Articles in This Issue
                </CardTitle>
                <p className="text-[var(--color-muted-foreground)]">
                  {issueInfo.totalArticles} community service research articles published in this issue
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {currentIssueArticles.map((article, index) => (
                  <div key={article.id} className="border-b border-[var(--color-border)] last:border-b-0 pb-6 last:pb-0">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Article Number */}
                      <div className="flex-shrink-0">
                        <div 
                          className="w-16 h-20 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: journalSocialConfig.colors.primary }}
                        >
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
                            <Users className="w-4 h-4 mr-1" />
                            <span className="text-sm">{article.authors.join(", ")}</span>
                          </div>
                        </div>
                        
                        {/* Community Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{article.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{article.community}</span>
                          </div>
                        </div>
                        
                        {/* Abstract */}
                        <p className="text-[var(--color-muted-foreground)] leading-relaxed line-clamp-3">
                          {article.abstract}
                        </p>
                        
                        {/* Impact Description */}
                        <div 
                          className="p-4 border-l-4 rounded-r-lg"
                          style={{
                            backgroundColor: `${journalSocialConfig.colors.primary}10`,
                            borderLeftColor: journalSocialConfig.colors.primary
                          }}
                        >
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2 flex items-center">
                            <Handshake className="w-4 h-4 mr-1" style={{ color: journalSocialConfig.colors.primary }} />
                            Community Impact
                          </h4>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            {article.impactDescription}
                          </p>
                        </div>
                        
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
                            <span className="w-4 h-4 mr-1 text-center">🏘️</span>
                            Community Service
                          </div>
                          {article.isOpenAccess && (
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: journalSocialConfig.colors.primary }}
                            >
                              Community Access
                            </span>
                          )}
                        </div>
                        
                        {/* Article Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Link href={`/publications/${article.id}`}>
                            <Button 
                              size="sm" 
                              className="text-white hover:opacity-90"
                              style={{ backgroundColor: journalSocialConfig.colors.primary }}
                            >
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
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: journalSocialConfig.colors.primary }}
                    >
                      {issueInfo.totalArticles}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Total Articles</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: journalSocialConfig.colors.primary }}
                    >
                      {issueInfo.totalPages}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Total Pages</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: journalSocialConfig.colors.primary }}
                    >
                      {currentIssueArticles.filter(article => article.isOpenAccess).length}
                    </div>
                    <div className="text-sm text-[var(--color-muted-foreground)]">Community Access</div>
                  </div>
                  <div className="text-center p-4 bg-[var(--color-muted)] rounded-lg">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: journalSocialConfig.colors.primary }}
                    >
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
                  Share Your Community Impact Research?
                </h3>
                <p className="text-[var(--color-muted-foreground)] mb-6">
                  Submit your community service research to be part of our next issue. We welcome high-quality research 
                  in social responsibility, community development, and social impact initiatives.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/journal-social/submit">
                    <Button 
                      className="text-white hover:opacity-90"
                      style={{ backgroundColor: journalSocialConfig.colors.primary }}
                    >
                      Submit Your Community Research
                    </Button>
                  </Link>
                  <Link href="/journal-social/editorial">
                    <Button variant="outline">
                      View Community Guidelines
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <JournalSocialFooter />
    </div>
  );
}