import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  deleteArticle,
  getArticleById,
  isArticleSlugTaken,
  updateArticle,
} from "@/lib/articles";
import { parseArticleInput } from "../article-input";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

function revalidateArticlePages(slug: string) {
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await getArticleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = parseArticleInput(body);
    if (parsed.error !== null) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    if (await isArticleSlugTaken(parsed.input.slug, id)) {
      return NextResponse.json(
        { success: false, message: "Slug sudah dipakai artikel lain." },
        { status: 409 }
      );
    }

    const article = await updateArticle(id, parsed.input);

    revalidateArticlePages(existing.slug);
    if (article && article.slug !== existing.slug) {
      revalidateArticlePages(article.slug);
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Update article failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui artikel." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await getArticleById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Artikel tidak ditemukan." },
        { status: 404 }
      );
    }

    await deleteArticle(id);
    revalidateArticlePages(existing.slug);

    return NextResponse.json({ success: true, message: "Artikel dihapus." });
  } catch (error) {
    console.error("Delete article failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus artikel." },
      { status: 500 }
    );
  }
}
