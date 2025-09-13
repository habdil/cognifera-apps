import { Metadata } from "next";
import JournalSocialSubmitLayout from "@/components/journal/social-journal/JournalSocialSubmitLayout";

export const metadata: Metadata = {
  title: "Submit Community Research - Journal of Social Responsibility and Service",
  description: "Submit your community service research and social responsibility studies to Journal of Social Responsibility and Service. Share your community impact research with practitioners and researchers worldwide.",
};

export default function JournalSocialSubmitPage() {
  return <JournalSocialSubmitLayout />;
}