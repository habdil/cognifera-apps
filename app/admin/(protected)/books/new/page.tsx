import { BookForm } from "@/components/admin/BookForm";

export default function NewBookPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-950 tracking-tight mb-8">Tambah Buku</h1>
      <BookForm />
    </div>
  );
}
