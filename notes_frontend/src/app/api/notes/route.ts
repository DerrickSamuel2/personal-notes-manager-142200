import { NextRequest, NextResponse } from "next/server";

type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const demoNotes: Note[] = [
  {
    id: "1",
    userId: "user-example",
    title: "Welcome",
    content: "This is your first note! You can edit or delete it.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  // Return all notes for mock user "user-example".
  return NextResponse.json({ notes: demoNotes });
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  const newNote: Note = {
    id: Math.random().toString(36).slice(2),
    userId: "user-example",
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  demoNotes.unshift(newNote);
  return NextResponse.json(newNote, { status: 201 });
}
