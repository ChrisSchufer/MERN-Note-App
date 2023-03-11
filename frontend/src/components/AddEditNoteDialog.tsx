import React from "react";
import { useForm } from "react-hook-form";
import { Note } from "../models/notes";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

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
            <div className="flex flex-col mt-6 mx-4">
              <label
                className="text-xl mb-1"
                htmlFor="title"
              >
                Title <span className="text-red-600 text-base font-semibold ml-2">{errors.title?.message}</span>
              </label>
              <input
                className={`border focus:outline text-lg rounded-md transition-shadow duration-200 ease-in-out p-1 pl-3 py-2 ${errors.title ? "shadow-customError" : "focus:shadow-custom"}`}
                id="title"
                type="text"
                placeholder="Title"
                {...register("title", {
                  required: "Required: Please add a title.",
                  minLength: 2,
                })}
              />
            </div>
            <div className="flex flex-col mt-4 mx-4">
              <label
                className="text-xl mb-1"
                htmlFor="text"
              >
                Text
              </label>
              <textarea
                className="border p-1 text-lg rounded-md pl-3 py-2 focus:shadow-custom focus:outline transition-shadow duration-200 ease-in-out"
                id="text"
                placeholder="Text"
                {...register("text")}
              />
            </div>

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
