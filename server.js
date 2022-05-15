const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

// get js and css files from public
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});