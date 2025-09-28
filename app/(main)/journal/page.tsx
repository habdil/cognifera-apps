import JournalLayout from "@/components/journal/research-journal/JournalLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal Penelitian Cognifera | Cognifera",
  description: "Journal Penelitian Cognifera - Platform publikasi ilmiah untuk pendidikan Indonesia",
};

export default function JournalPage() {
  return <JournalLayout />;
}