import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createArticle, isArticleSlugTaken } from "@/lib/articles";
import { parseArticleInput } from "./article-input";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const parsed = parseArticleInput(body);
    if (parsed.error !== null) {
      return NextResponse.json(
        { success: false, message: parsed.error },
        { status: 400 }
      );
    }

    if (await isArticleSlugTaken(parsed.input.slug)) {
      return NextResponse.json(
        { success: false, message: "Slug sudah dipakai artikel lain." },
        { status: 409 }
      );
    }

    const article = await createArticle(parsed.input);

    revalidatePath("/news");
    revalidatePath(`/news/${article.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    console.error("Create article failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan artikel." },
      { status: 500 }
    );
  }
}
