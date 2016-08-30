var storage = require('../sampleYelpData.json');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'NI_PZFnm4j5gpP0PSja_1g',
  consumer_secret: 'Ne3fBUIO5REb3EFhSMJwIg5tLkU',
  token: 'Iv5npXZy1MHOy_0GOPQJT2oHcl0klXxG',
  token_secret: 'GSDZEAycP4HG67MXSwu6QcIlBDk',
});

// exports.helloWorld = function(req, res) {
//   res.send('Testing 1 2 3');
// };

exports.requestYelp = function(req, res) {
  // var obj = {name: 'Yelp'};
  console.log('SERVER: successful POST', yelp);

  yelp.search({ term: 'food', location: 'San Francisco' })
  .then(function (data) {
    console.log('success from yelp: ', data);
    res.send(JSON.stringify(data));
  })
  .catch(function (err) {
    console.error('error from yelp: ', err);
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