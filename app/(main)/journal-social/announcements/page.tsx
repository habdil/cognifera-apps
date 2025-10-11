import { Metadata } from "next";
import JournalSocialAnnouncementsLayout from "@/components/journal/social-journal/JournalSocialAnnouncementsLayout";

export const metadata: Metadata = {
  title: "Announcements - Journal of Social Responsibility and Service",
  description: "Latest announcements, updates, and important notices from the Journal of Social Responsibility and Service editorial team.",
};

export default function JournalSocialAnnouncementsPage() {
  return <JournalSocialAnnouncementsLayout />;
}