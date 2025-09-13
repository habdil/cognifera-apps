"use client";

import React from "react";
import Link from "next/link";
import JournalSocialHeader from "./JournalSocialHeader";
import JournalSocialFooter from "./JournalSocialFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  FileText,
  Users,
  Clock,
  Eye,
  Archive,
  Shield,
  DollarSign,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Globe
} from "lucide-react";
import { journalSocialConfig } from "@/lib/journal-social-config";

export default function JournalSocialEditorialLayout() {
  const { editorialPolicies } = journalSocialConfig;

  const PolicySection = ({
    id,
    title,
    icon: IconComponent,
    children
  }: {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    children: React.ReactNode;
  }) => (
    <Card id={id} className="border-0 shadow-lg mb-8 scroll-mt-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center text-[var(--color-foreground)]">
          <IconComponent
            className="w-6 h-6 mr-3"
            style={{ color: journalSocialConfig.colors.primary }}
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      <JournalSocialHeader activeItem="editorial" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Navigation Card */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Page Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {editorialPolicies.navigation.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block p-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors text-sm"
                    >
                      {item.title}
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Editorial Contact */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-[var(--color-foreground)]">Editorial Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-[var(--color-muted-foreground)]">Email:</p>
                    <p
                      className="font-medium"
                      style={{ color: journalSocialConfig.colors.primary }}
                    >
                      {journalSocialConfig.sidebar.editorialContact.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--color-muted-foreground)]">Editor-in-Chief:</p>
                    <p className="font-medium text-[var(--color-foreground)]">
                      {journalSocialConfig.sidebar.editorialContact.editorInChief}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--color-muted-foreground)]">Response Time:</p>
                    <p className="font-medium text-[var(--color-foreground)]">
                      {journalSocialConfig.sidebar.editorialContact.responseTime}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">
                {editorialPolicies.pageTitle}
              </h1>
              <p className="text-xl text-[var(--color-muted-foreground)] mb-6">
                {editorialPolicies.pageSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted-foreground)]">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Community-Focused Research
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Open Access Policy
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  Social Responsibility
                </div>
              </div>
            </div>

            {/* Focus and Scope */}
            <PolicySection id="focus-scope" title="Focus and Scope" icon={Heart}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.focusScope.description}
                </p>

                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-4">
                    {editorialPolicies.focusScope.researchAreas.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {editorialPolicies.focusScope.researchAreas.items.map((area, index) => (
                      <div key={index} className="p-4 bg-[var(--color-muted)] rounded-lg">
                        <h5 className="font-medium text-[var(--color-foreground)] mb-2">
                          {area.title}
                        </h5>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                          {area.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-4">
                    {editorialPolicies.focusScope.contributionTypes.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {editorialPolicies.focusScope.contributionTypes.items.map((type, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: journalSocialConfig.colors.primary }}
                        />
                        <div>
                          <h5 className="font-medium text-[var(--color-foreground)]">
                            {type.title}
                          </h5>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* Section Policies */}
            <PolicySection id="section-policies" title="Section Policies" icon={FileText}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.sectionPolicies.subtitle}
                </p>

                <div className="grid gap-4">
                  {editorialPolicies.sectionPolicies.policies.map((policy, index) => (
                    <div key={index} className="p-4 border border-[var(--color-border)] rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                            {policy.title}
                          </h4>
                          <p className="text-[var(--color-muted-foreground)]">
                            {policy.description}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
                            policy.status === 'open' ? 'bg-green-100 text-green-800' :
                            policy.status === 'indexed' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {policy.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PolicySection>

            {/* Peer Review Process */}
            <PolicySection id="peer-review" title="Peer Review Process" icon={Users}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.peerReview.description}
                </p>

                <div className="space-y-4">
                  {editorialPolicies.peerReview.process.map((step, index) => (
                    <div key={index} className="flex space-x-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                        style={{ backgroundColor: journalSocialConfig.colors.primary }}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[var(--color-muted-foreground)]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="p-4 border-l-4 rounded-r-lg"
                  style={{
                    backgroundColor: `${journalSocialConfig.colors.primary}10`,
                    borderLeftColor: journalSocialConfig.colors.primary
                  }}
                >
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" style={{ color: journalSocialConfig.colors.primary }} />
                    {editorialPolicies.peerReview.timeline.title}
                  </h4>
                  <p className="text-[var(--color-muted-foreground)]">
                    {editorialPolicies.peerReview.timeline.description}
                  </p>
                </div>
              </div>
            </PolicySection>

            {/* Publication Frequency */}
            <PolicySection id="publication-frequency" title="Publication Frequency" icon={Clock}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.publicationFrequency.description}
                </p>

                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-4">
                    {editorialPolicies.publicationFrequency.schedule.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {editorialPolicies.publicationFrequency.schedule.issues.map((issue, index) => (
                      <div key={index} className="p-4 bg-[var(--color-muted)] rounded-lg">
                        <h5 className="font-medium text-[var(--color-foreground)]">
                          {issue.volume}
                        </h5>
                        <p className="text-sm text-[var(--color-muted-foreground)]">
                          {issue.month}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-4">
                    {editorialPolicies.publicationFrequency.targets.title}
                  </h4>
                  <div className="space-y-3">
                    {editorialPolicies.publicationFrequency.targets.items.map((target, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: journalSocialConfig.colors.primary }}
                        />
                        <div>
                          <h5 className="font-medium text-[var(--color-foreground)]">
                            {target.title}
                          </h5>
                          {target.description && (
                            <p className="text-sm text-[var(--color-muted-foreground)]">
                              {target.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* Open Access Policy */}
            <PolicySection id="open-access" title="Open Access Policy" icon={Eye}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.openAccess.description}
                </p>

                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-4">
                    {editorialPolicies.openAccess.benefits.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {editorialPolicies.openAccess.benefits.items.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: journalSocialConfig.colors.primary }}
                        />
                        <div>
                          <h5 className="font-medium text-[var(--color-foreground)]">
                            {benefit.title}
                          </h5>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-4">
                    {editorialPolicies.openAccess.copyright.title}
                  </h4>
                  <div className="space-y-3">
                    {editorialPolicies.openAccess.copyright.items.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          style={{ color: journalSocialConfig.colors.primary }}
                        />
                        <div>
                          <h5 className="font-medium text-[var(--color-foreground)]">
                            {item.title}
                          </h5>
                          <p className="text-sm text-[var(--color-muted-foreground)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* Archiving */}
            <PolicySection id="archiving" title="Archiving" icon={Archive}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.archiving.description}
                </p>

                <div
                  className="p-6 border border-[var(--color-border)] rounded-lg"
                  style={{ backgroundColor: `${journalSocialConfig.colors.primary}05` }}
                >
                  <div className="flex items-center mb-4">
                    <Archive
                      className="w-6 h-6 mr-3"
                      style={{ color: journalSocialConfig.colors.primary }}
                    />
                    <h4 className="font-semibold text-[var(--color-foreground)]">
                      Community-Centered Preservation
                    </h4>
                  </div>
                  <p className="text-[var(--color-muted-foreground)]">
                    Our archiving system prioritizes community access and long-term preservation of
                    social responsibility research for future generations of practitioners and researchers.
                  </p>
                </div>
              </div>
            </PolicySection>

            {/* Community Ethics */}
            <PolicySection id="community-ethics" title="Community Ethics and Originality" icon={Shield}>
              <div className="space-y-6">
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {editorialPolicies.plagiarism.description}
                </p>

                <div
                  className="p-4 border-l-4 rounded-r-lg"
                  style={{
                    backgroundColor: `${journalSocialConfig.colors.secondary}10`,
                    borderLeftColor: journalSocialConfig.colors.secondary
                  }}
                >
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" style={{ color: journalSocialConfig.colors.secondary }} />
                    {editorialPolicies.plagiarism.tolerancePolicy.title}
                  </h4>
                  <p className="text-[var(--color-muted-foreground)]">
                    {editorialPolicies.plagiarism.tolerancePolicy.description}
                  </p>
                </div>
              </div>
            </PolicySection>

            {/* Author Fees */}
            <PolicySection id="author-fees" title="Author Fees" icon={DollarSign}>
              <div className="space-y-6">
                <div
                  className="p-6 border border-[var(--color-border)] rounded-lg text-center"
                  style={{ backgroundColor: `${journalSocialConfig.colors.primary}10` }}
                >
                  <h4 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">
                    {editorialPolicies.authorFees.policyStatement.title}
                  </h4>
                  <p className="text-[var(--color-muted-foreground)] mb-4">
                    {editorialPolicies.authorFees.policyStatement.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {editorialPolicies.authorFees.policyStatement.fees.map((fee, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-[var(--color-muted-foreground)]">{fee.type}</span>
                        <span
                          className="font-bold text-lg"
                          style={{ color: journalSocialConfig.colors.primary }}
                        >
                          {fee.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-4 border-l-4 rounded-r-lg"
                  style={{
                    backgroundColor: `${journalSocialConfig.colors.primary}10`,
                    borderLeftColor: journalSocialConfig.colors.primary
                  }}
                >
                  <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                    {editorialPolicies.authorFees.commitment.title}
                  </h4>
                  <p className="text-[var(--color-muted-foreground)]">
                    {editorialPolicies.authorFees.commitment.description}
                  </p>
                </div>
              </div>
            </PolicySection>

            {/* Call to Action */}
            <Card className="border-0 shadow-lg bg-[var(--color-muted)]">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                  Ready to Contribute to Community Research?
                </h3>
                <p className="text-[var(--color-muted-foreground)] mb-6">
                  Join our community of researchers and practitioners working to advance social responsibility
                  and community service through rigorous research and open collaboration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/journal-social/submit">
                    <Button
                      className="text-white hover:opacity-90"
                      style={{ backgroundColor: journalSocialConfig.colors.primary }}
                    >
                      Submit Your Research
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/journal-social/about">
                    <Button variant="outline-2">
                      Learn More About Our Journal
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