const path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const noteFile = "./public/assets/db.json";
let notes = require(noteFile);
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//this starts the server
app.listen(PORT, function () {
  console.log('functional')
});
//routes the html to the index page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
//connects the notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(notes);
});
//adding info to the db file
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  //adding an id for deleting purposes later
  newNote.id = parseInt(notes.length) + 1;
  fs.readFile(noteFile, "utf-8", (err, data) => {
    let currentNotes = JSON.parse(data);
    //here the inputted info is added to the array in the db file
    currentNotes.push(newNote);
    fs.writeFile(noteFile, JSON.stringify(currentNotes), (err) => { if (err) throw err;
      res.json(currentNotes);
    });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const deleteId = req.params.id;
  //here I use filter to remove the one specific object in the notes array
  notes = notes.filter((note) => {
    return note.id != deleteId;
  });
  fs.writeFile(noteFile, JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(notes);
  });
});