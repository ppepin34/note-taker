const router = require('express').Router();
const { append } = require('express/lib/response');
const { notes } = require('../../data/db.json');
const { validateNote, createNewNote, findById }  = require('../../lib/notes')

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results)
});


router.post('/notes', (req, res) => {
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

router.delete('/notes/:id', (req, res) => {
    // get object that is to be deleted
    const deleteObj = findById(req.params.id, notes);

    const result = deleteNote(deleteObj);
})
module.exports = router;