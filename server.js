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

// Reservation Info (DATA)
// =============================================================
var reservation = [{
  customerName: "Melissa",
			phoneNumber: "123",
			customerEmail: "123@gmail.com",
			customerID: "75"}
];

var waitlist = [{
  customerName: "Melissa",
			phoneNumber: "123",
			customerEmail: "123@gmail.com",
			customerID: "75"}
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});

// Displays all characters
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
  // Return the data that exist
  res.json(reservation);
});

app.get("/api/waitlist", function(req, res) {
  // Return the data that exist
  res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // Return the data that exist
  if(reservation.length<=4){
  reservation.push(req.body);
  }
  else{
    waitlist.push(req.body);
  }
  res.json(reservation);
});

app.post("/api/waitlist", function(req, res) {
  // Return the data that exist
  res.json(waitlist);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
