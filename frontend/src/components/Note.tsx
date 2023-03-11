import { Note as NoteModel } from "../models/notes";
import { formatDate } from "../utils/formatDate";
import { AiFillDelete } from "react-icons/ai";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
}

const Note = ({ note, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <div
      onClick={() => onNoteClicked(note)}
      className="flex flex-col bg-yellow-400/70 rounded-md border border-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in cursor-pointer"
    >
      <div className="px-4 py-3">
        <div className="flex flex-nowrap items-start gap-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <AiFillDelete
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
            className="ml-auto mt-[6px] scale-150 fill-black/70 hover:fill-black/90 transition-colors duration-200 ease-in"
          />
        </div>
        <p className="mt-1 whitespace-pre-line mb-2">{text}</p>
      </div>
      <div className="border-t-2 mt-auto border-black bg-yellow-500/50 px-2 py-1">
        <p className="my-auto">{createdUpdatedText}</p>
      </div>
    </div>
  ); // whitespace-pre-line --> database linebreaks are taken care of
};

export default Note;
