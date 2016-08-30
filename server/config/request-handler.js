var utility = require('./utility.js');

var storage = {};
var Locations = require('../locations/locations.js');


exports.findHalfway = function(req, res) {
  var user = req.body.data.user;
  var friend = req.body.data.friend;

  var userLoc, friendLoc;
  utility.requestGoogleMaps(user, function(userLoc, err) {
    if (err) { throw err; }

    utility.requestGoogleMaps(friend, function(friendLoc, err) {
      if (err) { throw err; }
      
      // rough estimate
      var location = utility.calculateHalfway(userLoc, friendLoc);

      // console.log('location', location);

      utility.requestYelp(location, function(data) {
        storage = data;
        res.send(storage);
      });
    });
  });
};

exports.getResults = function(req, res) {
  res.send(JSON.stringify(storage));
};


// exports.saveFavorite = function(req, res) {
//   console.log('request body', req.body.data);
//   storage.push(req.body.data);
//   res.send('SERVER: successful POST');
// };