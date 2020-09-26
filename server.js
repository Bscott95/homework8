// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");
// const { json } = require("body-parser");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing ---> Q ON THESE LINES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

// *************  HTML Routes START ****************************
// * The following HTML routes should be created:
//   * GET `/notes` - Should return the `notes.html` file.
//   * GET `*` - Should return the `index.html` file

// Send index.html to the user
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public","index.html"));
  });
  
// Send tables.html to the user
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public","notes.html"));
  });  
// ************* HTML Routes END *******************************


// ************* API ROUTES START *******************************
// The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with 
// the given `id` property, and then rewrite the notes to the `db.json` file.

// GET /api/notes
app.get("/api/notes", function(req, res) {
    let rawData = fs.readFileSync("db/db.json");    
    res.send(JSON.parse(rawData));
});

// POST /api/notes
app.post("/api/notes", function(req, res) {
  // Data received from the form submit
  let requestData = req.body;
     console.log(requestData)
  //Get the data from db.json
  let rawData = fs.readFileSync("db/db.json");  
  let jsonData = JSON.parse(rawData);
});

// DELETE /api/clear   THIS is to clear all the data from all the notes i.e db.json
app.post('/api/notes',function(req, res) {
    fs.writeFileSync('db/db.json', JSON.stringify([]));
    res.send('All Clear');
});
// ************* API ROUTES END ********************************


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  