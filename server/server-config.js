var express = require('express');
var handler = require('./config/request-handler.js');
var bodyParser = require('body-parser');

var app = express();

// var clientPath = express.static(__dirname + '/client');

app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/hello', handler.helloWorld);

// app.get('/yelp', handler.requestYelp);
app.get('/yelp', handler.getFavorites);
app.post('/yelp', handler.saveFavorite);


module.exports = app;