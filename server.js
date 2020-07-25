const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/public/notes.html"));
});
