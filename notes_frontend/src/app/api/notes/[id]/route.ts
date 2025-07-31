import { NextRequest, NextResponse } from "next/server";

type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const globalDemo = globalThis as { demoNotes?: Note[] };
if (!globalDemo.demoNotes) {
  globalDemo.demoNotes = [
    {
      id: "1",
      userId: "user-example",
      title: "Welcome",
      content: "This is your first note! You can edit or delete it.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}
const demoNotes: Note[] = globalDemo.demoNotes!;

export async function PUT(req: NextRequest) {
  // Extract note ID from the pathname
  const { pathname } = req.nextUrl;
  const idMatch = pathname.match(/\/api\/notes\/([^/]+)/);
  const id = idMatch ? idMatch[1] : null;

  if (!id) {
    return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
  }

  const { title, content } = await req.json();
  const idx = demoNotes.findIndex((n) => n.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  demoNotes[idx] = {
    ...demoNotes[idx],
    title,
    content,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(demoNotes[idx]);
}

export async function DELETE(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const idMatch = pathname.match(/\/api\/notes\/([^/]+)/);
  const id = idMatch ? idMatch[1] : null;

  if (!id) {
    return NextResponse.json({ message: "Invalid note ID" }, { status: 400 });
  }

  const idx = demoNotes.findIndex((n) => n.id === id);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  demoNotes.splice(idx, 1);
  return NextResponse.json({ success: true });
}
