// app/api/login/route.ts
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const encoder = new TextEncoder();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    // === تعريف المستخدمين التجريبيين مع الرول ===
    const users = [
      { email: "manager@example.com", password: "manager123", role: "manager" },
      { email: "writer@example.com", password: "writer123", role: "content_creator" },
      { email: "subscriber@example.com", password: "subscriber123", role: "subscriber" },
    ];

    // ابحث عن المستخدم
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // ==== إنشاء JWT ====
    const secret = process.env.JWT_SECRET || "dev-secret-change-me";
    const secretKey = encoder.encode(secret);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const expSeconds = nowSeconds + 60 * 60; // صلاحية ساعة

    const token = await new SignJWT({ role: user.role })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt(nowSeconds)
      .setExpirationTime(expSeconds)
      .setSubject(user.email)
      .sign(secretKey);

    return NextResponse.json({
      token,
      role: user.role,
      expires_at: expSeconds,
    });
  } catch (err: any) {
    console.error("Login route error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
