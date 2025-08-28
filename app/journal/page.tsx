import { Metadata } from "next";
import JournalLayout from "@/components/journal/JournalLayout";

export const metadata: Metadata = {
  title: "Journal Pendidikan IPA Indonesia | Cognifera",
  description: "Indonesian Journal of Science Education - Platform publikasi ilmiah untuk pendidikan IPA Indonesia",
};

export default function JournalPage() {
  return <JournalLayout />;
}