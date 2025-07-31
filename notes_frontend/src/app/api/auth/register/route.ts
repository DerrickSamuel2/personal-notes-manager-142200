import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Accept any valid registration for demo purposes.
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ message: "Invalid" }, { status: 400 });
  }
  return NextResponse.json({
    user: { id: "user-" + Math.random().toString(36).substring(2), email },
    token: "example.jwt.token",
  });
}
