var Yelp = require('yelp');
var https = require('https');
var qs = require('querystring');

var yelp = new Yelp({
  consumer_key: 'NI_PZFnm4j5gpP0PSja_1g',
  consumer_secret: 'Ne3fBUIO5REb3EFhSMJwIg5tLkU',
  token: 'Iv5npXZy1MHOy_0GOPQJT2oHcl0klXxG',
  token_secret: 'GSDZEAycP4HG67MXSwu6QcIlBDk',
});

var google = {
  key: 'AIzaSyDSL-RaPYW1G6uJc445htYmrOQFaIBrrZU'
};

exports.calculateHalfway = function(userLoc, friendLoc) {
  return {
    lat: (userLoc.lat + friendLoc.lat) / 2,
    lng: (userLoc.lng + friendLoc.lng) / 2
  };
};

exports.requestYelp = function(location, callback) {

  var stringLoc = location.lat + ',' + location.lng;

  yelp.search({ term: 'food', ll: stringLoc })
  .then(function (data) {
    // console.log('success from yelp', data);
    callback(data);
  })
  .catch(function (err) {
    console.error('error from yelp: ', err);
  });
};


exports.requestGoogleMaps = function(location, callback) {

  var path = qs.stringify({
    address: location,
    key: google.key
  });

  var options = {
    hostname: 'maps.googleapis.com',
    path: '/maps/api/geocode/json?' + path,
    method: 'GET'
  };

  https.get(options, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      body = JSON.parse(body).results[0].geometry.location;
      // body = JSON.parse(body);
      callback(body, null);
    });
    response.on('error', function(err) {
      callback(null, err);
    });
  });
};