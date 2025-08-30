"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Calendar, User, Eye, Download, BookOpen } from "lucide-react";
import { mockResearchJournals } from "@/mock-data/publications";

export default function JournalMainContent() {
  const recentArticles = mockResearchJournals.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Journal Introduction */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[var(--color-primary)] text-white rounded-t-lg py-8">
          <div className="text-center">
            <CardTitle className="text-4xl font-bold mb-3">
              Cognifera Journal
            </CardTitle>
            <p className="text-white/90 text-xl font-medium">
              Open Journal System for Academic Publications
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="prose max-w-none">
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              Cognifera Journal adalah platform publikasi ilmiah berbasis <strong>Open Journal System (OJS)</strong> 
              yang menyediakan akses terbuka untuk artikel-artikel penelitian berkualitas tinggi dalam berbagai bidang 
              keilmuan termasuk teknologi pendidikan, ilmu komputer, dan matematika terapan.
            </p>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              Platform ini terintegrasi dengan ekosistem Cognifera untuk mendukung diseminasi ilmu pengetahuan 
              dan kolaborasi penelitian akademik. Semua artikel yang dipublikasikan telah melalui proses 
              <strong> peer-review</strong> yang ketat untuk menjamin kualitas dan standar akademik.
            </p>
          </div>
          
          <div className="border-t border-[var(--color-border)] pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-[var(--color-foreground)]">Publication Focus</h4>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Educational Technology, Computer Science, Applied Mathematics, 
                  Data Science, Engineering, dan bidang interdisipliner terkait.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[var(--color-foreground)]">Open Access Policy</h4>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Semua artikel dapat diakses secara gratis tanpa biaya berlangganan, 
                  mendukung penyebaran pengetahuan yang lebih luas.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4">
            <span className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">Open Access</span>
            <span className="bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] px-4 py-2 rounded-full text-sm font-medium">Peer Reviewed</span>
            <span className="bg-[var(--color-tertiary)] text-[var(--color-tertiary-foreground)] px-4 py-2 rounded-full text-sm font-medium">Digital First</span>
          </div>
        </CardContent>
      </Card>

      {/* Current Issue */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
            <FileText className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
            Recent Publications
          </CardTitle>
          <p className="text-[var(--color-muted-foreground)]">Latest research articles published in Cognifera Journal</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6">
            {recentArticles.map((article, index) => (
              <div key={article.id} className="border border-[var(--color-border)] rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Article Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <BookOpen className="w-6 h-6 mx-auto mb-1" />
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
                          Open Access
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
            <Link href="/publications?section=research-journals">
              <Button className="w-full sm:w-auto bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                View All Articles
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Bibliography
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[var(--color-foreground)]">Journal Updates</CardTitle>
          <p className="text-[var(--color-muted-foreground)]">Latest news and announcements from Cognifera Journal</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-6 border-l-4 border-[var(--color-primary)] bg-[var(--color-primary)]/5 rounded-r-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                Call for Papers - Edisi Khusus 2024: "AI dalam Pendidikan"
              </h4>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                Kami mengundang submission artikel untuk edisi khusus tentang "Artificial Intelligence 
                dalam Pendidikan dan Pembelajaran". Deadline submission: 30 September 2024.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">Diposting: 15 Agustus 2024</span>
                <Link href="/journal/submit" className="text-sm text-[var(--color-primary)] hover:underline">
                  Submit Article →
                </Link>
              </div>
            </div>
            
            <div className="p-6 border-l-4 border-[var(--color-secondary)] bg-[var(--color-secondary)]/5 rounded-r-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                Platform OJS Terbaru Diluncurkan
              </h4>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                Cognifera Journal telah mengupgrade ke sistem OJS versi terbaru dengan fitur-fitur 
                enhanced untuk proses review dan publikasi yang lebih efisien.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">Diposting: 20 Juli 2024</span>
                <span className="text-sm text-[var(--color-secondary)] font-medium">New Feature</span>
              </div>
            </div>
            
            <div className="p-6 border-l-4 border-[var(--color-tertiary)] bg-[var(--color-tertiary)]/5 rounded-r-lg">
              <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                Kerjasama dengan Universitas Terkemuka
              </h4>
              <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                Cognifera Journal telah menjalin kerjasama dengan beberapa universitas terkemuka 
                di Indonesia untuk meningkatkan kualitas penelitian dan publikasi ilmiah.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted-foreground)]">Diposting: 28 Juni 2024</span>
                <span className="text-sm text-[var(--color-tertiary)] font-medium">Partnership</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Link href="/journal/announcements" className="text-[var(--color-primary)] hover:underline text-sm font-medium">
              View All Announcements →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}