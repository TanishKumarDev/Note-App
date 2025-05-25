// models/Notes.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
