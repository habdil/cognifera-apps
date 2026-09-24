import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

const ALLOWED_FOLDERS = new Set(["books", "articles"]);
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderInput = formData.get("folder");
    const folder =
      typeof folderInput === "string" && ALLOWED_FOLDERS.has(folderInput)
        ? folderInput
        : "articles";

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan di form data." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Hanya file gambar yang diizinkan." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, message: "Ukuran gambar maksimal 10MB." },
        { status: 400 }
      );
    }

    const { secureUrl } = await uploadToCloudinary(file, folder);

    return NextResponse.json({ success: true, data: { url: secureUrl } });
  } catch (error) {
    console.error("Upload failed:", error);
    const message = error instanceof Error ? error.message : "Upload gagal.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
