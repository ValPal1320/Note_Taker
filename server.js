// Require dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Require routes file
require('./routes/routes')(app);

//Listen to server and show it is running
app.listen(PORT, () => console.log(`App listening at http://localhost: ${PORT} 🚀`));
