angular.module('MeetMeHalfwayApp', [])
  .controller('LocationsController', function($scope) {
    $scope.locations = {};

    $scope.getLocations = function() {
      console.log($scope.locations);
    };

  });