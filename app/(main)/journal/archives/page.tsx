import { Metadata } from "next";
import JournalArchivesLayout from "@/components/journal/research-journal/JournalArchivesLayout";

export const metadata: Metadata = {
  title: "Journal Archives | Cognifera Journal",
  description: "Browse all past issues of Cognifera Journal - Complete archive of research articles in educational technology, computer science, and applied mathematics.",
};

export default function JournalArchivesPage() {
  return <JournalArchivesLayout />;
}