const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { notes } = require('./data/db.json');
const apiRoutes = require('./routes/apiRoutes/notes')
const htmlRoutes = require('./routes/htmlRoutes/index');
const { type } = require('express/lib/response');

const PORT = process.env.PORT || 3001;


// get js and css files from public
app.use(express.static('public'))

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// routes
// app.get('/api', apiRoutes);
// app.get('/', htmlRoutes);

function findById(id, notesArray) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results)
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )

    return note
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    if (!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
}
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in the req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});