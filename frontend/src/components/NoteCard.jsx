import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-[#00FF9D] cursor-pointer"
    >
      <Link to={`/note/${note._id}`} className="card-body block">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
      </Link>
      <div className="card-actions justify-between items-center p-4 pt-0">
        <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex items-center gap-1">
          <PenSquareIcon className="size-4" />
          <button
            className="btn btn-ghost btn-xs text-error"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
