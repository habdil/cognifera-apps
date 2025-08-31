"use client";

import React from "react";
import Link from "next/link";
import JournalHeader from "./JournalHeader";
import JournalFooter from "./JournalFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { journalConfig } from "@/lib/journal-config";
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

// Dynamic icon mapping
const iconMap = {
  BookOpen,
  Users,
  FileText,
  Clock,
  Shield,
  Eye,
  Archive,
  DollarSign,
  AlertCircle
} as const;

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
            <span className="text-[var(--color-foreground)] font-medium">{journalConfig.editorialPolicies.pageTitle}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 mt-6">
            <div className="sticky top-8 space-y-6">
              {/* Navigation Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">{journalConfig.editorialPolicies.pageTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {journalConfig.editorialPolicies.navigation.map((navItem) => (
                    <a 
                      key={navItem.id}
                      href={navItem.href} 
                      className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm"
                    >
                      {navItem.title}
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">


            {/* Focus and Scope */}
            <section id="focus-scope">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-[var(--color-primary)] text-white rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center">
                    {React.createElement(iconMap[journalConfig.editorialPolicies.focusScope.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3" })}
                    {journalConfig.editorialPolicies.focusScope.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                      {journalConfig.editorialPolicies.focusScope.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] mb-3">{journalConfig.editorialPolicies.focusScope.researchAreas.title}</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          {journalConfig.editorialPolicies.focusScope.researchAreas.items.map((item, index) => (
                            <li key={index}>• <strong>{item.title}</strong> - {item.description}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] mb-3">{journalConfig.editorialPolicies.focusScope.contributionTypes.title}</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          {journalConfig.editorialPolicies.focusScope.contributionTypes.items.map((item, index) => (
                            <li key={index}>• <strong>{item.title}</strong> - {item.description}</li>
                          ))}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.sectionPolicies.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.sectionPolicies.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">{journalConfig.editorialPolicies.sectionPolicies.subtitle}</h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      {journalConfig.editorialPolicies.sectionPolicies.policies.map((policy, index) => (
                        <div key={index} className="p-4 border border-[var(--color-border)] rounded-lg">
                          <div className="flex items-center mb-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            <span className="font-medium text-[var(--color-foreground)]">{policy.title}</span>
                          </div>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            {policy.description}
                          </p>
                        </div>
                      ))}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.peerReview.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.peerReview.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      {journalConfig.editorialPolicies.peerReview.description}
                    </p>
                    
                    <div className="space-y-4">
                      {journalConfig.editorialPolicies.peerReview.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-[var(--color-muted)] rounded-lg">
                          <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {step.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[var(--color-foreground)] mb-2">{step.title}</h4>
                            <p className="text-sm text-[var(--color-muted-foreground)]">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] p-6 rounded-r-lg mt-6">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">{journalConfig.editorialPolicies.peerReview.timeline.title}</h4>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        {journalConfig.editorialPolicies.peerReview.timeline.description}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.publicationFrequency.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.publicationFrequency.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      {journalConfig.editorialPolicies.publicationFrequency.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)]">{journalConfig.editorialPolicies.publicationFrequency.schedule.title}</h3>
                        <div className="space-y-3">
                          {journalConfig.editorialPolicies.publicationFrequency.schedule.issues.map((issue, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
                              <span className="font-medium text-[var(--color-foreground)]">{issue.volume}</span>
                              <span className="text-sm text-[var(--color-muted-foreground)]">{issue.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)]">{journalConfig.editorialPolicies.publicationFrequency.targets.title}</h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          {journalConfig.editorialPolicies.publicationFrequency.targets.items.map((item, index) => (
                            <li key={index}>
                              • <strong>{item.title}</strong>{item.description && ` - ${item.description}`}
                            </li>
                          ))}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.openAccess.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.openAccess.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      {journalConfig.editorialPolicies.openAccess.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          {journalConfig.editorialPolicies.openAccess.benefits.title}
                        </h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          {journalConfig.editorialPolicies.openAccess.benefits.items.map((item, index) => (
                            <li key={index}>• <strong>{item.title}</strong> {item.description}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-[var(--color-foreground)] flex items-center">
                          <Shield className="w-5 h-5 text-[var(--color-primary)] mr-2" />
                          {journalConfig.editorialPolicies.openAccess.copyright.title}
                        </h3>
                        <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
                          {journalConfig.editorialPolicies.openAccess.copyright.items.map((item, index) => (
                            <li key={index}>
                              • <strong>{item.title}</strong>{item.description && ` - ${item.description}`}
                            </li>
                          ))}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.archiving.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.archiving.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                      {journalConfig.editorialPolicies.archiving.description}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.plagiarism.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.plagiarism.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed mb-4">
                      {journalConfig.editorialPolicies.plagiarism.description}
                    </p>
                    
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-red-800 mb-2">{journalConfig.editorialPolicies.plagiarism.tolerancePolicy.title}</h4>
                      <p className="text-sm text-red-700">
                        {journalConfig.editorialPolicies.plagiarism.tolerancePolicy.description}
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
                    {React.createElement(iconMap[journalConfig.editorialPolicies.authorFees.icon as keyof typeof iconMap], { className: "w-6 h-6 mr-3 text-[var(--color-primary)]" })}
                    {journalConfig.editorialPolicies.authorFees.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="prose max-w-none">
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-green-800 mb-2">{journalConfig.editorialPolicies.authorFees.policyStatement.title}</h4>
                      <p className="text-sm text-green-700 mb-4">
                        {journalConfig.editorialPolicies.authorFees.policyStatement.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-green-700">
                        {journalConfig.editorialPolicies.authorFees.policyStatement.fees.map((fee, index) => (
                          <p key={index}>• <strong>{fee.type}</strong> {fee.amount}</p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-[var(--color-muted)] rounded-lg">
                      <h4 className="font-semibold text-[var(--color-foreground)] mb-2">{journalConfig.editorialPolicies.authorFees.commitment.title}</h4>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        {journalConfig.editorialPolicies.authorFees.commitment.description}
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