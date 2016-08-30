var express = require('express');
var handler = require('./config/request-handler.js');
var bodyParser = require('body-parser');

var app = express();

// var clientPath = express.static(__dirname + '/client');

app.use(bodyParser.json());

app.use(express.static('client'));

// app.get('/hello', handler.helloWorld);

app.get('/api/yelp', handler.requestYelp);
app.get('/api/results', handler.getResults);
// app.post('/api/favorites', handler.saveFavorite);


module.exports = app;