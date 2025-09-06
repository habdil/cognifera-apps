"use client";

import React from "react";
import Link from "next/link";
import JournalHeader from "./JournalHeader";
import JournalFooter from "./JournalFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Settings, 
  Send,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Award,
  Clock
} from "lucide-react";
import { mockEditorialBoard } from "@/mock-data/journal";
import { journalConfig } from "@/lib/journal-config";

export default function JournalAboutLayout() {
  const editorInChief = mockEditorialBoard.find(member => member.role === 'editor-in-chief');
  const associateEditors = mockEditorialBoard.filter(member => member.role === 'associate-editor');
  const editorialBoard = mockEditorialBoard.filter(member => member.role === 'editorial-board');

  return (
    <div className="min-h-screen bg-white">
      <JournalHeader activeItem="about" />
      
      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 mt-6">
            <div className="sticky top-8 space-y-6">
              {/* Navigation Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#about-journal" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    About the Journal
                  </a>
                  <a href="#people" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    People
                  </a>
                  <a href="#policies" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Policies
                  </a>
                  <a href="#submissions" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Submissions
                  </a>
                  <a href="#other" className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm">
                    Other Information
                  </a>
                </CardContent>
              </Card>

              {/* Submit Article CTA */}
              <Card className="border-0 shadow-lg bg-[var(--color-primary)] text-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Submit Your Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-sm mb-4">
                    Ready to publish your research with us?
                  </p>
                  <Link href="/journal/submit">
                    <Button className="w-full bg-white text-[var(--color-primary)] hover:bg-white/90 font-semibold">
                      Submit Article
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* About the Journal */}
            <section id="about-journal">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-[var(--color-primary)] text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    <BookOpen className="w-6 h-15 mr-3" />
                    About the Journal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    {journalConfig.aboutPage.journalDescription.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-[var(--color-muted-foreground)] leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[var(--color-foreground)] flex items-center">
                        <Award className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                        {journalConfig.aboutPage.journalDescription.focusScope.title}
                      </h3>
                      <ul className="text-sm text-[var(--color-muted-foreground)] space-y-2">
                        {journalConfig.aboutPage.journalDescription.focusScope.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[var(--color-foreground)] flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                        {journalConfig.aboutPage.journalDescription.publicationDetails.title}
                      </h3>
                      <div className="text-sm text-[var(--color-muted-foreground)] space-y-2">
                        {journalConfig.aboutPage.journalDescription.publicationDetails.items.map((item, index) => (
                          <div key={index}><strong>{item.label}:</strong> {item.value}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* People Section */}
            <section id="people">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Users className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    People
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Editor-in-Chief */}
                  {editorInChief && (
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">Editor-in-Chief</h3>
                      <div className="bg-[var(--color-muted)] rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {editorInChief.name.split(' ')[0][0]}{editorInChief.name.split(' ')[1]?.[0]}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[var(--color-foreground)]">{editorInChief.name}</h4>
                            <p className="text-sm text-[var(--color-muted-foreground)] mb-2">{editorInChief.affiliation}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {editorInChief.specialization.map((spec) => (
                                <span key={spec} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-1 rounded text-xs">
                                  {spec}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-[var(--color-muted-foreground)]">
                              <Mail className="w-4 h-4 mr-1" />
                              {editorInChief.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Associate Editors */}
                  {associateEditors.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">Associate Editors</h3>
                      <div className="grid gap-4">
                        {associateEditors.map((editor) => (
                          <div key={editor.id} className="border border-[var(--color-border)] rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-full flex items-center justify-center">
                                <span className="text-[var(--color-secondary-foreground)] font-semibold text-sm">
                                  {editor.name.split(' ')[0][0]}{editor.name.split(' ')[1]?.[0]}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-[var(--color-foreground)]">{editor.name}</h4>
                                <p className="text-sm text-[var(--color-muted-foreground)]">{editor.affiliation}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {editor.specialization.slice(0, 2).map((spec) => (
                                    <span key={spec} className="bg-[var(--color-muted)] text-[var(--color-muted-foreground)] px-2 py-1 rounded text-xs">
                                      {spec}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Editorial Board */}
                  {editorialBoard.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">Editorial Board</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {editorialBoard.map((member) => (
                          <div key={member.id} className="border border-[var(--color-border)] rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-[var(--color-tertiary)] rounded-full flex items-center justify-center">
                                <span className="text-[var(--color-tertiary-foreground)] font-semibold text-xs">
                                  {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0]}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-[var(--color-foreground)] text-sm">{member.name}</h4>
                                <p className="text-xs text-[var(--color-muted-foreground)]">{member.affiliation}</p>
                                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                                  {member.specialization[0]}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  <div>
                    <h3 className="font-semibold text-lg text-[var(--color-foreground)] mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                      {journalConfig.aboutPage.contact.title}
                    </h3>
                    <div className="bg-[var(--color-muted)] rounded-lg p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                            <span className="text-[var(--color-muted-foreground)]">{journalConfig.aboutPage.contact.email}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                            <span className="text-[var(--color-muted-foreground)]">{journalConfig.aboutPage.contact.phone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Globe className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
                            <span className="text-[var(--color-muted-foreground)]">{journalConfig.aboutPage.contact.website}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--color-foreground)] mb-2">Editorial Office</h4>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            {journalConfig.aboutPage.contact.editorialOffice.name}<br />
                            {journalConfig.aboutPage.contact.editorialOffice.address.map((line, index) => (
                              <span key={index}>
                                {line}
                                {index < journalConfig.aboutPage.contact.editorialOffice.address.length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Policies Section */}
            <section id="policies">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Settings className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid gap-4">
                    {journalConfig.aboutPage.policies.map((policy, index) => (
                      <Link key={index} href={policy.href} className="block p-4 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-muted)] transition-colors group">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-primary)]">{policy.title}</h4>
                            <p className="text-sm text-[var(--color-muted-foreground)]">{policy.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)]" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Submissions Section */}
            <section id="submissions">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <Send className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid gap-4">
                    {journalConfig.aboutPage.submissions.map((submission, index) => (
                      <Link key={index} href={submission.href} className="block p-4 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-muted)] transition-colors group">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-primary)]">{submission.title}</h4>
                            <p className="text-sm text-[var(--color-muted-foreground)]">{submission.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)]" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] p-6 rounded-r-lg">
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-2">Ready to Submit?</h4>
                    <p className="text-sm text-[var(--color-muted-foreground)] mb-4">
                      Pastikan Anda telah membaca author guidelines sebelum melakukan submission.
                    </p>
                    <Link href="/journal/submit">
                      <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90">
                        Submit Your Article
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Other Section */}
            <section id="other">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
                    <FileText className="w-6 h-6 mr-3 text-[var(--color-primary)]" />
                    Other Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid gap-4">
                    {journalConfig.aboutPage.otherInfo.map((info, index) => (
                      <Link key={index} href={info.href} className="block p-4 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-muted)] transition-colors group">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-primary)]">{info.title}</h4>
                            <p className="text-sm text-[var(--color-muted-foreground)]">{info.description}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[var(--color-muted-foreground)] group-hover:text-[var(--color-primary)]" />
                        </div>
                      </Link>
                    ))}
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