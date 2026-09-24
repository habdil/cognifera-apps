import { notFound } from "next/navigation";
import { getBookById } from "@/lib/books";
import { BookForm } from "@/components/admin/BookForm";

export const dynamic = "force-dynamic";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-950 tracking-tight mb-8">Edit Buku</h1>
      <BookForm book={book} />
    </div>
  );
}
