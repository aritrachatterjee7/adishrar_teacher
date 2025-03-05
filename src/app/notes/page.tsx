// src/app/notes/page.tsx
"use client";

import React, { useState } from "react";
import AINotes from "@/src/components/notes/ai-notes";
import NotesEditor from "@/src/components/notes/notes-editor";

const NotesPage: React.FC = () => {
  const [aiNotes, setAiNotes] = useState<string>("");

  return (
    <div className="space-y-6 p-6">
      <AINotes onGenerate={(notes: string) => setAiNotes(notes)} />
      <NotesEditor aiNotes={aiNotes || ""} /> {/* Ensuring aiNotes is never undefined */}
    </div>
  );
};

export default NotesPage;
