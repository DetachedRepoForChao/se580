const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // for logging

// Static assets
// app.use(express.static('client/build'));
app.use(express.static(path.join(__dirname, 'client/build')));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
