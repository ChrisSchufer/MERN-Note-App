import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div>
      <button
        onClick={() => setShowAddNoteDialog(true)}
        className="bg-green-500 px-3 py-1 rounded-md mt-5 ml-2"
      >
        add new note
      </button>
      <h2 className="text-4xl text-center my-6">Take Notes App</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl gap-6 mx-auto p-5">
        {notes.map((note) => (
          <Note key={note._id} note={note} />
        ))}
      </div>
      {showAddNoteDialog && (
        <AddNoteDialog
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
          setShowAddNoteDialog={() => setShowAddNoteDialog(false)}
        />
      )}
    </div>
  );
}

export default App;
