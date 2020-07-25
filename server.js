const path = require('path');
const express = require('express');
const fs= require('fs');
const app = express();
const noteFile = './public/assets/db.json'
const notes = require(noteFile)
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.json(notes);
});

app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  newNote.id = parseInt(notes.length) + 1
  fs.appendFile(noteFile, newNote, () => {
    if (err) throw err;
    res.json(notes)
  });
})

app.delete("/api/notes/:id", function(req, res) {
  const deleteId = req.params.id
  
})