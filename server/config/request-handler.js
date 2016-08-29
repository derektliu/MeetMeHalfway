exports.helloWorld = function(req, res) {
  res.send('Testing 1 2 3');
};

exports.requestYelp = function(req, res) {
  var obj = { name: 'Yelp' };
  res.send('SERVER: successful GET');
  res.send(JSON.stringify(obj));
};

exports.saveFavorite = function(req, res) {
  console.log('request body', req.body);
  res.send('SERVER: successful POST');
};