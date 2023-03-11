import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

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

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  console.log(notes);

  return (
    <div>
      <button
        onClick={() => setShowAddNoteDialog(true)}
        className="bg-green-700 px-4 py-3 text-white font-semibold rounded-md mt-5 ml-2 flex items-center justify-center"
      >
        <FaPlus className="mr-1" /> Add new note
      </button>
      <h2 className="text-4xl text-center my-6">Take Notes App</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl gap-6 mx-auto p-5">
        {notes.map((note) => (
          <Note
            key={note._id}
            note={note}
            onDeleteNoteClicked={deleteNote}
            onNoteClicked={setNoteToEdit}
          />
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
      {noteToEdit && (
        <AddNoteDialog
          noteToEdit={noteToEdit}
          setShowAddNoteDialog={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(notes.map((existingNote) => (existingNote._id === updateNote._id ? updateNote : existingNote)));
            setNoteToEdit(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
