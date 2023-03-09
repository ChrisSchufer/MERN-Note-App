import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Note } from "./models/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
