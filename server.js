// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let fs = require("fs");
const { json } = require("express");
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
app.get("/api/notes", function(req, res) {
  let rawData = fs.readFileSync("./db/db.json", 'utf8');
  console.log("res.json", res.json)
  // return res.json(rawData)    
  res.send(JSON.parse(rawData));
});

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.
app.post("/api/notes", function(req, res) {
  //Get the data from db.json
  let notesArray = JSON.parse(fs.readFileSync("db/db.json"))
  console.log(notesArray); 

  // function to add an id value. 
  let id = () => {
    if (notesArray.length === 0) {
      return 0;
      //otherwise set id to last id in array + 1
    } else {
      let setId = notesArray[notesArray.length - 1].id;
      setId++;
      return setId;
    }
  };

  // Data received from the form submit
  let requestData = req.body;
  requestData.id = id()

  notesArray.push(requestData)
  fs.writeFileSync("db/db.json", JSON.stringify(notesArray));
  res.send(notesArray);
});

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with 
// the given `id` property, and then rewrite the notes to the `db.json` file.

// DELETE /api/clear   THIS is to clear all the data from all the notes i.e db.json
app.delete('/api/notes/:noteid',function(req, res) {
  let id = req.params.noteid;
  console.log(id)
  let notesArray = JSON.parse(fs.readFileSync("db/db.json"))

  // const newArr = notesArray.filter(note => note.id === parseInt(id));
  // console.log("noteAr",newArr)
  const withRemovedNote = notesArray.filter((note) => note.id !== parseInt(id));
  console.log(withRemovedNote)
  // const finalNote = JSON.stringify(withRemovedNote);
  fs.writeFileSync("db/db.json", JSON.stringify(withRemovedNote));
  res.send(withRemovedNote)
});
// ************* API ROUTES END ********************************


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  