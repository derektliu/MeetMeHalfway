var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
  user: String,
  friend: String,
  halfwayLocLat: Number,
  halfwayLocLng: Number,
  results: Array
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;