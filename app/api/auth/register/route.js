import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { username, password, birthDate, email, sex, fullName, role } =
    await request.json();

  const res = await fetch("https://api.b5-hoomgroom.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      birthDate,
      email,
      sex,
      fullName,
      role,
    }),
  });

  if (res.ok) {
    const data = await res.json();

    return NextResponse.json(
      {
        message: data.message,
      },
      {
        status: 200,
      }
    );
  } else {
    const data = await res.json();
    return NextResponse.json(data.message, {
      status: 401,
    });
  }
}
