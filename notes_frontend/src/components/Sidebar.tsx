"use client";

import React from "react";
import { Note } from "@/types/models";
import { FaPlus } from "react-icons/fa";

const colors = {
  accent: "#f59e42",
  secondary: "#94a3b8",
  background: "#f8fafc",
};

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (noteId: string) => void;
  onCreateNote: () => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
}: SidebarProps) {
  return (
    <nav
      className="h-full flex flex-col px-2 py-4 gap-2 border-r text-sm"
      style={{
        background: colors.background,
        minWidth: 220,
        borderColor: "#e2e8f0",
      }}
    >
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="font-semibold text-[#222]">Your Notes</span>
        <button
          className="p-1 hover:bg-[#ededed] rounded text-xs"
          style={{ color: colors.accent }}
          title="Create new note"
          onClick={onCreateNote}
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        {notes.length === 0 ? (
          <div className="p-3 text-[#a3a3a3]">
            No notes yet.
          </div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li
                key={note.id}
                className="mb-1"
              >
                <button
                  onClick={() => onSelectNote(note.id)}
                  className={`w-full text-left px-2 py-2 rounded transition
                    ${
                      note.id === selectedNoteId
                        ? "bg-[#fef8f3] font-bold"
                        : "hover:bg-[#f3f4f6] font-normal"
                    }`}
                  style={{
                    color:
                      note.id === selectedNoteId ? colors.accent : "#222",
                  }}
                >
                  {note.title || <span className="opacity-60 italic">Untitled</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
