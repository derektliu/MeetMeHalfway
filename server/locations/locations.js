var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
  userLoc: String,
  friendLoc: String,
  halfwayLoc: String,
  results: Array
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;