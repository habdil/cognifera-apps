import { Metadata } from "next";
import JournalLayout from "@/components/journal/JournalLayout";

export const metadata: Metadata = {
  title: "Journal Penelitian Cognifera | Cognifera",
  description: "Journal Penelitian Cognifera - Platform publikasi ilmiah untuk pendidikan Indonesia",
};

export default function JournalPage() {
  return <JournalLayout />;
}