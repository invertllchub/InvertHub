import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const ArticleSlug = req.nextUrl.searchParams.get("slug");

    if (!ArticleSlug) {
        return NextResponse.json(
            { success: false, message: "Job ID is required" },
            { status: 400 }
        );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const url = process.env.BACKEND_URL;

    const res = await fetch(`${url}api/Articles/slug/${ArticleSlug}`, {
        method: "GET",
        headers: {
            Authorization: `${token}`,
        },
    });

    const result = await res.json();
    console.log(result);

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
