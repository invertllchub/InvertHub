import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const projectId = formData.get("id")?.toString();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const url = process.env.BACKEND_URL;

    const res = await fetch(`${url}api/Projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Authorization": `${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: result.message},
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
