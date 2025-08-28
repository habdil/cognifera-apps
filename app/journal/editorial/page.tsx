import { Metadata } from "next";
import JournalEditorialLayout from "@/components/journal/JournalEditorialLayout";

export const metadata: Metadata = {
  title: "Editorial Policies | Cognifera Journal",
  description: "Editorial policies, review process, and publication guidelines for Cognifera Journal - Open Journal System for academic publications.",
};

export default function JournalEditorialPage() {
  return <JournalEditorialLayout />;
}