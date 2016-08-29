var express = require('express');
var handler = require('./config/request-handler.js');

var app = express();

app.get('/', handler.helloWorld);

module.exports = app;