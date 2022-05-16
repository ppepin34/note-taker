const express = require('express');
const app = express();
const notes = require('./data/db.json');
const apiRoutes = require('./routes/apiRoutes/notes')
const htmlRoutes = require('./routes/htmlRoutes/index')

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
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results)
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});