angular.module('MeetMeHalfwayApp.locations', [])
  .controller('LocationsController', function($scope, Requests) {
    $scope.locations = {};

    $scope.getLocations = function() {
      console.log('inside locations/getlocations',
        $scope.locations.user, $scope.locations.friend);

      Requests.getResults();
    };

    $scope.sendFavorites = function() {
      console.log('inside saveFavorite',
        $scope.locations.user, $scope.locations.friend);

      Requests.sendFavorites($scope.locations.user, $scope.locations.friend);
      
      $scope.locations.user = '';
      $scope.locations.friend = '';
    };

  });