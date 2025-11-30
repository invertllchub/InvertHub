import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const userId = body.id
    const url = process.env.BACKEND_URL;
    // Token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const role = cookieStore.get("role")?.value;



    console.log(userId)

    if (!token) {
        console.warn("⚠️ No token found!");
    }
    const res = await fetch(`${url}api/AppUser/${userId}/${role?.toLowerCase()}`, {
        method: "PUT",
        headers: {
            "Authorization": token || "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const text = await res.text();
    let result;
    try {
        result = text ? JSON.parse(text) : {};
    } catch (err) {
        console.error("Invalid JSON response:", text);
        result = {};
    }
    console.log("📦 API response body:", result);

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: result.message || "Backend error" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    console.error("Proxy API Error:", err.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
