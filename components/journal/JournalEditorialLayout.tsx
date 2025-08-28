"use client";

import React from "react";
import Link from "next/link";
import JournalHeader from "./JournalHeader";
import JournalFooter from "./JournalFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Settings,
  BookOpen,
  Users,
  FileText,
  Clock,
  Shield,
  Eye,
  CheckCircle,
  Archive,
  DollarSign,
  AlertCircle
} from "lucide-react";

export default function JournalEditorialLayout() {
  return (
    <div className="min-h-screen bg-white">
      <JournalHeader activeItem="editorial" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-[var(--color-muted-foreground)]">
            <Link href="/journal" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/journal" className="hover:text-[var(--color-primary)] transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-[var(--color-foreground)] font-medium">Editorial Policies</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Navigation Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Editorial Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#focus-scope" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Focus and Scope
                  </a>
                  <a href="#section-policies" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Section Policies
                  </a>
                  <a href="#peer-review" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Peer Review Process
                  </a>
                  <a href="#publication-frequency" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Publication Frequency
                  </a>
                  <a href="#open-access" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Open Access Policy
                  </a>
                  <a href="#archiving" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Archiving
                  </a>
                  <a href="#plagiarism" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Plagiarism Policy
                  </a>
                  <a href="#author-fees" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Author Fees
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">Editorial Policies</h1>
              <p className="text-lg text-[var(--color-muted-foreground)] max-w-3xl mx-auto">
                Kebijakan editorial dan panduan publikasi untuk Cognifera Journal
              </p>
            </div>

            {/* Focus and Scope */}
            <section id="focus-scope">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-[var(--color-primary)] text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Focus and Scope
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                      Cognifera Journal mempublikasikan artikel original tentang isu-isu terkini dan 
                      mengutamakan internasionalitas dalam pendidikan, metodologi, pelatihan guru, 
                      dan persiapan guru sains dengan tujuan untuk memajukan pengetahuan tentang 
                      teori dan praktik pendidikan sains.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] mb-3">Ruang Lingkup Penelitian:</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          <li>• <strong>Learning consisting of theoretical and empirical research</strong> - Pembelajaran yang terdiri dari penelitian teoretis dan empiris dalam pembelajaran sains</li>
                          <li>• <strong>Teacher education and development</strong> - Pendidikan dan pengembangan guru sains</li>
                          <li>• <strong>Educational technology</strong> - Teknologi pendidikan dalam pembelajaran sains</li>
                          <li>• <strong>Assessment and evaluation</strong> - Penilaian dan evaluasi pembelajaran sains</li>
                          <li>• <strong>Science curriculum development</strong> - Pengembangan kurikulum sains</li>
                          <li>• <strong>Environmental education</strong> - Pendidikan lingkungan dan sains lingkungan</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] mb-3">Jenis Kontribusi:</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          <li>• <strong>Original Research Articles</strong> - Artikel penelitian original</li>
                          <li>• <strong>Review Articles</strong> - Artikel tinjauan komprehensif</li>
                          <li>• <strong>Case Studies</strong> - Studi kasus dalam pendidikan sains</li>
                          <li>• <strong>Educational Innovations</strong> - Inovasi dalam pendidikan sains</li>
                          <li>• <strong>Technology Integration</strong> - Integrasi teknologi dalam pembelajaran</li>
                          <li>• <strong>Cross-cultural Studies</strong> - Studi lintas budaya dalam pendidikan sains</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section Policies */}
            <section id="section-policies">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <FileText className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Section Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">Articles</h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 border border-[var(--color-border)] rounded-lg">
                        <div className="flex items-center mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-medium text-[var(--color-foreground)]">Open Submissions</span>
                        </div>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                          Submission terbuka untuk semua peneliti dan akademisi
                        </p>
                      </div>
                      
                      <div className="p-4 border border-[var(--color-border)] rounded-lg">
                        <div className="flex items-center mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-medium text-[var(--color-foreground)]">Indexed</span>
                        </div>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                          Semua artikel terindeks dengan DOI assignment
                        </p>
                      </div>
                      
                      <div className="p-4 border border-[var(--color-border)] rounded-lg">
                        <div className="flex items-center mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-medium text-[var(--color-foreground)]">Peer Reviewed</span>
                        </div>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                          Double-blind peer review process
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Peer Review Process */}
            <section id="peer-review">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Users className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Peer Review Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      Cognifera Journal menggunakan sistem <strong>double-blind review</strong> untuk menjamin 
                      kualitas dan objektivitas proses evaluasi. Manuscript yang diterima akan melalui 
                      proses review berikut:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Initial Review</h4>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            Editor melakukan review awal untuk memastikan manuscript sesuai dengan scope journal 
                            dan memenuhi standar format yang ditetapkan.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 p-4 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Peer Review Assignment</h4>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            Manuscript dikirim kepada minimal 2 reviewer ahli dalam bidang terkait. 
                            Review dilakukan secara anonymous (double-blind).
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 p-4 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Review Decision</h4>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            Berdasarkan feedback reviewer, editor akan membuat keputusan: Accept, Minor Revision, 
                            Major Revision, atau Reject.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4 p-4 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Final Publication</h4>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            Manuscript yang diterima akan melalui proses copyediting dan published online 
                            dengan DOI assignment.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] p-6 rounded-r-lg mt-6">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Review Timeline</h4>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        Proses review biasanya memakan waktu 4-8 minggu setelah submission. 
                        Authors akan mendapat notifikasi update setiap tahap review.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Publication Frequency */}
            <section id="publication-frequency">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Clock className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Publication Frequency
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      Cognifera Journal dipublikasikan <strong>4 kali dalam setahun</strong> (Quarterly) 
                      dengan jadwal sebagai berikut:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)]">Jadwal Publikasi 2024:</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
                            <span className="font-medium text-[var(--color-foreground)]">Vol 1, No 1</span>
                            <span className="text-sm text-[var(--color-muted-foreground)]">Maret 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
                            <span className="font-medium text-[var(--color-foreground)]">Vol 1, No 2</span>
                            <span className="text-sm text-[var(--color-muted-foreground)]">Juni 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
                            <span className="font-medium text-[var(--color-foreground)]">Vol 1, No 3</span>
                            <span className="text-sm text-[var(--color-muted-foreground)]">September 2024</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
                            <span className="font-medium text-[var(--color-foreground)]">Vol 1, No 4</span>
                            <span className="text-sm text-[var(--color-muted-foreground)]">Desember 2024</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)]">Target Publikasi:</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          <li>• <strong>Minimal 20 artikel per tahun</strong></li>
                          <li>• <strong>5-8 artikel per issue</strong></li>
                          <li>• <strong>Online first publication</strong> - Artikel dipublikasikan online segera setelah diterima</li>
                          <li>• <strong>DOI assignment</strong> - Setiap artikel mendapat DOI</li>
                          <li>• <strong>Indexing</strong> - Semua artikel terindeks di database akademik</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Open Access Policy */}
            <section id="open-access">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Eye className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Open Access Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      Cognifera Journal menerapkan kebijakan <strong>Open Access</strong> yang memungkinkan 
                      akses gratis terhadap seluruh konten yang dipublikasikan, mendukung pertukaran 
                      pengetahuan yang lebih luas.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          Keuntungan Open Access:
                        </h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          <li>• <strong>Akses gratis</strong> untuk semua pembaca</li>
                          <li>• <strong>Visibilitas tinggi</strong> dan potensi sitasi lebih besar</li>
                          <li>• <strong>Distribusi global</strong> tanpa batasan geografis</li>
                          <li>• <strong>Archiving permanen</strong> untuk preservasi jangka panjang</li>
                          <li>• <strong>Compliance</strong> dengan policy funding agency</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] flex items-center">
                          <Shield className="w-5 h-5 text-[var(--color-primary)] mr-2" />
                          Copyright & Licensing:
                        </h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          <li>• <strong>Creative Commons License</strong> - CC BY 4.0</li>
                          <li>• <strong>Author retains copyright</strong></li>
                          <li>• <strong>Attribution required</strong> untuk penggunaan kembali</li>
                          <li>• <strong>Commercial use allowed</strong> dengan proper attribution</li>
                          <li>• <strong>Derivative works permitted</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Archiving */}
            <section id="archiving">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Archive className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Archiving
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                      Cognifera Journal menggunakan sistem LOCKSS untuk membuat distributed archiving system 
                      di antara library berpartisipasi dan memungkinkan library tersebut untuk menciptakan 
                      arsip permanen dari journal untuk tujuan preservasi dan restorasi.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Plagiarism Policy */}
            <section id="plagiarism">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <AlertCircle className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Policy of Screening for Plagiarism
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                      Semua manuscript harus bebas dari plagiarisme. Authors diharuskan untuk menggunakan 
                      software deteksi plagiarisme untuk mengecek originalitas manuscript sebelum submission.
                    </p>
                    
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Toleransi Plagiarisme</h4>
                      <p className="text-sm text-red-700">
                        Manuscript dengan similarity index <strong>lebih dari 25%</strong> akan ditolak 
                        tanpa review lebih lanjut. Gunakan tools seperti Turnitin atau Grammarly 
                        untuk mengecek sebelum submission.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Author Fees */}
            <section id="author-fees">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <DollarSign className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Author Fees
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-green-800 mb-2">No Publication Charges</h4>
                      <p className="text-sm text-green-700 mb-4">
                        Cognifera Journal <strong>TIDAK mengenakan biaya apapun</strong> untuk submission, 
                        review process, dan publication. Semua layanan tersedia secara gratis.
                      </p>
                      
                      <div className="space-y-2 text-sm text-green-700">
                        <p>• <strong>Submission Fee:</strong> GRATIS (0 IDR)</p>
                        <p>• <strong>Article Processing Charge:</strong> GRATIS (0 IDR)</p>
                        <p>• <strong>Review Process:</strong> GRATIS (0 IDR)</p>
                        <p>• <strong>Publication Fee:</strong> GRATIS (0 IDR)</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-[var(--color-muted)] rounded-lg">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Commitment to Open Science</h4>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        Sebagai bagian dari komitmen terhadap Open Science, kami percaya bahwa 
                        knowledge sharing harus dapat diakses oleh semua kalangan tanpa barrier finansial.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      
      <JournalFooter />
    </div>
  );
}