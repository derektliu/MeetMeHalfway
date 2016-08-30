var url = '127.0.0.1:1337';

angular.module('MeetMeHalfWayApp.services', [])
.factory('Requests', function($http, $location) {

  var requestHalfway = function(locations) {
    console.log('CLIENT: inside requestYelp');
    var config = {};
    config.data = locations;
    
    $http.post('/api/halfway', config)
      .then(function(response) {
        console.log('CLIENT: successful POST to /yelp');
        $location.path('/results');
      }, function(error) {
        console.log('CLIENT: error during POST from /yelp', error);
      });
  };

  var getResults = function(callback) {
    console.log('CLIENT: inside getRequests');
    $http.get('/api/results')
      .then(function(response) {
        console.log('CLIENT: successful GET');
        callback(response.data);
      }, function(error) {
        console.log('CLIENT: error', error);
      });
  };

  // var sendFavorites = function(user, friend) {
  //   console.log('CLIENT: inside sendFavorites');
  //   var config = {
  //     data: {
  //       user: user,
  //       friend: friend
  //     }
  //   };
  //   $http.post('/favorites', config)
  //     .then(function(response) {
  //       console.log('CLIENT: successful POST', response.data);
  //     }, function(error) {
  //       console.log('CLIENT: error', error);
  //     });
  // };

  return {
    requestHalfway: requestHalfway,
    getResults: getResults
    // sendFavorites: sendFavorites
  };
});