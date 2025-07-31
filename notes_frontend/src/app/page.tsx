"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NoteEditor from "@/components/NoteEditor";
import { Note } from "@/types/models";
import { getUserFromLocalStorage, isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Simple auth check and redirect
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    setUser(getUserFromLocalStorage());
    setCheckingAuth(false);
  }, [router]);

  useEffect(() => {
    if (!user) return;
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchNotes() {
    const resp = await fetch("/api/notes", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const data = await resp.json();
    setNotes(data.notes || []);
    if (!selectedId && data.notes.length > 0) {
      setSelectedId(data.notes[0].id);
    }
  }

  function handleSelectNote(noteId: string) {
    setSelectedId(noteId);
  }

  async function handleCreateNote() {
    setIsSaving(true);
    const resp = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ title: "Untitled", content: "" }),
    });
    if (resp.ok) {
      await fetchNotes();
    }
    setIsSaving(false);
  }

  async function handleSaveNote(changes: Partial<Note>) {
    if (!selectedId) return;
    setIsSaving(true);
    const resp = await fetch(`/api/notes/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(changes),
    });
    if (resp.ok) {
      await fetchNotes();
    }
    setIsSaving(false);
  }

  async function handleDeleteNote(noteId: string) {
    setIsDeleting(true);
    await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setSelectedId(null);
    await fetchNotes();
    setIsDeleting(false);
  }

  const currentNote = notes.find((n) => n.id === selectedId) || null;

  if (checkingAuth) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar
          notes={notes}
          selectedNoteId={selectedId}
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
        />
        <main className="flex-1 h-full min-h-0" style={{ background: "#fff" }}>
          <NoteEditor
            note={currentNote}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
            isSaving={isSaving}
            isDeleting={isDeleting}
          />
        </main>
      </div>
    </div>
  );
}
