// Require dependencies
const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const uid = require('uid');
const fs = require('fs');

// Initialize express
const PORT = 3001;
const app = express();

// Data parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// GET files for path joining
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

// GET any saved notes from db file
app.get('/api/notes', (req, res) => {
    res.json(notes)
});

// POST any new notes
app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text
    }

    notes.push(newNote)
    res.json('New note added successfully!')
});

//Listen to server and show it is running
app.listen(PORT, () => console.log(`App listening at http://localhost: ${PORT} 🚀`));
