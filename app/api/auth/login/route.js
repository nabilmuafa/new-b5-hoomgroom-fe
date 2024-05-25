import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { username, password } = await request.json();

  const res = await fetch("https://api.b5-hoomgroom.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    const data = await res.json();
    const token = data.data.token;

    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return NextResponse.json(
      {
        message: data.message,
        token: token,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(data.message, {
      status: 401,
    });
  }
}
