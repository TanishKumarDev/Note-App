import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/notes");

        // Adjust if API response is wrapped in an object like { notes: [...] }
        const notesArray = Array.isArray(data) ? data : data.notes;

        if (!Array.isArray(notesArray)) throw new Error("Invalid notes format");

        setNotes(notesArray);
        setIsRateLimited(false);
      } catch (error) {
        const status = error?.response?.status;
        console.error("Error fetching notes:", error);

        if (status === 429) setIsRateLimited(true);
        else toast.error("Failed to load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {isRateLimited ? (
        <RateLimitedUI />
      ) : (
        <main className="max-w-7xl mx-auto p-4 mt-6">
          {loading ? (
            <div className="text-center text-primary py-10 animate-pulse">
              Loading notes...
            </div>
          ) : notes.length === 0 ? (
            <NotesNotFound />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
