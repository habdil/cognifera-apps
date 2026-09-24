import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createBook, isSlugTaken } from "@/lib/books";
import { parseBookInput } from "./book-input";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const parsed = parseBookInput(body);
    if (parsed.error !== null) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    if (await isSlugTaken(parsed.input.slug)) {
      return NextResponse.json(
        { success: false, message: "Slug sudah dipakai buku lain." },
        { status: 409 }
      );
    }

    const book = await createBook(parsed.input);

    revalidatePath("/publications");
    revalidatePath(`/publications/books/${book.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    console.error("Create book failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan buku." },
      { status: 500 }
    );
  }
}
