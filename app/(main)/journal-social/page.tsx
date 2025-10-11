import JournalSocialLayout from "@/components/journal/social-journal/JournalSocialLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal of Social Responsibility and Service | Cognifera",
  description: "Community service and social responsibility research publications - advancing community impact through research",
};

export default function JournalSocialPage() {
  return <JournalSocialLayout />;
}