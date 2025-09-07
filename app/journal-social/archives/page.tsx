import { Metadata } from "next";
import JournalSocialArchivesLayout from "@/components/journal/social-journal/JournalSocialArchivesLayout";

export const metadata: Metadata = {
  title: "Journal Archives | Journal of Social Responsibility and Service",
  description: "Browse all past issues of Journal of Social Responsibility and Service - Complete archive of community service and social responsibility research publications.",
};

export default function JournalSocialArchivesPage() {
  return <JournalSocialArchivesLayout />;
}