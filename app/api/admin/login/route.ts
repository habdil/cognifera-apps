import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSql } from "@/lib/neon";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const sql = getSql();
    const rows = await sql`
      SELECT id, email, name, password_hash FROM admin_users
      WHERE email = ${email} LIMIT 1;
    `;

    const admin = rows[0];
    const passwordMatches = admin
      ? await bcrypt.compare(password, admin.password_hash)
      : false;

    if (!admin || !passwordMatches) {
      // Uniform delay+message so failures don't reveal which field was wrong.
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 }
      );
    }

    await sql`UPDATE admin_users SET last_login_at = NOW() WHERE id = ${admin.id};`;

    const token = await createSessionToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });

    const response = NextResponse.json({ success: true, message: "Login berhasil." });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat login." },
      { status: 500 }
    );
  }
}
