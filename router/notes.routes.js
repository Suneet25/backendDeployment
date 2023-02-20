let express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let { NotesModel } = require("../models/notes.model");
let notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  try {
    let notes = await NotesModel.find();
    res.send(notes);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

notesRouter.post("/create", async (req, res) => {
  let payload = req.body;
  try {
    let note = new NotesModel(payload);
    await note.save();
    res.send({ msg: "Note has been added" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

notesRouter.delete("/delete/:id", async (req, res) => {
  let noteId = req.params.id;
  try {
    await NotesModel.findByIdAndDelete({ _id: noteId });
    res.send("Note has been deleted");
  } catch (error) {
    res.send({ msg: error.message });
  }
});

module.exports = { notesRouter };
