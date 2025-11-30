import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const userId = body.id
    console.log(userId)
    const url = process.env.BACKEND_URL;
    // Token
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;


    if (!token) {
      console.warn("⚠️ No token found!");
    }
  
    const res = await fetch(`${url}api/AppUser/${userId}/email`, {
      method: "PATCH",
      headers: {
        "Authorization": token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res)

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
        { success: false, message: result.message },
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
