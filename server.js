const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const db = require('./configuration/database.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(db.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(error => {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit();
});

// define a base route
app.get('/', (req, res) => {
    res.json({"message": "Kea medical backend developper test."});
});

//include route templates
require('./app/routes/candidature.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});