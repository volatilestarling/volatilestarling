angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, MapService) {

  MapService.initMap();

    $scope.fetchMarkers = function() {
      //grab user.locations object
      //iterate over object
        //pass key into pinMap function
    }

    $scope.pinMap = function(location) {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: location
      }, function(results, status) {
          console.log('here', location, status, google.maps.GeocoderStatus.OK)
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
          } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              leftOut.push(location);
              console.log(leftOut)
          }
      });
    }

    $scope.location;

    $scope.findLoc = function() {
      $scope.location = $scope.map.location
          //send to geocoder in mapservice
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: $scope.location
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
              //query to insert coordinates into database
       

          } else {
              alert("Geocode was not successful for the following reason: " + status);
          }
      })
      $scope.map.location = ''
    }

});