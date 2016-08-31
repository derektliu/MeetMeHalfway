angular.module('MeetMeHalfwayApp.results', ['uiGmapgoogle-maps'])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDSL-RaPYW1G6uJc445htYmrOQFaIBrrZU',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .controller('ResultsController', function($scope, Requests) {
    $scope.searches = [];
    $scope.current = {};
    $scope.map = {
      center: {
        latitude: 37.7749,
        longitude: -122.4194
      },
      zoom: 13,
    };

    $scope.options = {
      scrollwheel: false
    };

    $scope.markers = [];

    $scope.createBusinessMarker = function(elem, index) {

      var ret = {
        latitude: elem.location.coordinate.latitude,
        longitude: elem.location.coordinate.longitude,
        title: elem.name,
        id: index
      };

      $scope.markers.push(ret);
    };

    $scope.displayResults = function() {

      Requests.getResults(function(data) {
        $scope.searches = data;
        var latest = $scope.searches.length - 1;

        $scope.current = $scope.searches[latest];
        $scope.map.center.latitude = $scope.current.halfwayLocLat;
        $scope.map.center.longitude = $scope.current.halfwayLocLng;

        $scope.current.results.forEach($scope.createBusinessMarker);

      });
    };

    $scope.changeResults = function(index) {
      
      $scope.current = $scope.searches[index];
      $scope.map.center.latitude = $scope.current.halfwayLocLat;
      $scope.map.center.longitude = $scope.current.halfwayLocLng;

      $scope.current.results.forEach($scope.createBusinessMarker);
    };


    // uiGmapGoogleMapApi.then(function(maps) {

    // });
  });