import { Note as NoteModel } from "../models/notes";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <div className="flex flex-col bg-yellow-400/70 rounded-md border border-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200 ease-in cursor-pointer">
      <div className="px-2 py-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 whitespace-pre-line mb-2">{text}</p>
      </div>
      <div className="border-t-2 mt-auto border-black bg-yellow-500/50 px-2 py-1">
        <p className="my-auto">{createdUpdatedText}</p>
      </div>
    </div>
  ); // whitespace-pre-line --> database linebreaks are taken care of
};

export default Note;
