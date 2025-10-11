import { Metadata } from "next";
import JournalCurrentLayout from "@/components/journal/research-journal/JournalCurrentLayout";

export const metadata: Metadata = {
  title: "Current Issue | Cognifera Journal",
  description: "Current issue of Cognifera Journal - Latest research articles in educational technology, computer science, and applied mathematics.",
};

export default function JournalCurrentPage() {
  return <JournalCurrentLayout />;
}