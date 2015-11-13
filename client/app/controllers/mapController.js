angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, MapService, Location) {
  $scope.location = '';
  $scope.locations = [];
  $scope.tab = 1;

/*---------------- INITIALIZE MAP ---------------*/
  var map = MapService.initMap();
  var autocomplete = new google.maps.places.Autocomplete((document.getElementById('search')), {
        types: ["geocode"]
    });

/*-------------- FETCH SAVED LOCATIONS -------------*/
  $scope.fetchMarkers = function() {
    Location.getLocations()
      .then(function(locations) {
        $scope.locations = locations;
        for(var place in locations) {
          $scope.pinMap(place);
        }
      });
  };

/*------------------- USER INPUT ------------------*/
  $scope.pinMap = function(location) {
    var result = autocomplete.getPlace();

    //location passed from call in fetchMarkers or user input
    location = location || result.name;
    $scope.location = location;


    //send to geocoder in mapservice
    var geocoder = new google.maps.Geocoder();

/*---------------- USER INPUT ---------------*/
    //reference to user places list

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

    //if it is a new location, add it to the user's list
    if(result.name !== undefined) {
      Location.addLocations(location);
    }

    $scope.map.location = '';
  };

});
