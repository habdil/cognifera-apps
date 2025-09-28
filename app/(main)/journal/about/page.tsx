import JournalAboutLayout from "@/components/journal/research-journal/JournalAboutLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Journal | Cognifera Journal",
  description: "Learn about Cognifera Journal - Open Journal System for academic publications in educational technology, computer science, and applied mathematics.",
};

export default function JournalAboutPage() {
  return <JournalAboutLayout />;
}