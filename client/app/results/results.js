angular.module('MeetMeHalfwayApp.results', [])
  .controller('ResultsController', function($scope, $http) {
    $scope.results = [];

    $scope.displayResults = function() {
      console.log('CLIENT: inside getRequests');
      $http.get('/api/results')
        .then(function(response) {
          $scope.results = response.data.businesses;
          console.log('CLIENT: successful GET', $scope.results);
        }, function(error) {
          console.log('CLIENT: error', error);
        });
    };
  });