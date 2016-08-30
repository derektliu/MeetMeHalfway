var Yelp = require('yelp');
var https = require('https');
var qs = require('querystring');

var storage = {};

var yelp = new Yelp({
  consumer_key: 'NI_PZFnm4j5gpP0PSja_1g',
  consumer_secret: 'Ne3fBUIO5REb3EFhSMJwIg5tLkU',
  token: 'Iv5npXZy1MHOy_0GOPQJT2oHcl0klXxG',
  token_secret: 'GSDZEAycP4HG67MXSwu6QcIlBDk',
});

var google = {
  key: 'AIzaSyDSL-RaPYW1G6uJc445htYmrOQFaIBrrZU'
};

exports.findHalfway = function(request, response) {
  var user = request.body.data.user;
  var friend = request.body.data.friend;

  var userLoc, friendLoc;
  requestGoogleMaps(user, function(res, err) {
    if (err) { console.log('Error on finding user'); throw err; }
    userLoc = res;
    requestGoogleMaps(friend, function(res, err) {
      if (err) { console.log('Error on finding friend'); throw err; }
      friendLoc = res;
      
      // rough estimate
      var location = calculateHalfway(userLoc, friendLoc);

      // console.log('location', location);

      requestYelp(location, function(data) {
        response.send(data);
      });
    });
  });
};

exports.getResults = function(req, res) {
  res.send(JSON.stringify(storage));
};

var calculateHalfway = function(userLoc, friendLoc) {
  return {
    lat: (userLoc.lat + friendLoc.lat) / 2,
    lng: (userLoc.lng + friendLoc.lng) / 2
  };
};

var requestYelp = function(location, callback) {

  var stringLoc = location.lat + ',' + location.lng;

  yelp.search({ term: 'food', ll: stringLoc })
  .then(function (data) {
    // console.log('success from yelp', data);
    storage = data;
    callback(storage);
  })
  .catch(function (err) {
    console.error('error from yelp: ', err);
  });
};


var requestGoogleMaps = function(location, callback) {

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
      callback(body, null);
    });
    response.on('error', function(err) {
      callback(null, err);
    });
  });
};


// exports.saveFavorite = function(req, res) {
//   console.log('request body', req.body.data);
//   storage.push(req.body.data);
//   res.send('SERVER: successful POST');
// };