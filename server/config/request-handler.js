var storage = [{ user: 'Derek', friend: 'Sam'}];

var keys = {
  consumerKey: 'NI_PZFnm4j5gpP0PSja_1g',
  consumerSecret: '  Ne3fBUIO5REb3EFhSMJwIg5tLkU',
  token: 'RqEhZV4SakLGwl0DRYo3vAmMXeI3Bsav',
  tokenSecret: 'uYhm4b8k1WR9W5oPvfxbxWpzz_U',
};

exports.helloWorld = function(req, res) {
  res.send('Testing 1 2 3');
};

exports.requestYelp = function(req, res) {
  var obj = {name: 'Yelp'};
  console.log('SERVER: successful GET');
  res.send(JSON.stringify(obj));
};

exports.getFavorites = function(req, res) {
  res.send(JSON.stringify(storage));
};

exports.saveFavorite = function(req, res) {
  console.log('request body', req.body.data);
  storage.push(req.body.data);
  res.send('SERVER: successful POST');
};