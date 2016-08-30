angular.module('MeetMeHalfwayApp', [
  'MeetMeHalfwayApp.locations',
  'MeetMeHalfwayApp.results',
  'MeetMeHalfWayApp.services',
  'ngRoute' ])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/locations/locations.html',
        controller: 'LocationsController',
      })
      .when('/locations', {
        templateUrl: 'app/locations/locations.html',
        controller: 'LocationsController',
      })
      .when('/results', {
        templateUrl: 'app/results/results.html',
        controller: 'ResultsController',
      });

  }
]);