angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, MapService, Location) {

/*---------------- INITIALIZE MAP ---------------*/
  var map = MapService.initMap();

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

    // $scope.pinMap = function(location) {
    //   var geocoder = new google.maps.Geocoder();

    //   geocoder.geocode({
    //       address: location
    //   }, function(results, status) {
    //       if (status === google.maps.GeocoderStatus.OK) {

    //           var marker = new google.maps.Marker({
    //               map: map,
    //               position: results[0].geometry.location,
    //               icon: './assets/airplane.png'
    //           });
    //       } 
    //   });
    // };

/*---------------- USER INPUT ---------------*/
    $scope.location;

    $scope.pinMap = function(location) {
      //location passed from call in fetchMarkers or user input
      location = location || $scope.map.location;
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
                icon: './assets/airplane.png'
            });
              //query to insert coordinates into database
       

          } else {
              alert("Geocode was not successful for the following reason: " + status);
          }
      });

      $scope.map.location = '';

    }

});