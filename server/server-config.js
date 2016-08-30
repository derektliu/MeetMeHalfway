var express = require('express');
var handler = require('./config/request-handler.js');
var bodyParser = require('body-parser');

var app = express();

// var clientPath = express.static(__dirname + '/client');

app.use(bodyParser.json());

app.use(express.static('client'));

// app.get('/hello', handler.helloWorld);

// app.post('/api/yelp', handler.requestYelp);
app.post('/api/halfway', handler.findHalfway);
app.get('/api/results', handler.getResults);
// app.get('/api/results', handler.findHalfway);
// app.post('/api/favorites', handler.saveFavorite);


module.exports = app;