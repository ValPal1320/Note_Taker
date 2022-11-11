// Require dependencies
const express = require('express');
const path = require('path');
let allNotes = require('./db/db.json');
const { uid } = require('uid');
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
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET any saved notes from db file
app.get('/api/notes', (req, res) => {
    res.json(allNotes)
});

// POST any new notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        let newNote = {
            title,
            text,
            id: uid(),
        };
        allNotes.push(newNote);
        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(allNotes), error => {
            if (error) {
                console.log('There was an error logging your note, try again.');
            }
            res.json(newNote)
        })
    }
});


// Function to delete notes
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

// DELETE a note by their unique id
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

//Listen to server and show it is running
app.listen(PORT, () => console.log(`App listening at http://localhost: ${PORT} 🚀`));
