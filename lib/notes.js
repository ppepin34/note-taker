const fs = require('fs');
const path = require('path')

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(body);
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );

    return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    if (!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
};

function findById(id, notesArray){
    const result = notesArray.filter(note => note.id === id)[0];
    return result
};

function deleteNote(deleteObj){
    // grab entire object and delete
    const result = notes.filter(note => note !== deleteObj)

    // map ids for each object to new index value
    result.forEach(function(note, index) {
        note.id = index
    });

    // rewrite json with objects having new ids
    fs.writeFileSync
}
module.exports = {
    validateNote,
    createNewNote,
    findById,
    deleteNote
}