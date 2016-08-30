var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
  userLoc: String,
  friendLoc: String,
  halfwayLocLat: Number,
  halfwayLocLng: Number,
  results: Array
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;