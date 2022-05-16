const express = require('express');
const app = express();
const notes = require('./data/db.json');

const PORT = process.env.PORT || 3001;


// get js and css files from public
app.use(express.static('public'))

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// initial api call
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});