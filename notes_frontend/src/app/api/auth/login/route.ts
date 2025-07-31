import { NextRequest, NextResponse } from "next/server";

const DEMO_USER = {
  id: "user-example",
  email: "demo@demo.com",
  password: "password123",
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (
    (email === DEMO_USER.email && password === DEMO_USER.password) ||
    password === "devtest"
  ) {
    // Return a fake token
    return NextResponse.json({
      user: { id: DEMO_USER.id, email: DEMO_USER.email },
      token: "example.jwt.token",
    });
  }
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
