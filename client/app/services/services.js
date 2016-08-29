var keys = {
  consumerKey: 'NI_PZFnm4j5gpP0PSja_1g',
  consumerSecret: '  Ne3fBUIO5REb3EFhSMJwIg5tLkU',
  token: 'RqEhZV4SakLGwl0DRYo3vAmMXeI3Bsav',
  tokenSecret: 'uYhm4b8k1WR9W5oPvfxbxWpzz_U',
};

var url = '127.0.0.1:1337';

angular.module('MeetMeHalfWayApp.services', [])
.factory('Requests', function($http) {

  var sendFavorites = function(user, friend) {

    console.log('CLIENT: inside sendFavorites');
    var config = {
      data: {
        user: user,
        friend: friend
      }
    };
    $http.post('/yelp', config)
      .then(function(response) {
        console.log('CLIENT: successful POST', response.data);
      }, function(error) {
        console.log('CLIENT: error', error);
      });

  };

  var getResults = function() {

    console.log('CLIENT: inside getRequests');
    $http.get('/yelp')
      .then(function(response) {
        console.log('CLIENT: successful GET', response.data);
      }, function(error) {
        console.log('CLIENT: error', error);
      });
  };
  return {
    getResults: getResults,
    sendFavorites: sendFavorites
  };
});