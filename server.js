// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Reservation Info (DATA)
// =============================================================

var notes=[];
var currentID = 0;
fs.readFile(path.join(__dirname, "/db/db.json"), (err, data) => {
  if (err) throw err;
  notes = JSON.parse(data);
  console.log('good');
  for (i=0; i<notes.length; i++){
    console.log(parseInt(notes[i].id));
    if(parseInt(notes[i].id)>currentID)
    { currentID=parseInt(notes[i].id)+1}
  }
});


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
  fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id;
  for (var i = 0; i < notes.length; i++) {
    if (parseInt(notes[i].id) === parseInt(id)) { notes.splice(i, 1); }
  }
  fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  res.json(notes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
