import { Metadata } from "next";
import JournalSocialCurrentLayout from "@/components/journal/social-journal/JournalSocialCurrentLayout";

export const metadata: Metadata = {
  title: "Current Issue | Journal of Social Responsibility and Service",
  description: "Current issue of Journal of Social Responsibility and Service - Latest community service and social responsibility research publications.",
};

export default function JournalSocialCurrentPage() {
  return <JournalSocialCurrentLayout />;
}