const path = require('path');
const express = require('express');
const fs= require('fs');
const app = express();
const noteFile = './public/assets/db.json'
const notes = require(noteFile)
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

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
  console.log(newNote)
  newNote.id = parseInt(notes.length) + 1
  fs.readFile(noteFile, 'utf-8', (err, data) => {
    let currentNotes = JSON.parse(data)
    currentNotes.push(newNote)
    fs.writeFile(noteFile, JSON.stringify(currentNotes), err => {
      if (err) throw err;
      res.json(currentNotes)
    });
  })  
})

app.delete("/api/notes/:id", function(req, res) {
  const deleteId = req.params.id
  
})

function readDatabase(something){
  fs.readFile(noteFile, 'utf-8', (err, data) => {
    let newInfo = JSON.parse(data)
    console.log(newInfo)
  })

}

readDatabase()