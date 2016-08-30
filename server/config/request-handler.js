var db = require('./db-config.js');
var utility = require('./utility.js');
var sampleData = require('../sampleYelpData.json');

// var storage = {};
var Locations = require('../locations/locations.js');

exports.findHalfway = function(req, res) {
  var user = req.body.data.user;
  var friend = req.body.data.friend;

  user = 'San Francisco';
  friend = 'Los Angeles';

  utility.requestGoogleMaps(user, function(userLoc, err) {
    if (err) { throw err; }

    utility.requestGoogleMaps(friend, function(friendLoc, err) {
      if (err) { throw err; }

      // rough estimate
      var halfwayLoc = utility.calculateHalfway(userLoc, friendLoc);

      // console.log('halfway', halfwayLoc);

      utility.requestYelp(halfwayLoc, function(data) {

        var newSearch = new Locations({
          user: user,
          friend: friend,
          halfwayLocLat: halfwayLoc.lat,
          halfwayLocLng: halfwayLoc.lng,
          results: data.businesses
        });
        // var newSearch = new Locations({
        //   userLoc: user,
        //   friendLoc: 'Los Angeles',
        //   halfwayLocLat: 35.91355,
        //   halfwayLocLng: -120.33155,
        //   results: sampleData.businesses
        // });

        newSearch.save(function(err, newSearch) {
          if (err) {
            console.log('Error saving into db');
            throw err;
          }
          console.log('Success saving into db!');
        });

        res.send();
      });
    });
  });
};

exports.getResults = function(req, res) {
  Locations.find({}).exec(function (err, search) {
    if (err) {
      console.log('Error retrieving from db!');
      throw err;
    }
    console.log('Success retrieving from db!', search);
    res.send(JSON.stringify(search));
  });
};


// exports.saveFavorite = function(req, res) {
//   console.log('request body', req.body.data);
//   storage.push(req.body.data);
//   res.send('SERVER: successful POST');
// };