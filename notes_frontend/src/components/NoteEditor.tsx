"use client";

import React, { useState, useEffect } from "react";
import { Note } from "@/types/models";

const colors = {
  primary: "#2563eb",
  accent: "#f59e42",
  secondary: "#94a3b8",
};

export interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Partial<Note>) => void;
  onDelete: (noteId: string) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export default function NoteEditor({
  note,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note?.id, note?.title, note?.content]);

  if (!note) {
    return (
      <div className="flex items-center justify-center h-full text-secondary text-lg">
        Select or create a note to get started!
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col px-6 py-4 overflow-auto">
      <input
        type="text"
        placeholder="Note Title"
        className="text-2xl font-bold border-none outline-none bg-transparent mb-3 px-0"
        value={title}
        maxLength={120}
        onChange={e => setTitle(e.target.value)}
        style={{ color: colors.primary }}
        aria-label="Note title"
      />
      <textarea
        className="flex-1 w-full min-h-[200px] border-none outline-none bg-transparent resize-none py-2 text-base leading-7"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ color: "#24242f", fontFamily: "inherit" }}
        aria-label="Note content"
      />
      <div className="flex gap-4 pt-2 justify-end">
        <button
          className={`px-4 py-1 rounded text-white transition font-medium ${
            isSaving ? "opacity-80" : "hover:bg-primary"
          }`}
          style={{ background: colors.primary }}
          disabled={isSaving}
          onClick={() => onSave({ title, content })}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          className={`px-4 py-1 rounded text-white transition font-medium ${
            isDeleting ? "opacity-80" : "hover:bg-accent"
          }`}
          style={{
            background: colors.accent,
          }}
          disabled={isDeleting || !note.id}
          onClick={() => onDelete(note.id)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
