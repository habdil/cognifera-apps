import { NextResponse } from "next/server";
import {
  isEmailNotificationConfigured,
  sendContactNotificationEmail,
} from "@/lib/email";
import { ensureContactLeadsTable, sql } from "@/lib/neon";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  layananInterest?: string;
  message?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const layananInterest = body.layananInterest?.trim() || null;
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid." },
        { status: 400 }
      );
    }

    await ensureContactLeadsTable();

    await sql`
      INSERT INTO contact_leads (name, email, layanan_interest, message)
      VALUES (${name}, ${email}, ${layananInterest}, ${message});
    `;

    if (isEmailNotificationConfigured()) {
      await sendContactNotificationEmail({
        name,
        email,
        layananInterest,
        message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim.",
    });
  } catch (error) {
    console.error("Failed to save contact lead:", error);

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat mengirim pesan." },
      { status: 500 }
    );
  }
}
