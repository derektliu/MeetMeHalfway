angular.module('MeetMeHalfwayApp.results', [])
  .controller('ResultsController', function($scope, Requests) {
    $scope.results = [];

    $scope.displayResults = function() {
      console.log('CLIENT: inside displayResults');

      Requests.getResults(function(data) {
        $scope.results = data[0].results;
      });
    };
  });