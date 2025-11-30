import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password } = await req.json();
    const url = process.env.BACKEND_URL;

    const res = await fetch(`${url}api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    console.log(result)

    if (!res.ok) {
        return NextResponse.json({ success: false, message: result.message }, { status: 400 });
    }

    const token = result.data.token;
    const role = result.data.roles[0];
    const expirationDate = result.data.tokenExpiration;
    const id = result.data.id;


    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
    });

    response.cookies.set("role", role, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
    });

    response.cookies.set("expirationDate", expirationDate, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
    });

    response.cookies.set("id", id, {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
    });

    return response;
}
