import React from "react";
import { useForm } from "react-hook-form";
import { Note } from "../models/notes";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialog {
  noteToEdit?: Note;
  setShowAddNoteDialog: () => void;
  onNoteSaved: (note: Note) => void;
}

function AddEditNoteDialog({ noteToEdit, setShowAddNoteDialog, onNoteSaved }: AddEditNoteDialog) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="absolute inset-0 bg-black/80">
      <div>
        <div className="min-w-[300px] max-w-2xl bg-white mt-10 mx-auto flex flex-col rounded-md">
          <div className="flex">
            <h2 className="self-center text-3xl font-semibold ml-4">{noteToEdit ? "Edit note" : "Add note"}</h2>
            <button
              onClick={setShowAddNoteDialog}
              className="ml-auto mr-4 cursor-pointer inset border-[5px] border-transparent hover:border-gray-400/30 transition-all duration-300 ease-in-out text-2xl px-1 mx-1 my-3 rounded-lg"
            >
              ✖
            </button>
          </div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
              name="title"
              label="Title"
              as="input"
              type="text"
              placeholder="Title"
              register={register}
              registerOptions={{ required: "Required: Please enter a title", minLength: 2 }}
              error={errors.title}
            />
            <TextInputField
              name="text"
              label="Text"
              as="textarea"
              rows={3}
              placeholder="Add some text here..."
              register={register}
            />

            <hr className="mt-8" />

            <div className="flex justify-end mr-4 text-white">
              <button
                disabled={isSubmitting}
                className="bg-blue-500 px-4 py-2 my-3 self-end rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditNoteDialog;
