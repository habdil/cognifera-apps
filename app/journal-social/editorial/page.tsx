import { Metadata } from "next";
import JournalSocialEditorialLayout from "@/components/journal/social-journal/JournalSocialEditorialLayout";

export const metadata: Metadata = {
  title: "Editorial Policies - Journal of Social Responsibility and Service",
  description: "Comprehensive editorial policies and guidelines for Journal of Social Responsibility and Service including focus and scope, peer review process, and submission policies.",
};

export default function JournalSocialEditorialPage() {
  return <JournalSocialEditorialLayout />;
}