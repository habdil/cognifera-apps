import JournalSocialAboutLayout from "@/components/journal/social-journal/JournalSocialAboutLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Journal | Journal of Social Responsibility and Service",
  description: "Learn about Journal of Social Responsibility and Service - advancing community impact through research and publications in social responsibility and community service.",
};

export default function JournalSocialAboutPage() {
  return <JournalSocialAboutLayout />;
}