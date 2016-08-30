angular.module('MeetMeHalfwayApp.results', [])
  .controller('ResultsController', function($scope, Requests) {
    $scope.searches = [];
    $scope.current = {};

    $scope.displayResults = function() {
      console.log('CLIENT: inside displayResults');

      Requests.getResults(function(data) {
        $scope.searches = data;
        var latest = $scope.searches.length - 1;
        
        $scope.current = {
          user: $scope.searches[latest].user,
          friend: $scope.searches[latest].friend,
          results: $scope.searches[latest].results
        };
      });
    };

    $scope.changeResults = function(index) {
      $scope.current = {
        user: $scope.searches[index].user,
        friend: $scope.searches[index].friend,
        results: $scope.searches[index].results
      };
    };
  });