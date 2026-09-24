import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { deleteBook, getBookById, isSlugTaken, updateBook } from "@/lib/books";
import { parseBookInput } from "../book-input";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function revalidateBookPages(slug: string) {
  revalidatePath("/publications");
  revalidatePath(`/publications/books/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await getBookById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Buku tidak ditemukan." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = parseBookInput(body);
    if (parsed.error !== null) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    if (await isSlugTaken(parsed.input.slug, id)) {
      return NextResponse.json(
        { success: false, message: "Slug sudah dipakai buku lain." },
        { status: 409 }
      );
    }

    const book = await updateBook(id, parsed.input);

    revalidateBookPages(existing.slug);
    if (book && book.slug !== existing.slug) {
      revalidateBookPages(book.slug);
    }

    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    console.error("Update book failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui buku." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await getBookById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Buku tidak ditemukan." },
        { status: 404 }
      );
    }

    await deleteBook(id);
    revalidateBookPages(existing.slug);

    return NextResponse.json({ success: true, message: "Buku dihapus." });
  } catch (error) {
    console.error("Delete book failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus buku." },
      { status: 500 }
    );
  }
}
