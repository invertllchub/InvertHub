import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
    try {
    const body = await req.json();
    const id = body.id
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        console.warn("⚠️ No token found!");
    }

    const url = process.env.BACKEND_URL;

    const res = await fetch(`${url}api/Jobs/${id}`, {
        method: "DELETE",
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
            { success: false, message: result.message },
            { status: res.status || 400 }
        );
    }

    return NextResponse.json({ success: true, data: result });
    } catch (err: any) {
        console.error("Proxy API Error:", err);
        return NextResponse.json(
            { success: false, message: "Server error", error: err?.message || err },
            { status: 500 }
        );
    }
}
