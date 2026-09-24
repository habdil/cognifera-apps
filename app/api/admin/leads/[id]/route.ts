import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getSql } from "@/lib/neon";

export const runtime = "nodejs";

const VALID_STATUSES = new Set(["new", "contacted", "closed"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response: unauthorized } = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = (await request.json()) as { status?: string };

    if (!body.status || !VALID_STATUSES.has(body.status)) {
      return NextResponse.json(
        { success: false, message: "Status tidak valid." },
        { status: 400 }
      );
    }

    const sql = getSql();
    const rows = await sql`
      UPDATE contact_leads SET status = ${body.status}
      WHERE id = ${id}
      RETURNING id;
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Lead tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update lead failed:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui lead." },
      { status: 500 }
    );
  }
}
