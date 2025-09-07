"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Calendar, User, Eye, Download, Heart, Users, Globe } from "lucide-react";
import { mockCommunityServiceJournals } from "@/mock-data/publications";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialMainContent() {
  const recentArticles = mockCommunityServiceJournals.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Journal Introduction */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[var(--color-primary)] text-white rounded-t-lg py-8" style={{ backgroundColor: journalSocialConfig.colors.primary }}>
          <div className="text-center">
            <CardTitle className="text-4xl font-bold mb-3">
              {journalSocialConfig.mainContent.heroSection.title}
            </CardTitle>
            <p className="text-white/90 text-xl font-medium">
              {journalSocialConfig.mainContent.heroSection.subtitle}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="prose max-w-none">
            {journalSocialConfig.mainContent.heroSection.description.map((paragraph, index) => (
              <p key={index} className="text-[var(--color-muted-foreground)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="border-t border-[var(--color-border)] pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-[var(--color-foreground)] flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                  {journalSocialConfig.mainContent.heroSection.focusAreas.title}
                </h4>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {journalSocialConfig.mainContent.heroSection.focusAreas.description}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[var(--color-foreground)] flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                  {journalSocialConfig.mainContent.heroSection.openAccessPolicy.title}
                </h4>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {journalSocialConfig.mainContent.heroSection.openAccessPolicy.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4">
            {journalSocialConfig.mainContent.heroSection.badges.map((badge, index) => (
              <span 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  badge.variant === "primary" 
                    ? "text-white"
                    : badge.variant === "secondary"
                    ? "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]"
                    : "bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)]"
                }`}
                style={{ 
                  backgroundColor: badge.variant === "primary" 
                    ? journalSocialConfig.colors.primary 
                    : undefined 
                }}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Community Research */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
            <Users className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
            {journalSocialConfig.mainContent.recentPublications.title}
          </CardTitle>
          <p className="text-[var(--color-muted-foreground)]">{journalSocialConfig.mainContent.recentPublications.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            {recentArticles.map((article, index) => (
              <div key={article.id} className="border border-[var(--color-border)] rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Article Badge */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-16 h-20 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: journalSocialConfig.colors.primary }}
                    >
                      <div className="text-center">
                        <Heart className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs font-semibold">#{index + 1}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Article Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors">
                        <Link href={`/publications/${article.id}`} className="hover:underline">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                        {article.authors.join(", ")}
                      </p>
                    </div>
                    
                    <p className="text-sm text-[var(--color-muted-foreground)] line-clamp-2">
                      {article.abstract}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publicationDate).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.fullTextViews || 0} views
                      </span>
                      {article.isOpenAccess && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Community Access
                        </span>
                      )}
                      {article.communityImpact && (
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: journalSocialConfig.colors.primary }}
                        >
                          High Impact
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {article.keywords.slice(0, 3).map((keyword) => (
                        <span 
                          key={keyword}
                          className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/publications?section=community-service-journals">
              <Button 
                className="w-full sm:w-auto text-white hover:opacity-90"
                style={{ backgroundColor: journalSocialConfig.colors.primary }}
              >
                View All Community Research
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Community Impact Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Announcements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[var(--color-foreground)]">Community Updates</CardTitle>
          <p className="text-[var(--color-muted-foreground)]">Latest news and announcements from our social responsibility initiatives</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div 
              className="p-6 border-l-4 rounded-r-lg"
              style={{ 
                borderLeftColor: journalSocialConfig.colors.primary,
                backgroundColor: `${journalSocialConfig.colors.primary}0D`
              }}
            >
              <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                Call for Community Impact Papers - Special Issue 2024
              </h4>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                Kami mengundang submission artikel untuk edisi khusus tentang "Dampak Sosial Teknologi dalam 
                Pemberdayaan Masyarakat". Fokus pada penelitian dengan implementasi langsung di komunitas. 
                Deadline submission: 30 Oktober 2024.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">Diposting: 20 Agustus 2024</span>
                <Link 
                  href="/journal-social/submit" 
                  className="text-sm hover:underline"
                  style={{ color: journalSocialConfig.colors.primary }}
                >
                  Submit Community Research →
                </Link>
              </div>
            </div>
            
            <div 
              className="p-6 border-l-4 rounded-r-lg"
              style={{ 
                borderLeftColor: journalSocialConfig.colors.secondary,
                backgroundColor: `${journalSocialConfig.colors.secondary}0D`
              }}
            >
              <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                Partnership with Local NGOs Established
              </h4>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                Journal of Social Responsibility and Service telah menjalin kemitraan dengan 15 organisasi 
                masyarakat sipil untuk memperkuat disseminasi penelitian pengabdian masyarakat ke tingkat grassroots.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">Diposting: 5 Agustus 2024</span>
                <span 
                  className="text-sm font-medium"
                  style={{ color: journalSocialConfig.colors.secondary }}
                >
                  Community Partnership
                </span>
              </div>
            </div>
            
            <div className="p-6 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                Community Impact Assessment Framework Launched
              </h4>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                Kami telah mengembangkan kerangka penilaian dampak sosial yang komprehensif untuk membantu 
                peneliti mengukur dan melaporkan dampak nyata penelitian mereka terhadap masyarakat.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">Diposting: 15 Juli 2024</span>
                <span className="text-sm text-amber-700 font-medium">New Framework</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/journal-social/announcements" 
              className="text-sm font-medium hover:underline"
              style={{ color: journalSocialConfig.colors.primary }}
            >
              View All Community Updates →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}