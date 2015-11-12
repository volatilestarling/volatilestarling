angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, MapService, Location) {

/*---------------- INITIALIZE MAP ---------------*/
  var map = MapService.initMap();
  var autocomplete = new google.maps.places.Autocomplete((document.getElementById('search')), {
        types: ["geocode"]
    }); 

/*-------------- FETCH SAVED LOCATIONS -------------*/
    $scope.fetchMarkers = function() {
      //grab user.locations object from database
      //filter for user here or in request?
      Location.getLocations()
        .then(function(users){
          //
        })
        .then(function(locations) {
          for(var place in locations) {
            $scope.pinMap(place);
          }
        });
     
    };

/*---------------- USER INPUT ---------------*/
    $scope.location;

    $scope.pinMap = function(location) {
      var result = autocomplete.getPlace()

      //location passed from call in fetchMarkers or user input
      location = location || result.name;
      $scope.location = location;

      //send to geocoder in mapservice
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: $scope.location
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: './assets/airplane.png'
            });

          } else {
              alert("Geocode was not successful for the following reason: " + status);
          }
      });

      //add location to user in database
      Location.addLocations(location)

      $scope.map.location = '';

    }

});