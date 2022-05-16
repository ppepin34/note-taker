const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./data/db.json');
const apiRoutes = require('./routes/apiRoutes/notes')
const htmlRoutes = require('./routes/htmlRoutes/index');
const { type } = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();


// get js and css files from public
app.use(express.static('public'))

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// function findById(id, notesArray) {
//     const result = notes.filter(note => note.id === id)[0];
//     return result;
// }

// function createNewNote(body, notesArray) {
//     const note = body;
//     notesArray.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, './data/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     )

//     return note
// }

// function validateNote(note) {
//     if (!note.title || typeof note.title !== 'string') {
//         return false;
//     }

//     if (!note.text || typeof note.text !== 'string') {
//         return false;
//     }

//     return true;
// }

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});