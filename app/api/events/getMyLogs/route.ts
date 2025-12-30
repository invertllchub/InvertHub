import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const url = process.env.BACKEND_URL;

    const res = await fetch(`${url}api/AuditLog/my-logs`, {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    });

    const result = await res.json();


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
