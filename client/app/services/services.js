var url = '127.0.0.1:1337';

angular.module('MeetMeHalfWayApp.services', [])
.factory('Requests', function($http) {

  var requestYelp = function(user, friend) {
    console.log('CLIENT: inside requestYelp');
    var config = {
      data: {
        user: user,
        friend: friend
      }
    };
    $http.post('/api/yelp', config)
      .then(function(response) {
        console.log('CLIENT: successful POST to /yelp', response.data);
      }, function(error) {
        console.log('CLIENT: error during POST from /yelp', error);
      });
  };

  var getResults = function() {
    console.log('CLIENT: inside getRequests');
    $http.get('/api/results')
      .then(function(response) {
        console.log('CLIENT: successful GET', response.data.businesses);
        return response.data.businesses;
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
    requestYelp: requestYelp,
    getResults: getResults
    // sendFavorites: sendFavorites
  };
});