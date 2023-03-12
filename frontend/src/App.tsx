import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notes";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
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

  const notesGrid = (
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
  );

  return (
    <div>
      <Navbar
        loggedInUser={null}
        onSignUpClicked={() => {}}
        onLoginClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />
      <div>
        <button
          onClick={() => setShowAddNoteDialog(true)}
          className="bg-green-700 px-4 py-3 text-white font-semibold rounded-md mt-5 ml-2 flex items-center justify-center"
        >
          <FaPlus className="mr-1" /> Add new note
        </button>
        <h2 className="text-4xl text-center my-6">Take Notes App</h2>
        {/*notesLoading && UNCOMMENT WHEN PLACED CORRECTLY */ <BarLoader color="#36d7b7" />}
        {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError && (
          <>{notes.length > 0 ? notesGrid : <p>You don´t have any notes yet</p>}</>
        )}
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
        {false && (
          <SignUpModal
            onDismiss={() => {}}
            onSignUpSuccessful={() => {}}
          />
        )}

        {false && (
          <LoginModal
            onDismiss={() => {}}
            onLoginSuccessful={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default App;
