// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Reservation Info (DATA)
// =============================================================

var notes = [];
var currentID = 0;
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {

  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Displays all characters
app.get("/api/notes", function (req, res) {
  res.json(notes);
});


// Create New Characters - takes in JSON input
app.post("/api/notes", function (req, res) {
  note = req.body;
  note.id = currentID;
  currentID += 1;
  notes.push(note);
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (parseInt(notes[i].id) === parseInt(id)) { notes.splice(i, 1); }
  }
  res.json(notes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
