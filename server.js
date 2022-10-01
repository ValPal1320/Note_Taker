const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./public/assets/js/index');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));

// GET Route for main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//Listen to server and show it is running
app.listen(PORT, () => console.log(`App listening at http://localhost: ${PORT} 🚀`));
