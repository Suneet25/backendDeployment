let mongoose = require("mongoose");

let notesSchema = mongoose.Schema(
  { title: String, body: String, user: String },
  { versionKey: false }
);

let NotesModel = mongoose.model("note", notesSchema);

module.exports = { NotesModel };
