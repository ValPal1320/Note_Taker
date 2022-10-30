const path = require('path');
const fs = require('fs');

module.exports = app => {

    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);


        // Setup GET route
        app.get("/api/notes", function (req, res) {
            //Read db.json file and return all saved notes
            res.json(notes);
        });

        // Setup POST route
        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateData();
            return console.log("Added new note!");
        });

        function updateData() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }


    });









}